from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'profile', views.UserViewSet)

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/',views.RegisterView.as_view(),name='register'),
]
urlpatterns += router.urls
