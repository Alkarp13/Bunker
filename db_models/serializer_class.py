from .models import Person, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards
from .serializers import PersonSerializer, FobiesSerializer, CharactersSerializer, HobbiesSerializer, \
    SkillsSerializer, LifeSerializer, InventarSerializer, ProfessionsSerializer, ActionCardsSerializer
from rest_framework import generics

class PersonListCreate(generics.ListCreateAPIView):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

class FobiesListCreate(generics.ListCreateAPIView):
    queryset = Fobies.objects.all()
    serializer_class = FobiesSerializer

class CharactersListCreate(generics.ListCreateAPIView):
    queryset = Characters.objects.all()
    serializer_class = CharactersSerializer

class HobbiesListCreate(generics.ListCreateAPIView):
    queryset = Hobbies.objects.all()
    serializer_class = HobbiesSerializer

class SkillsListCreate(generics.ListCreateAPIView):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer

class LifeListCreate(generics.ListCreateAPIView):
    queryset = Life.objects.all()
    serializer_class = LifeSerializer

class InventarListCreate(generics.ListCreateAPIView):
    queryset = Inventar.objects.all()
    serializer_class = InventarSerializer

class ProfesionsListCreate(generics.ListCreateAPIView):
    queryset = Profesions.objects.all()
    serializer_class = ProfessionsSerializer

class ActionCardsListCreate(generics.ListCreateAPIView):
    queryset = ActionCards.objects.all()
    serializer_class = ActionCardsSerializer