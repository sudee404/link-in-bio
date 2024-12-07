import uuid
from django.db import models
from django.contrib.auth import get_user_model
from random_username.generate import generate_username
from django.utils.text import slugify

User = get_user_model()

# Create your models here.


class LinkInBio(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='link_in_bios')
    # To ensure the unique system-wide username.
    username = models.SlugField(unique=True, null=True)
    title = models.CharField(max_length=100)  # Microsite title.
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    social_links = models.JSONField(blank=True, null=True)
    published = models.BooleanField(default=False)
    type = models.CharField(
        max_length=50,
        choices=[
            ('personal', 'Personal'),
            ('business', 'Business'),
            ('pet', 'Pet'),
            ('brand_ambassador', 'Brand Ambassador'),
            ('employee', 'Employee'),
            ('authorized_dealer', 'Authorized Dealer'),
            ('authorized_retailer', 'Authorized Retailer'),
            ('authorized_reseller', 'Authorized Reseller'),
            ('authorized_service_provider', 'Authorized Service Provider'),
            ('authorized_installer', 'Authorized Installer'),
            ('certification_organization', 'Certification Organization'),
            ('third_party_certifier', 'Third Party Certifier'),
        ],
        default='personal'
    )
    update_no = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Link In Bio'
        verbose_name_plural = 'Link In Bios'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        # generate username at save
        if not self.username:
            self.username = generate_username()[0]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.type})"


class Link(models.Model):
    # Unique slug for the link.
    slug = models.SlugField(unique=True, null=True)
    link_in_bio = models.ForeignKey(
        LinkInBio, on_delete=models.CASCADE, related_name='links')
    title = models.CharField(max_length=100)  # Displayed title for the link.
    url = models.URLField()  # URL of the link.
    # Image for the link.
    image = models.ImageField(upload_to='link_images/', blank=True, null=True)
    # Description of the link.
    description = models.TextField(blank=True, null=True)
    type = models.CharField(
        max_length=50,
        choices=[
            ('download', 'Download'),
            ('store', 'Store'),
            ('booking', 'Booking'),
            ('custom', 'Custom'),
        ],
        default='custom'
    )
    # Price for the link.
    price = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    # Rating for the link.
    rating = models.PositiveIntegerField(blank=True, null=True)
    # Position in the list for ordering.
    position = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    # Text for the button.
    button_text = models.CharField(
        max_length=50, blank=True, null=True, default="CLICK ME")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['position']  # Links are ordered by position.

    def save(self, *args, **kwargs):
        # generate slug at save
        if not self.slug:
            self.slug = f"{slugify(self.title)}-{uuid.uuid4().hex[:6]}"
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
