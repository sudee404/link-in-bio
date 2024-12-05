from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from .views import ChangeEmail, ConfirmEmailRequest, DeleteUserView, RegisterView, LoginView, LogoutView, SiteSettingViewSet, SocialLoginView,CustomPasswordResetView,CustomPasswordResetCompleteView,ConfirmEmail
from rest_framework import routers


urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/',RegisterView.as_view(),name='register'),
]
