import os, posixpath, random, math, re
import simplejson as json
from .API import *
from django.shortcuts import render
from django.contrib.auth import get_user
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.views import generic
from django.http import HttpResponse
from Bunker.settings import BASE_DIR
from .models import Person, Lobby, UserInfo, UserProfile, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards, Story, Legend, PersonsQuery

class LobbyView(LoginRequiredMixin, generic.ListView):
    model = Lobby
    context_object_name = 'lobby'
    template_name = posixpath.join(*(BASE_DIR.split(os.path.sep) + ['www/templates/lobby.html']))

    def get_queryset(self):
        lobby = Lobby.objects.first()
        if not lobby:
            lobby = Lobby(game_state='R', story=getRandomStory(), legend=getRandomLegend())
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
        first_action = getRandomActionCard()
        new_person = Person(male=random.choice(['M', 'F']), age=getRandomAge(), growth=getRandomGrowth(), weight=getRandomWeight(), \
                            profession=getRandomProfesion(), life=getRandomLife(), phobia=getRandomFobie(), hobbi=getRandomHobbie(), \
                            character=getRandomCharacter(), skill=getRandomSkill(), inventar=getRandomInventar(), \
                            action_1=first_action, action_2=getRandomActionCard(first_action))
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

@csrf_exempt
def lobbyState(request):
    if request.method == 'GET':
        users_data = []
        lobby = Lobby.objects.first()
        users = list(lobby.userinfo_set.values_list('username', 'first_name', 'last_name', 'ready_state', named=True))
        if users:
            for i, user in enumerate(users):
                users_data.append({
                    'username': user.username,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'ready_state': user.ready_state
                })
        result = {
            'lobby_state': lobby.game_state,
            'users': users_data
        }
        return HttpResponse(json.dumps(result))

@csrf_exempt
def getAllPersons(request):
    #Получить список персон с их характеристиками и связанного пользователя, 
    #если это твой персонаж, то передать все характеристики, 
    #если нет, то передать только известные характеристики
    if request.method == 'GET':
        other_users = []
        current_user = {}
        user_profile = get_user(request)
        lobby = Lobby.objects.first()
        persons = lobby.person_set.all()
        legend = lobby.legend
        if legend:
            legend = {
                'square': legend.square,
                'await_time': legend.await_time,
                'medicines': legend.medicines,
                'armor': legend.armor,
                'additional_info': legend.additional_info
            }
        if persons:
            for i, person in enumerate(persons):
                if person.linked_user.username == user_profile.username:
                    fields = person.shownfields_set.all()
                    shown_fields = []
                    for i, field in enumerate(fields):
                        shown_fields.append(field.field)
                    current_user.update({
                        'username': user_profile.username,
                        'speak_time': person.speak_time,
                        'first_name': user_profile.first_name,
                        'last_name': user_profile.last_name,
                        'male': person.male,
                        'age': person.age,
                        'growth': person.growth,
                        'weight': person.weight,
                        'profession': person.profession,
                        'life': person.life,
                        'phobia': person.phobia,
                        'hobbi': person.hobbi,
                        'character': person.character,
                        'skill': person.skill,
                        'inventar': person.inventar,
                        'action_1': person.action_1,
                        'action_2': person.action_2,
                        'shown_fields': shown_fields
                    })
                else:
                    shown_fields = person.shownfields_set.all()
                    other_user = {
                        'username': person.linked_user.username,
                        'first_name': person.linked_user.first_name,
                        'last_name': person.linked_user.last_name,
                        'is_shown': False,
                        'note': ''
                    }
                    if shown_fields:
                        for i, field in enumerate(shown_fields):
                            other_user.update(dict.fromkeys([field.field], getattr(person, field.field)))
                    current_person = lobby.person_set.filter(linked_user__username = user_profile.username).first()
                    other_state = current_person.savedcardstate_set.filter(username = other_user['username']).first()
                    if other_state:
                        other_user['is_shown'] = other_state.is_shown
                        other_user['note'] = other_state.note
                    other_users.append(other_user)
        result = {
            'lobby_state': lobby.game_state,
            'turn': lobby.turn,
            'kickout_players': lobby.kickout_players,
            'number_of_seats': lobby.number_of_seats,
            'story': lobby.story,
            'current_user': current_user,
            'other_users': other_users,
            'legend': legend,
            'persons_query': getPersonsQuery(),
            'current_person': lobby.current_person,
            'is_round_over': lobby.is_round_over
        }
        return HttpResponse(json.dumps(result))

@csrf_exempt
def getFieldsAction(request):
    if request.method == 'POST':
        result = { 'is_anyperson_shown': False,  'is_anycard_shown': False}
        lobby = Lobby.objects.first()
        user_profile = get_user(request)
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        action = body['field']
        person = lobby.person_set.filter(linked_user__username = user_profile.username).first()
        if action == 'action_1':
            action = person.action_1
        else:
            action = person.action_2

        if re.search(r'любым человеком', action) or re.search(r'любого игрока', action) or \
            re.search(r'другого игрока', action) or re.search(r'выбрать кто покинет', action):
            if re.search(r'любую карту', action):
                result['is_anycard_shown'] = True
            result['is_anyperson_shown'] = True

        return HttpResponse(json.dumps(result))

@csrf_exempt
def setReady(request):
    if request.method == 'POST':
        is_all_ready = True
        lobby = Lobby.objects.first()
        user_profile = get_user(request)
        try:
            current_user = lobby.userinfo_set.filter(username = user_profile.username).first()
            current_user.ready_state = True
            current_user.save()
            users = list(lobby.userinfo_set.values_list('username', 'ready_state', named=True))
            random.shuffle(users)
            if users:
                for i, user in enumerate(users):
                    if not user.ready_state:
                        is_all_ready = False
                if is_all_ready: #and (lobby.userinfo_set.count() > 5):
                    print('all_ready')
                    lobby.number_of_seats = math.ceil(lobby.userinfo_set.count() / 2)
                    lobby.game_state = 'S'
                    for i, user in enumerate(users):
                        person = PersonsQuery(username=user.username)
                        person.save()
                        lobby.personsquery_set.add(person)
                    lobby.save()
            return HttpResponse(json.dumps({'success': True, 'lobby_state': lobby.game_state}))
        except BaseException as e:
            print(e)
            return HttpResponse(json.dumps({'success': False}))
