from . import models,serializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Create your views here.
class LinkViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /home/links/ endpoint"""
    queryset = models.Link.objects.all()
    serializer_class = serializers.LinkSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class LinkInBioViewSet(viewsets.ModelViewSet):
    """This is the viewset that handles all actions at /home/bios/ endpoint"""
    queryset = models.LinkInBio.objects.all()
    serializer_class = serializers.LinkInBioSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
