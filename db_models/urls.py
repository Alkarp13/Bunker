from django.views.generic.base import RedirectView
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('person/', views.PersonCardView.as_view(), name = 'person_card'),
    path('lobby/', views.LobbyView.as_view(), name = 'lobby'),
    path('lobby_state', views.lobbyState, name = 'lobbystate'),
    path('set_ready', views.setReady, name = 'setready'),
    path('get_all_persons', views.getAllPersons, name = 'allpersons'),
    path('', RedirectView.as_view(url='/lobby/', permanent=False), name='index')
]