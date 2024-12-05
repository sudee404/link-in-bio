# Generated by Django 4.2.1 on 2024-07-24 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_myuser_skills'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteSetting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('key', models.CharField(max_length=255, unique=True)),
                ('value', models.TextField()),
            ],
            options={
                'verbose_name': 'Site Setting',
                'verbose_name_plural': 'Site Settings',
            },
        ),
    ]
