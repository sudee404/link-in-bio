from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Link, LinkInBio


class LinkInBioAdmin(admin.ModelAdmin):
    list_display = ('username', 'title', 'type', 'created_at', 'updated_at')
    list_filter = ('type', 'created_at', 'updated_at')
    search_fields = ('username', 'title', 'type')
    ordering = ('-created_at',)


admin.site.register(LinkInBio, LinkInBioAdmin)


class LinkAdmin(admin.ModelAdmin):
    list_display = ('link_in_bio', 'url')
    list_filter = ('link_in_bio',)
    search_fields = ('link_in_bio', 'url')
    ordering = ('link_in_bio',)


admin.site.register(Link, LinkAdmin)
