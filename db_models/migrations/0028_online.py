# Generated by Django 3.0.8 on 2020-09-06 14:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0027_savedcardstate_username'),
    ]

    operations = [
        migrations.CreateModel(
            name='Online',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=20)),
                ('linked_lobby', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.Lobby')),
            ],
        ),
    ]