# Generated by Django 5.1.4 on 2024-12-06 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_linkinbio_avatar_linkinbio_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='link',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='link_images/'),
        ),
        migrations.AddField(
            model_name='link',
            name='type',
            field=models.CharField(choices=[('download', 'Download'), ('store', 'Store'), ('booking', 'Booking'), ('custom', 'Custom')], default='custom', max_length=50),
        ),
    ]