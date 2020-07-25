import os, posixpath
from django.shortcuts import render
from django.contrib.auth import get_user
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views import generic
from django.http import HttpResponse
from django.utils import json
from Bunker.settings import BASE_DIR
from .models import Person, Lobby, UserProfile, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards

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
        users_query = lobby.userprofile_set.filter(username = user_profile.username)
        if (not users_query) and (lobby.game_state == 'R'):
            lobby.userprofile_set.add(user_profile)
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

    def get_new_person(self, lobby):
        all_persons = lobby.person_set.all()
        
        characters = Characters.objects.all()
        hobbies = Hobbies.objects.all()
        skills = Skills.objects.all()
        life = Life.objects.all()
        inventar = Inventar.objects.all()
        profesions = Profesions.objects.all()
        action_cards = ActionCards.objects.all()

        for person in all_persons:
            pass

    def get_queryset(self):
        lobby = Lobby.objects.first()
        current_person = lobby.person_set.filter(linked_user = self.request.user)
        if not current_person:
            new_person = self.get_new_person(lobby)
            
        else:
            return current_person

def lobbyState(request):
    if request.method == 'GET':
        users_data = []
        lobby = Lobby.objects.first()
        users = lobby.userprofile_set.all()
        for user in users:
            users_data.append({
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name
            })
        result = {
            lobby_state: lobby.game_state,
            users: users_data
        }
        return HttpResponse(json.dumps(result))
    elif request.method == 'POST':
        #get all persons for current user with known fields?
        return HttpResponse()

def getRandomFobie():
    fobies = Fobies.objects.all()