import simplejson as json
from collections import Counter
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from db_models.models import Person, Lobby, UserInfo, UserProfile, ShownFields, PersonsKickList, ActionCards, SavedCardState, Online
from db_models.views import getPersonsQuery
from db_models.API import actionRouterById

class LobbyConsumer(WebsocketConsumer):
    def connect(self):
        self.username = self.scope['user']
        self.group = "broadcast"
        print('connect: ', self.username)

        lobby = Lobby.objects.first()
        users_query = lobby.userinfo_set.filter(username = self.username)
        if users_query and (lobby.game_state == 'S'):
            is_online = lobby.online_set.filter(username = self.username).first()
            if not is_online:
                online = Online(username = self.username)
                online.save()
                lobby.online_set.add(online)
                lobby.save()
            async_to_sync(self.channel_layer.group_add)(self.group, self.channel_name)
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        lobby = Lobby.objects.first()
        lobby.online_set.filter(username = self.username).first().delete()
        lobby.save()
        async_to_sync(self.channel_layer.group_discard)(self.group, self.channel_name)
        is_anyone_online = lobby.online_set.all()
        if (not is_anyone_online):
            lobby.delete()

    def receive(self, text_data):
        data = json.loads(text_data)
        lobby = Lobby.objects.first()
        persons = lobby.person_set.all()
        if persons and (lobby.game_state == 'S'):
            if 'value' in data:
                if isinstance(data['value'], list):
                    for value in data['value']:
                        self.updateShownFields(value, data)
                else:
                    self.updateShownFields(data['value'], data)
                self.sendMessageToAllPlayers("update_fields")
            if 'current_person' in data:
                self.moveSpeechToNextPerson()
            if 'kick_person' in data:
                self.kickPerson(data['kick_person'], data['username'])
            if 'change_card_state' in data:
                self.changeCardState(data['change_card_state'], data['username'])

    def updateShownFields(self, field_value, data):
        lobby = Lobby.objects.first()
        persons = lobby.person_set.all()
        for i, person in enumerate(persons):
            if person.linked_user.username == self.username.username:
                if (field_value == 'action_1'):
                    action_text = person.action_1
                    action = ActionCards.objects.filter(action = action_text).first()
                    actionRouterById(action.id, self.username.username, field_value, data)
                elif (field_value == 'action_2'):
                    action_text = person.action_2
                    action = ActionCards.objects.filter(action = action_text).first()
                    actionRouterById(action.id, self.username.username, field_value, data)
                else:
                    field = ShownFields(field=field_value)
                    field.save()
                    person.shownfields_set.add(field)
                    person.save()
                break

    def moveSpeechToNextPerson(self):
        lobby = Lobby.objects.first()
        current_person = lobby.current_person
        count = lobby.userinfo_set.count()
        turn = lobby.turn
        direction = lobby.direction
        if direction:
            if current_person > 1:
                current_person -= 1
            else:
                turn += 1
                lobby.is_round_over = True
                lobby.save()
                current_person += 1
                lobby.turn = turn;
                lobby.direction = not direction
        else:
            if current_person < count:
                current_person += 1
            else:
                turn += 1
                lobby.is_round_over = True
                lobby.save()
                is_round_over = True
                current_person -= 1
                lobby.turn = turn;
                lobby.direction = not direction

        lobby.current_person = current_person;
        lobby.save()
        result = {
            "turn": turn,
            "current_person": current_person,
            "is_round_over": lobby.is_round_over,
            "persons_query": getPersonsQuery()
        }
        self.sendMessageToAllPlayers(json.dumps({'update_turn': result}))

    def changeCardState(self, states, person_username):
        lobby = Lobby.objects.first()
        person = lobby.person_set.filter(linked_user__username = person_username).first()
        if person:
            for state in states:
                saved_state = person.savedcardstate_set.filter(username = state['username']).first()
                if saved_state:
                    saved_state.is_shown = state['is_shown']
                    saved_state.note = state['note']
                    saved_state.save()
                else:
                    saved_state = SavedCardState(is_shown=state['is_shown'], username=state['username'], note=state['note'])
                    saved_state.save()
                    person.savedcardstate_set.add(saved_state)
                person.save()

    def kickPerson(self, kick_person, who_kick):
        lobby = Lobby.objects.first()
        person = lobby.personskicklist_set.filter(username = who_kick).first()
        if person:
            person.kick_person = kick_person
        else:
            who_kick_person = lobby.person_set.filter(linked_user__username = who_kick).first()
            person = PersonsKickList(username=who_kick, kick_person=kick_person, weight=who_kick_person.weight)
            person.save()
            lobby.personskicklist_set.add(person)
            lobby.save()
        if lobby.personskicklist_set.count() == lobby.userinfo_set.count():
            kick_persons = list(lobby.personskicklist_set.values_list('kick_person', 'weight', named=True))
            kick_list = []
            for i, person in enumerate(kick_persons):
                for i in range(person.weight):
                    kick_list.append(person.kick_person)
            kick_list = Counter(kick_list)
            kicked_username = kick_list.most_common(1)[0][0]
            print('kicked_username: ', kicked_username)
            lobby.is_round_over = False
            kicked_person = lobby.person_set.filter(linked_user__username = kicked_username).first()
            if kicked_person.protection:
                kicked_person.protection = False
            else:
                lobby.person_set.filter(linked_user__username = kicked_username).first().delete()
                lobby.userinfo_set.filter(username = kicked_username).first().delete()
                lobby.personsquery_set.filter(username = kicked_username).first().delete()
            persons = lobby.person_set.all()
            for i, person in enumerate(persons):
                person.weight = 1
                person.speak_time = 60
                person.save()
            lobby.personskicklist_set.all().delete()
            lobby.save()
            self.sendMessageToAllPlayers('update_fields')

    def sendMessageToAllPlayers(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.group,
            {
                "type": "chat.message",
                "text": message,
            },
        )
       
    def chat_message(self, event):
        self.send(text_data=event["text"])