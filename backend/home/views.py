from django.http import Http404
from . import models, serializers
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import Response
import re
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
    parser_classes = [MultiPartParser, FormParser]
    lookup_field = 'username'
    
    
    def retrieve(self, request, *args, **kwargs):
        # Ensure the bio is published
        username = self.kwargs.get('username')
        bio = models.LinkInBio.objects.filter(username=username, published=True).first()
        if not bio :
            raise Http404("Bio not found or not published.")
        # Serialize
        return super().retrieve(request, *args, **kwargs)

    def perform_create(self, serializer):
        # Save the main object (e.g., Bio)
        serializer.save()

        # Extract and parse the `links` data
        links_data = {}

        # Iterate through the request data to find `links`
        for key, value in self.request.data.items():
            # Match patterns like `links[0][type]`
            match = re.match(r'links\[(\d+)]\[(.+)]', key)
            if match:
                index = int(match.group(1))  # Extract the link index
                # Extract the field name (e.g., type, title)
                field = match.group(2)
                if index not in links_data:
                    links_data[index] = {}
                links_data[index][field] = value

        # Create `Link` objects for each parsed link
        for link_data in links_data.values():
            models.Link.objects.create(
                link_in_bio=serializer.instance, **link_data)

        return super().perform_create(serializer)

    def perform_update(self, serializer):
        # Save the main object (e.g., Bio)
        serializer.save()
        # Extract and parse the `links` data
        links_data = {}
        # Iterate through the request data to find `links`
        # Iterate through the request data to find `links`
        for key, value in self.request.data.items():
            # Match patterns like `links[0][type]`
            match = re.match(r'links\[(\d+)]\[(.+)]', key)
            if match:
                index = int(match.group(1))  # Extract the link index
                # Extract the field name (e.g., type, title)
                field = match.group(2)
                if index not in links_data:
                    links_data[index] = {}
                links_data[index][field] = value
        slugs_to_keep = []

        # Update, or Create `Link` objects for each parsed link
        for link_data in links_data.values():
            link_id = link_data.get('slug')
            if link_id:
                # Update existing link
                link = models.Link.objects.get(
                    slug=link_id, link_in_bio=serializer.instance)
                for field, value in link_data.items():
                    setattr(link, field, value)
                
            else:
                # Create new link
                link = models.Link.objects.create(
                    link_in_bio=serializer.instance, **link_data)
                
            link.save()    
            slugs_to_keep.append(link.slug)
        
        # Delete extra links that are not in the updated data
        if len(self.request.data.keys()) > 1:
            # slug not in slugs_to_keep
            links_to_delete = models.Link.objects.filter(
                link_in_bio=serializer.instance).exclude(slug__in=slugs_to_keep)
            links_to_delete.delete()
            
        return super().perform_update(serializer)
