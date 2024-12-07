# create linkin bio when user is created
from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from .models import User, LinkInBio
from django.core.exceptions import ValidationError



@receiver(post_save, sender=User)
def create_linkinbio(sender, instance, created, **kwargs):
    if created:
        LinkInBio.objects.create(user=instance, type='personal')
        LinkInBio.objects.create(user=instance, type='pet')
        # if personal account create 2
        if instance.account_type == 'business':
            LinkInBio.objects.create(user=instance, type='business')

@receiver(pre_save, sender=LinkInBio)
def update_counter(sender, instance, **kwargs):
    if instance.pk:  # Make sure it's an update, not a new instance
        old_instance = sender.objects.get(pk=instance.pk)

        # If the username changes, handle the update counter
        if old_instance.username != instance.username:
            # Check the current update_no and increment
            if old_instance.update_no >= 2:
                # If update_no is already 2 or more, throw an error
                raise ValidationError("Username cannot be updated more than twice.")
            
            # Increment the update_no counter
            instance.update_no = old_instance.update_no + 1
