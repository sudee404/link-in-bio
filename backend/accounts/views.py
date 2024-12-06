from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import status,viewsets
from django.contrib.auth import authenticate, get_user_model
from .models import Business
from .serializers import LoginSerializer, UserSerializer, UserRegisterSerializer,BusinessSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly


# Create your views here.
User = get_user_model()

###############################################################################
###################     Authentication Views    ###############################
###############################################################################


class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user is not None:
                return Response({'message': 'Account created successfully, proceeding to login'}, status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(email=email, password=password)

            if user is not None:
                refresh = RefreshToken.for_user(user)
                token = str(refresh.access_token)
                expiration = refresh.access_token.get('exp')
                return Response({'user': UserSerializer(user).data, 'token': token, 'exp': expiration}, status=status.HTTP_202_ACCEPTED)

            if User.objects.filter(email=email).exists():
                return Response({'message': 'Invalid password'}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({'message': 'No user was found with that email'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'message': 'Invalid input, please enter correct values'}, status=status.HTTP_400_BAD_REQUEST)

    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    lookup_field = 'username'
    
    def list(self, request):
        user = request.user
        serializer = UserSerializer(user,context={'request': request})
        return Response({'user':serializer.data},status=status.HTTP_200_OK)
    
    def create(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class BusinessViewSet(viewsets.ModelViewSet):
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def list(self, request):
        try:
            user = request.user
            serializer = BusinessSerializer(user.business,context={'request': request})
            return Response({'business':serializer.data},status=status.HTTP_200_OK)
        except:
            return Response({'message':'No business profile found'},status=status.HTTP_404_NOT_FOUND)
    
    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            serializer = self.get_serializer(user.business, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({'message':'No business profile found'},status=status.HTTP_404_NOT_FOUND)
    
