# Generated by Django 3.0.8 on 2020-08-12 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0013_lobby_number_of_seats'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='is_shown',
            field=models.BooleanField(default=False),
        ),
    ]
