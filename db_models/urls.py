from django.views.generic.base import RedirectView
from django.urls import path, include
from django.contrib import admin
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('person/', views.PersonCardView.as_view(), name = 'person-card'),
    path('lobby/', views.LobbyView.as_view(), name = 'lobby'),
    path('lobby_state', views.lobbyState, name = 'lobbystate'),
    path('', RedirectView.as_view(url='/lobby/', permanent=False), name='index')
]