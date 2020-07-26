import os, posixpath, random
import simplejson as json
from django.shortcuts import render
from django.contrib.auth import get_user
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.http import HttpResponse
from Bunker.settings import BASE_DIR
from .models import Person, Lobby, UserInfo, UserProfile, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards

class LobbyView(LoginRequiredMixin, generic.ListView):
    model = Lobby
    context_object_name = 'lobby'
    template_name = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['www/templates/lobby.html']))

    def get_queryset(self):
        lobby = Lobby.objects.first()
        if not lobby:
            lobby = Lobby(game_state='R')
            lobby.save()

        user_profile = get_user(self.request)
        users_query = lobby.userinfo_set.filter(username = user_profile.username)
        if (not users_query) and (lobby.game_state == 'R'):
            user_info = UserInfo(username=user_profile.username, first_name=user_profile.first_name, last_name=user_profile.last_name)
            user_info.save()
            lobby.userinfo_set.add(user_info)
            lobby.save()

        return lobby

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["lobby_object"] = Lobby.objects.first()

        return context

class PersonCardView(LoginRequiredMixin, generic.ListView):
    model = Person
    context_object_name = 'person_card'
    template_name = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['www/templates/person_card.html']))

    def get_new_person(self):
        lobby = Lobby.objects.first()
        all_persons = lobby.person_set.all()
        first_action = getRandomActionCard(all_persons)
        new_person = Person(male=random.choice(['M', 'F']), age=random.randint(18, 80), profession=getRandomProfesion(all_persons), \
                            life=getRandomLife(all_persons), phobia=getRandomFobie(all_persons), hobbi=getRandomHobbie(all_persons), \
                            character=getRandomCharacter(all_persons), skill=getRandomSkill(all_persons), inventar=getRandomInventar(all_persons), \
                            action_1=first_action, action_2=getRandomActionCard(all_persons, first_action))
        new_person.save()
        return new_person;

    def get_queryset(self):
        lobby = Lobby.objects.first()
        current_person = lobby.person_set.filter(linked_user__username = self.request.user.username)
        if not current_person:
            new_person = self.get_new_person()
            lobby.person_set.add(new_person)
            user_profile = get_user(self.request)
            user = lobby.userinfo_set.filter(username = user_profile.username).first()
            user.person_set.add(new_person)
            user.save()
            lobby.save()
        else:
            return current_person

def lobbyState(request):
    if request.method == 'GET':
        users_data = []
        lobby = Lobby.objects.first()
        users = list(lobby.userinfo_set.values_list('username', 'first_name', 'last_name', named=True))
        if users:
            for i, user in enumerate(users):
                print(user)
                users_data.append({
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name
                })
        result = {
            'lobby_state': lobby.game_state,
            'users': users_data
        }
        return HttpResponse(json.dumps(result))
    elif request.method == 'POST':
        #get all persons for current user with known fields?
        return HttpResponse()

def getRandomFobie(all_persons):
    fobies = Fobies.objects.values_list('phobia', flat=True)
    fobies = list(fobies)
    for i, person in enumerate(all_persons):
        for index, fobie in enumerate(fobies):
            if fobie == person.phobia:
                fobies.pop(index)
                break
    fobie = random.choice(fobies)
    print(fobie)
    return fobie

def getRandomCharacter(all_persons):
    characters = Characters.objects.values_list('character', flat=True)
    characters = list(characters)
    for i, person in enumerate(all_persons):
        for index, character in enumerate(characters):
            if character == person.character:
                characters.pop(index)
                break
    character = random.choice(characters)
    print(character)
    return character

def getRandomHobbie(all_persons):
    hobbies = Hobbies.objects.values_list('hobbi', flat=True)
    hobbies = list(hobbies)
    for i, person in enumerate(all_persons):
        for index, hobbi in enumerate(hobbies):
            if hobbi == person.hobbi:
                hobbies.pop(index)
                break
    hobbi = random.choice(hobbies)
    print(hobbi)
    return hobbi

def getRandomSkill(all_persons):
    skills = Skills.objects.values_list('skill', flat=True)
    skills = list(skills)
    for i, person in enumerate(all_persons):
        for index, skill in enumerate(skills):
            if skill == person.skill:
                skills.pop(index)
                break
    skill = random.choice(skills)
    print(skill)
    return skill

def getRandomLife(all_persons):
    life = Life.objects.values_list('life', flat=True)
    life = list(life)
    for i, person in enumerate(all_persons):
        for index, life_ in enumerate(life):
            if life_ == person.life:
                life.pop(index)
                break
    lif = random.choice(life)
    print(lif)
    return lif

def getRandomInventar(all_persons):
    inventar = Inventar.objects.values_list('inventar', flat=True)
    inventar = list(inventar)
    for i, person in enumerate(all_persons):
        for index, inventar_ in enumerate(inventar):
            if inventar_ == person.inventar:
                inventar.pop(index)
                break
    inventar_ = random.choice(inventar)
    print(inventar_)
    return inventar_

def getRandomProfesion(all_persons):
    profesions = Profesions.objects.values_list('profession', flat=True)
    profesions = list(profesions)
    for i, person in enumerate(all_persons):
        for index, profesion in enumerate(profesions):
            if profesion == person.profession:
                profesions.pop(index)
                break
    profesion = random.choice(profesions)
    print(profesion)
    return profesion

def getRandomActionCard(all_persons, first_card=''):
    action_cards = ActionCards.objects.values_list('action', flat=True)
    action_cards = list(action_cards)
    for i, person in enumerate(all_persons):
        for index, action_card in enumerate(action_cards):
            if (action_card == person.action_1) or (action_card == person.action_2):
                action_cards.pop(index)
                break

    if not (first_card == ''):
        for index, action_card in enumerate(action_cards):
            if action_card == first_card:
                action_cards.pop(index)
                break
    action_card = random.choice(action_cards)
    print(action_card)
    return action_card