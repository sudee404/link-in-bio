# Generated by Django 5.1.4 on 2024-12-06 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0005_link_price_link_rating'),
    ]

    operations = [
        migrations.AddField(
            model_name='link',
            name='button_text',
            field=models.CharField(blank=True, default='CLICK ME', max_length=50, null=True),
        ),
    ]