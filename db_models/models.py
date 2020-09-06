from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.utils.safestring import mark_safe

class Legend(models.Model):
    id = models.AutoField(primary_key=True)
    square = models.PositiveSmallIntegerField(default=100)
    await_time = models.PositiveSmallIntegerField(default=30)
    medicines = models.PositiveSmallIntegerField(default=1)
    armor = models.PositiveSmallIntegerField(default=1)
    additional_info = models.CharField(max_length=750, null=True)

class Lobby(models.Model):
    LOBBY_STATE = [
        ('R', 'recruiting_players'),
        ('S', 'game_start'),
        ('E', 'game_end'),
    ]

    id = models.AutoField(primary_key=True)
    turn = models.PositiveSmallIntegerField(default=1)
    kickout_players = models.PositiveSmallIntegerField(default=1)
    story = models.CharField(max_length=350, null=True)
    legend = models.OneToOneField(Legend, on_delete = models.CASCADE, null=True)
    number_of_seats = models.PositiveSmallIntegerField(default=1)
    current_person = models.PositiveSmallIntegerField(default=1)
    direction = models.BooleanField(default=False)
    is_round_over = models.BooleanField(default=False)
    game_state = models.CharField(max_length=1, choices=LOBBY_STATE, default='R')

def upload_to():
    pass

class UserProfile(AbstractUser):
    avatar = models.ImageField(verbose_name='Avatar', null=True)

class UserInfo(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    ready_state = models.BooleanField(default=False)
    linked_lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)

class Online(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    linked_lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)

class PersonsQuery(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    linked_lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)

class PersonsKickList(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20)
    weight = models.PositiveSmallIntegerField(default=1)
    kick_person = models.CharField(max_length=20)
    linked_lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)

class Person(models.Model):
    MALE_VAR = [
        ('M', 'Male'),
        ('F', 'Female')
    ]
    
    id = models.AutoField(primary_key=True)
    protection = models.BooleanField(default=False)
    voices = models.PositiveSmallIntegerField(default=1)
    speak_time = models.PositiveSmallIntegerField(default=60)
    lobby = models.ForeignKey(Lobby, on_delete = models.CASCADE, null=True, blank=True)
    linked_user = models.ForeignKey(UserInfo, on_delete=models.CASCADE, null=True, blank=True)
    male = models.CharField(max_length=1, choices=MALE_VAR, default='M')
    age = models.PositiveSmallIntegerField()
    growth = models.PositiveSmallIntegerField(default=160)
    weight = models.PositiveSmallIntegerField(default=65)
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

class SavedCardState(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=20, null=True)
    is_shown = models.BooleanField(default=False)
    note = models.CharField(max_length=500)
    person = models.ForeignKey(Person, on_delete = models.CASCADE, null=True, blank=True)

class Story(models.Model):
    id = models.AutoField(primary_key=True)
    story = models.CharField(max_length=350)

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