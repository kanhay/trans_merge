# Generated by Django 3.2.25 on 2024-11-27 15:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_auto_20241122_1906'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='two_factor_backup_codes',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='location',
        ),
    ]
