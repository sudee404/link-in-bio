from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('links', views.LinkViewSet)
router.register('bios', views.LinkInBioViewSet)

urlpatterns = router.urls