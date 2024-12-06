from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, Group, Permission
from django.db import models

class MyUserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email, and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)


class MyUser(AbstractBaseUser):
    """ Custom user model"""
    # This is a custom user model
    
    ACCOUNT_TYPE_CHOICES = [
        ('personal', 'Personal'),
        ('business', 'Business'),
    ]
    
    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=30, null=True)
    username = models.CharField(max_length=30, null=True,unique=True)
    bio = models.TextField(null=True)
    image = models.ImageField(upload_to='profile_pictures/', null=True)
    phone = models.CharField(max_length=20, null=True)
    email = models.EmailField(unique=True)
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES, default='personal')
    recovery_email = models.EmailField(blank=True, null=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    groups = models.ManyToManyField(Group, blank=True)
    user_permissions = models.ManyToManyField(Permission, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,null=True)
    updated_at = models.DateTimeField(auto_now=True,null=True)
    # Business
    business = models.ForeignKey('Business', on_delete=models.CASCADE, null=True)
    
    USERNAME_FIELD = 'email'
  
    objects = MyUserManager()

    def has_module_perms(self, app_label):
        """
        Return True if the user has any permissions in the given app label.
        """
        return True

    def has_perm(self, perm, obj=None):
        """
        Return True if the user has the specified permission.
        """
        return True

    def get_full_name(self):
        return f'{self.first_name} {self.last_name}'
        
    def __str__(self):
        return self.get_full_name()
        

    class Meta:
        managed = True
        verbose_name = 'User Account'
        verbose_name_plural = 'User Accounts'


class Business(models.Model):
    """Model definition for Business."""

    name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=20,null=True)
    address = models.CharField(max_length=255,null=True)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        """Meta definition for Business."""

        verbose_name = 'Business'
        verbose_name_plural = 'Businesss'

    def __str__(self):
        """Unicode representation of Business."""
        return self.name
