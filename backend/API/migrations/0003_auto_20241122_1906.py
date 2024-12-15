# Generated by Django 3.2.25 on 2024-11-22 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_usertwofactor'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='two_factor_backup_codes',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.DeleteModel(
            name='UserTwoFactor',
        ),
    ]
