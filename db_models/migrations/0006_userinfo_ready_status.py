# Generated by Django 3.0.8 on 2020-08-02 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0005_auto_20200726_1928'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='ready_status',
            field=models.BooleanField(default=False),
        ),
    ]
