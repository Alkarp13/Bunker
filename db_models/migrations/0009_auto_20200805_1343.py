# Generated by Django 3.0.8 on 2020-08-05 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0008_auto_20200805_1335'),
    ]

    operations = [
        migrations.AddField(
            model_name='lobby',
            name='kickout_players',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='lobby',
            name='turn',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
