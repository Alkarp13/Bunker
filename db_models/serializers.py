from rest_framework import serializers
from .models import Person, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards

class PersonSerializer(serializers.ModelSerializer):
	class Meta:
		model = Person
		fields = ('id', 'male', 'age', 'profession', 'life', 'phobia', 'hobbi', 'character', 'skill', 'inventar', 'action_1', 'action_2')

class FobiesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Fobies
		fields = ('id', 'phobia')

class CharactersSerializer(serializers.ModelSerializer):
	class Meta:
		model = Characters
		fields = ('id', 'character')

class HobbiesSerializer(serializers.ModelSerializer):
	class Meta:
		model = Hobbies
		fields = ('id', 'hobbi')

class SkillsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Skills
		fields = ('id', 'skill')

class LifeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Life
		fields = ('id', 'life')

class InventarSerializer(serializers.ModelSerializer):
	class Meta:
		model = Inventar
		fields = ('id', 'inventar')

class ProfessionsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profesions
		fields = ('id', 'profession')

class ActionCardsSerializer(serializers.ModelSerializer):
	class Meta:
		model = ActionCards
		fields = ('id', 'action')
