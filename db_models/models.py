from django.db import models
from django.contrib.auth.models import User, AbstractUser

class Lobby(models.Model):
    LOBBY_STATE = [
        ('R', 'recruiting_players'),
        ('S', 'game_start'),
        ('E', 'game_end'),
    ]

    id = models.AutoField(primary_key=True)
    turn = models.PositiveSmallIntegerField(default=1)
    kickout_players = models.PositiveSmallIntegerField(default=1)
    game_state = models.CharField(max_length=1, choices=LOBBY_STATE, default='R')

class UserProfile(AbstractUser):
    avatar = models.ImageField(upload_to='images/users', verbose_name='Изображение')

class UserInfo(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to='images/users', verbose_name='Изображение')
    ready_state= models.BooleanField(default=False)
    linked_lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)

class Person(models.Model):
    MALE_VAR = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    
    id = models.AutoField(primary_key=True)
    lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)
    linked_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, null=True, blank=True)
    #shown_fields = models.ForeignKey(ShownFields, on_delete = models.CASCADE, null=True, blank=True)
    male = models.CharField(max_length=1, choices=MALE_VAR, default='M')
    age = models.PositiveSmallIntegerField()
    profession = models.CharField(max_length=40)
    life = models.CharField(max_length=50)
    phobia = models.CharField(max_length=70)
    hobbi = models.CharField(max_length=60)
    character = models.CharField(max_length=25)
    skill = models.CharField(max_length=50)
    inventar = models.CharField(max_length=40)
    action_1 = models.CharField(max_length=250)
    action_2 = models.CharField(max_length=250)

class ShownFields(models.Model):
    id = models.AutoField(primary_key=True)
    field = models.CharField(max_length=20)
    person = models.ForeignKey(Person, on_delete = models.CASCADE, null=True, blank=True)

class Fobies(models.Model):
    id = models.AutoField(primary_key=True)
    phobia = models.CharField(max_length=70)

class Characters(models.Model):
    id = models.AutoField(primary_key=True)
    character = models.CharField(max_length=25)

class Hobbies(models.Model):
    id = models.AutoField(primary_key=True)
    hobbi = models.CharField(max_length=60)

class Skills(models.Model):
    id = models.AutoField(primary_key=True)
    skill = models.CharField(max_length=50)

class Life(models.Model):
    id = models.AutoField(primary_key=True)
    life = models.CharField(max_length=50)

class Inventar(models.Model):
    id = models.AutoField(primary_key=True)
    inventar = models.CharField(max_length=40)

class Profesions(models.Model):
    id = models.AutoField(primary_key=True)
    profession = models.CharField(max_length=40)

class ActionCards(models.Model):
    id = models.AutoField(primary_key=True)
    action = models.CharField(max_length=250)