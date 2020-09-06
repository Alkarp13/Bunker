from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Lobby, UserInfo, UserProfile, Person, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards, Story, PersonsQuery

class LobbyAdmin(admin.ModelAdmin):
    list_display = ('id', 'game_state')

class UserProfileAdmin(UserAdmin):
    model = UserProfile
    list_display = ('username', 'first_name')

class UserInfoAdmin(admin.ModelAdmin):
    model = UserInfo
    list_display = ['first_name', 'last_name', 'username', 'ready_state']

class PersonAdmin(admin.ModelAdmin):
    list_display = ('id', 'male', 'age', 'profession', 'life', 'skill', 'phobia', 'hobbi', 'character', 'inventar')

class StoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'story')

class PersonsQueryAdmin(admin.ModelAdmin):
    list_display = ('id', 'username')

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
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Person, PersonAdmin)
admin.site.register(Story, StoryAdmin)
admin.site.register(PersonsQuery, PersonsQueryAdmin)
admin.site.register(Fobies, FobiesAdmin)
admin.site.register(Characters, CharactersAdmin)
admin.site.register(Hobbies, HobbiesAdmin)
admin.site.register(Skills, SkillsAdmin)
admin.site.register(Life, LifeAdmin)
admin.site.register(Inventar, InventarAdmin)
admin.site.register(Profesions, ProfesionsAdmin)
admin.site.register(ActionCards, ActionCardsAdmin)