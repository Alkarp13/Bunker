# Generated by Django 3.0.8 on 2020-09-02 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0023_auto_20200901_1957'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo',
            name='avatar',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='avatar',
            field=models.ImageField(null=True, upload_to='', verbose_name='Avatar'),
        ),
    ]
