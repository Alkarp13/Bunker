from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('persons', consumers.LobbyConsumer),
]