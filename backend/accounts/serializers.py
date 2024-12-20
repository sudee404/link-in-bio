import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from home.serializers import LinkInBioSerializer
from .models import Business

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    name = serializers.CharField(source='get_full_name')
    bios = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('__all__')
        
    def get_bios(self, obj):
        return LinkInBioSerializer(obj.link_in_bios, many=True,context=self.context).data
        
        

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    business_name = serializers.CharField(write_only=True, required=False)  # Non-model field

    class Meta:
        model = User
        fields = ('email','password','account_type','business_name')
        
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            account_type=validated_data['account_type'],
            password=validated_data['password'],
        )
        # create business profile if account_type is 'business'
        if validated_data['account_type'] == 'business':
            business,created = Business.objects.get_or_create(
                name=validated_data['business_name']
            )
            business.save()
            # add user to business
            user.business = business
            user.save()
        return user

    def validate_password(self, value):
        password_strength = self.get_password_strength(value)
        if password_strength < 5:
            errors = []
            if len(value) < 8:
                errors.append('Password must be at least 8 characters long.')
            if not re.search('[a-z]', value):
                errors.append(
                    'Password must contain at least one lowercase letter.')
            if not re.search('[A-Z]', value):
                errors.append(
                    'Password must contain at least one uppercase letter.')
            if not re.search('[0-9]', value):
                errors.append('Password must contain at least one digit.')
            if not re.search('[!@#$%^&*()_+-=]', value):
                errors.append(
                    'Password must contain at least one special character.')
            raise serializers.ValidationError(errors)
        return value

    def get_password_strength(self, password):
        strength = 0
        if len(password) >= 8:
            strength += 1
        if re.search('[a-z]', password):
            strength += 1
        if re.search('[A-Z]', password):
            strength += 1
        if re.search('[0-9]', password):
            strength += 1
        if re.search('[!@#$%^&*()_+-=]', password):
            strength += 1
        return strength
    

        
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class BusinessSerializer(serializers.ModelSerializer):

    class Meta:
        model = Business
        fields = ('__all__')
        