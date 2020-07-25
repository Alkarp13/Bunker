from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Lobby, UserProfile, Person, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards

class LobbyAdmin(admin.ModelAdmin):
    list_display = ('id', 'game_state')

class UserProfileAdmin(UserAdmin):
    model = UserProfile
    list_display = ['email', 'username',]

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'male', 'age', 'profession', 'life', 'skill', 'phobia', 'hobbi', 'character', 'inventar')

class FobiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'phobia')

class CharactersAdmin(admin.ModelAdmin):
    list_display = ('id', 'character')

class HobbiesAdmin(admin.ModelAdmin):
    list_display = ('id', 'hobbi')

class SkillsAdmin(admin.ModelAdmin):
    list_display = ('id', 'skill')

class LifeAdmin(admin.ModelAdmin):
    list_display = ('id', 'life')

class InventarAdmin(admin.ModelAdmin):
    list_display = ('id', 'inventar')

class ProfesionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'profession')

class ActionCardsAdmin(admin.ModelAdmin):
    list_display = ('id', 'action')

admin.site.register(Lobby, LobbyAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Fobies, FobiesAdmin)
admin.site.register(Characters, CharactersAdmin)
admin.site.register(Hobbies, HobbiesAdmin)
admin.site.register(Skills, SkillsAdmin)
admin.site.register(Life, LifeAdmin)
admin.site.register(Inventar, InventarAdmin)
admin.site.register(Profesions, ProfesionsAdmin)
admin.site.register(ActionCards, ActionCardsAdmin)