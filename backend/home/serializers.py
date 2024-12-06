from rest_framework import serializers
from . import models


class LinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Link
        fields = ('__all__')


class LinkInBioSerializer(serializers.ModelSerializer):
    links = serializers.SerializerMethodField()

    class Meta:
        model = models.LinkInBio
        fields = ('__all__')

    def get_links(self, obj):
        return LinkSerializer(obj.links, many=True)
