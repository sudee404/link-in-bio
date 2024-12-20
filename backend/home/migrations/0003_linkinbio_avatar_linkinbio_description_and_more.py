# Generated by Django 5.1.4 on 2024-12-06 18:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_alter_linkinbio_options_alter_linkinbio_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='linkinbio',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='avatars/'),
        ),
        migrations.AddField(
            model_name='linkinbio',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='linkinbio',
            name='social_links',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
