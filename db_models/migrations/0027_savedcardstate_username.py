# Generated by Django 3.0.8 on 2020-09-06 12:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0026_savedcardstate'),
    ]

    operations = [
        migrations.AddField(
            model_name='savedcardstate',
            name='username',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
