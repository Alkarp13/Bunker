import simplejson as json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from db_models.models import Person, Lobby, UserInfo, UserProfile, ShownFields

class LobbyConsumer(WebsocketConsumer):
    def connect(self):
        self.username = self.scope['user']
        print('connect: ', self.username)

        lobby = Lobby.objects.first()
        users_query = lobby.userinfo_set.filter(username = self.username)
        if users_query and (lobby.game_state == 'S'):
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        print('disconnect: ', close_code)
        #Add logic to delete lobby
        lobby = Lobby.objects.first()
        users_query = lobby.userinfo_set.filter(username = self.username)
        if (not users_query) and (lobby.game_state == 'E'):
            lobby.delete()

    def receive(self, text_data):
        data = json.loads(text_data)
        result = {'username': self.username}
        lobby = Lobby.objects.first()
        persons = lobby.person_set.all()
        if persons and (lobby.game_state == 'S'):
            if 'value' in data:
                for i, person in enumerate(persons):
                    if person.linked_user.username == self.username.username:
                        field = ShownFields(field=data['value'])
                        field.save()
                        person.shownfields_set.add(field)
                        person.save()
                        self.send(text_data="update_fields")