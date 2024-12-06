# Generated by Django 5.1.4 on 2024-12-06 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='linkinbio',
            options={'ordering': ['-created_at'], 'verbose_name': 'Link In Bio', 'verbose_name_plural': 'Link In Bios'},
        ),
        migrations.AlterField(
            model_name='linkinbio',
            name='username',
            field=models.SlugField(null=True, unique=True),
        ),
    ]
