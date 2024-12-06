# create linkin bio when user is created
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, LinkInBio


@receiver(post_save, sender=User)
def create_linkinbio(sender, instance, created, **kwargs):
    if created:
        LinkInBio.objects.create(user=instance, type='personal')
        LinkInBio.objects.create(user=instance, type='pet')
        # if personal account create 2
        if instance.account_type == 'business':
            LinkInBio.objects.create(user=instance, type='business')
