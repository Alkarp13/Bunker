import random, math
from .models import Person, Lobby, UserInfo, UserProfile, Fobies, Characters, Hobbies, Skills, Life, Inventar, Profesions, ActionCards, Story, Legend, PersonsQuery

def getPersonsQuery():
    lobby = Lobby.objects.first()
    users_query = list(lobby.personsquery_set.order_by('id').values_list('id', 'username', named=True))
    
    return users_query

def getRandomStory():
    stories = Story.objects.values_list('story', flat=True)

    return random.choice(list(stories))

def getRandomLegend():
    squares = [80, 100, 120, 160, 200]
    times = [30, 60, 90, 120, 150, 180]
    med = [0, 1, 2, 4]
    pistols = [0, 1, 2, 3]
    legend = Legend(square=random.choice(squares), await_time=random.choice(times), medicines=random.choice(med), armor=random.choice(pistols))
    legend.save()
    return legend

def getRandomFobie():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    fobies = Fobies.objects.values_list('phobia', flat=True)
    fobies = list(fobies)
    for i, person in enumerate(all_persons):
        for index, fobie in enumerate(fobies):
            if fobie == person.phobia:
                fobies.pop(index)
                break
    fobie = random.choice(fobies)
    return fobie

def getRandomCharacter():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    characters = Characters.objects.values_list('character', flat=True)
    characters = list(characters)
    for i, person in enumerate(all_persons):
        for index, character in enumerate(characters):
            if character == person.character:
                characters.pop(index)
                break
    character = random.choice(characters)
    return character

def getRandomHobbie():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    hobbies = Hobbies.objects.values_list('hobbi', flat=True)
    hobbies = list(hobbies)
    for i, person in enumerate(all_persons):
        for index, hobbi in enumerate(hobbies):
            if hobbi == person.hobbi:
                hobbies.pop(index)
                break
    hobbi = random.choice(hobbies)
    return hobbi

def getRandomSkill():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    skills = Skills.objects.values_list('skill', flat=True)
    skills = list(skills)
    for i, person in enumerate(all_persons):
        for index, skill in enumerate(skills):
            if skill == person.skill:
                skills.pop(index)
                break
    skill = random.choice(skills)
    return skill

def getRandomLife():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    life = Life.objects.values_list('life', flat=True)
    life = list(life)
    for i, person in enumerate(all_persons):
        for index, life_ in enumerate(life):
            if life_ == person.life:
                life.pop(index)
                break
    lif = random.choice(life)
    return lif

def getRandomInventar():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    inventar = Inventar.objects.values_list('inventar', flat=True)
    inventar = list(inventar)
    for i, person in enumerate(all_persons):
        for index, inventar_ in enumerate(inventar):
            if inventar_ == person.inventar:
                inventar.pop(index)
                break
    inventar_ = random.choice(inventar)
    return inventar_

def getRandomProfesion():
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    profesions = Profesions.objects.values_list('profession', flat=True)
    profesions = list(profesions)
    for i, person in enumerate(all_persons):
        for index, profesion in enumerate(profesions):
            if profesion == person.profession:
                profesions.pop(index)
                break
    profesion = random.choice(profesions)
    return profesion

def getRandomActionCard(first_card=''):
    lobby = Lobby.objects.first()
    all_persons = lobby.person_set.all()
    action_cards = ActionCards.objects.values_list('action', flat=True)
    action_cards = list(action_cards)
    for i, person in enumerate(all_persons):
        for index, action_card in enumerate(action_cards):
            if (action_card == person.action_1) or (action_card == person.action_2):
                action_cards.pop(index)

    if not (first_card == ''):
        for index, action_card in enumerate(action_cards):
            if action_card == first_card:
                action_cards.pop(index)
                break
    action_card = random.choice(action_cards)
    return action_card

def actionRouterById(id, username, action, data):
    if (id == 1): action_1(username, action)
    if (id == 2) or (id == 51): action_2(username, action)
    if (id == 3): action_3(username, action)
    if (id == 4): action_4(username, action, data)
    if (id == 5) or (id == 8): action_5(username, action, data)
    if (id == 6): action_6(username, action, data)
    if (id == 7): action_7(username, action)
    if (id == 9): action_9(username, action)
    if (id == 10): action_10(username, action)
    if (id == 11): action_11(username, action)
    if (id == 12): action_12(username, action)
    if (id == 13): action_13(username, action)
    if (id == 14): action_14(username, action)
    if (id == 15): action_15(username, action)
    if (id == 16): action_16(username, action)
    if (id == 17) or (id == 22): action_17(username, action)
    if (id == 18) or (id == 23): action_18(username, action)
    if (id == 19) or (id == 24): action_19(username, action)
    if (id == 20) or (id == 25): action_20(username, action)
    if (id == 21): action_21(username, action)
    if (id == 26) or (id == 27) or (id == 28) or (id == 29) or \
        (id == 30) or (id == 31) or (id == 32) or (id == 33) or \
        (id == 34) or (id == 39): action_26(username, action)
    if (id == 35): action_35(username, action, data)
    if (id == 36): action_36(username, action, data)
    if (id == 37): action_37(username, action)
    if (id == 38): action_38(username, action)
    if (id == 40): action_40(username, action)
    if (id == 41): action_41(username, action, data)
    if (id == 42): action_42(username, action)
    if (id == 43): action_43(username, action)
    if (id == 44): action_44(username, action)
    if (id == 45): action_45(username, action, data)
    if (id == 46): action_46(username, action, data)
    if (id == 49): action_49(username, action)
    if (id == 50): action_50(username, action, data)

#Данная карта дает возможность тебе поменятья Спец картой с человеком справа
def action_1(person_username, action):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                try:
                    next_user_id = lobby.personsquery_set.filter(id__gt=user_.id).order_by("id")[0:1].get().id
                except BaseException:
                    next_user_id = lobby.personsquery_set.aggregate(Min("id"))['id__min']
                person = lobby.person_set.filter(linked_user__username = person_username).first()
                next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                if (random.randint(0, 1)):
                    next_person_action = next_person.action_2
                    #Проверка добавлено ли поле в список
                    next_user_shownfield = next_person.shownfields_set.filter(field = 'action_2').first()
                    if not next_user_shownfield:
                        field = ShownFields(field='action_2')
                        field.save()
                        next_person.shownfields_set.add(field)
                    #swap
                    if action == 'action_1':
                        next_person.action_2 = person.action_1
                        person.action_1 = next_person_action
                    else:
                        next_person.action_2 = person.action_2
                        person.action_2 = next_person_action
                else:
                    next_person_action = next_person.action_1
                    #Проверка добавлено ли поле в список
                    next_user_shownfield = next_person.shownfields_set.filter(field = 'action_1').first()
                    if not next_user_shownfield:
                        field = ShownFields(field='action_1')
                        field.save()
                        next_person.shownfields_set.add(field)
                    #swap
                    if action == 'action_1':
                        next_person.action_1 = person.action_1
                        person.action_1 = next_person_action
                    else:
                        next_person.action_1 = person.action_2
                        person.action_2 = next_person_action
                person.save()
                next_person.save()
                break

#Данная карта лечит тебя от бесплодия(Если тебе попалась карта 
#здоровья -бесплодие, то теперь ты идеально здоров
def action_2(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    if person.life == 'БЕСПЛОДИЕ':
        person.life = 'ИДЕАЛЬНО ЗДОРОВ'
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменяться картой состояния здоровья с человеком справа
def action_3(person_username, action):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                try:
                    next_user_id = lobby.personsquery_set.filter(id__gt=user_.id).order_by("id")[0:1].get().id
                except BaseException:
                    next_user_id = lobby.personsquery_set.aggregate(Min("id"))['id__min']
                person = lobby.person_set.filter(linked_user__username = person_username).first()
                next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                next_person_life = next_person.life
                next_person.life = person.life
                person.life = next_person_life
                field = ShownFields(field=action)
                field.save()
                person.shownfields_set.add(field)
                person.save()
                next_person.save()

#Данная карта дает тебе возможность поменяться картой Фобия с любым игроком на выбор
def action_4(person_username, action, data):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                if 'someone' in data:
                    next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
                    person = lobby.person_set.filter(linked_user__username = person_username).first()
                    next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                    next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                    next_person_phobia = next_person.phobia
                    next_person.phobia = person.phobia
                    person.phobia = next_person_phobia
                    field = ShownFields(field=action)
                    field.save()
                    person.shownfields_set.add(field)
                    person.save()
                    next_person.save()

#Данная карта дает тебе возможность поменяться картой состояния здоровья с любым человеком
def action_5(person_username, action, data):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                if 'someone' in data:
                    next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
                    person = lobby.person_set.filter(linked_user__username = person_username).first()
                    next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                    next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                    next_person_life = next_person.life
                    next_person.life = person.life
                    person.life = next_person_life
                    field = ShownFields(field=action)
                    field.save()
                    person.shownfields_set.add(field)
                    person.save()
                    next_person.save()

#Данная карта дает возможность тебе поменятья Спец картой с любым человеком
def action_6(person_username, action, data):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
                person = lobby.person_set.filter(linked_user__username = person_username).first()
                next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                if (random.randint(0, 1)):
                    next_person_action = next_person.action_2
                    #Проверка добавлено ли поле в список
                    next_user_shownfield = next_person.shownfields_set.filter(field = 'action_2').first()
                    if not next_user_shownfield:
                        field = ShownFields(field='action_2')
                        field.save()
                        next_person.shownfields_set.add(field)
                    #swap
                    if action == 'action_1':
                        next_person.action_2 = person.action_1
                        person.action_1 = next_person_action
                    else:
                        next_person.action_2 = person.action_2
                        person.action_2 = next_person_action
                else:
                    next_person_action = next_person.action_1
                    #Проверка добавлено ли поле в список
                    next_user_shownfield = next_person.shownfields_set.filter(field = 'action_1').first()
                    if not next_user_shownfield:
                        field = ShownFields(field='action_1')
                        field.save()
                        next_person.shownfields_set.add(field)
                    #swap
                    if action == 'action_1':
                        next_person.action_1 = person.action_1
                        person.action_1 = next_person_action
                    else:
                        next_person.action_1 = person.action_2
                        person.action_2 = next_person_action
                person.save()
                next_person.save()
                break

#Данная карта дает тебе возможность поменяться картой Фобия с человеком справа
def action_7(person_username, action):
    lobby = Lobby.objects.first()
    user = lobby.personsquery_set.filter(username = person_username).first()
    if (user):
        for i, user_ in enumerate(users_query):
            if user_.id == user.id:
                try:
                    next_user_id = lobby.personsquery_set.filter(id__gt=user_.id).order_by("id")[0:1].get().id
                except BaseException:
                    next_user_id = lobby.personsquery_set.aggregate(Min("id"))['id__min']
                person = lobby.person_set.filter(linked_user__username = person_username).first()
                next_user = lobby.personsquery_set.filter(id = next_user_id).first()
                next_person = lobby.person_set.filter(linked_user__username = next_user.username)
                next_person_phobia = next_person.phobia
                next_person.phobia = person.phobia
                person.phobia = next_person_phobia
                field = ShownFields(field=action)
                field.save()
                person.shownfields_set.add(field)
                person.save()
                next_person.save()

#Данная карта дает тебе возможность пере раздать у всех игроков (включая себя) карточки Состояние здоровья
def action_9(person_username, action):
    lobby = Lobby.objects.first()
    users = lobby.personsquery_set.all()
    for i, user in enumerate(users):
        person = lobby.person_set.filter(linked_user__username = user.username).first()
        person.life = getRandomLife()
        person.save()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность пере раздать у всех игроков (включая себя) карточки хобби
def action_10(person_username, action):
    lobby = Lobby.objects.first()
    users = lobby.personsquery_set.all()
    for i, user in enumerate(users):
        person = lobby.person_set.filter(linked_user__username = user.username).first()
        person.hobbi = getRandomHobbie()
        person.save()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность пере раздать у всех игроков (включая себя) 
#карточки Биологическая характеристика
def action_11(person_username, action):
    pass

#Данная карта дает тебе возможность вылечить тебя от любого недуга теперь ты абсолютно здоров
def action_12(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.life = 'ИДЕАЛЬНО ЗДОРОВ'
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность вылечить твою фобию
def action_13(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.phobia = 'НЕТ ФОБИИ'
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Все игроки меняются картами профессия по часовой стрелке
def action_14(person_username, action):
    lobby = Lobby.objects.first()
    users = lobby.personsquery_set.all()
    prev_prof = ''
    for i, user in enumerate(users):
        person = lobby.person_set.filter(linked_user__username = user.username).first()
        if (i == (users.count() - 1)):
            person = lobby.person_set.filter(linked_user__username = user.username).first()
            first_person = lobby.person_set.filter(linked_user__username = users[0].username).first()
            buf = person.profession
            person.profession = prev_prof
            first_person.profession = buf
            first_person.save()
        else:
            person = lobby.person_set.filter(linked_user__username = user.username).first()
            buf = person.profession
            person.profession = prev_prof
            prev_prof = buf
        person.save()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность аннулировать карточки профессия у всех игроков
#(Принимайте решения на основании оставшейся информации)
def action_15(person_username, action):
    lobby = Lobby.objects.first()
    users = lobby.personsquery_set.all()
    for i, user in enumerate(users):
        person = lobby.person_set.filter(linked_user__username = user.username).first()
        person.profession = ''
        person.save()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карты профессия на новую из колоды
def action_16(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.profession = getRandomProfesion()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карту характеристика на новую из колоды
def action_17(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.character = getRandomCharacter()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карту состояния здоровья на новую из колоды
def action_18(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.life = getRandomLife()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карту фобия на новую из колоды
def action_19(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.phobia = getRandomFobie()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карту из дополнительная информация на новую из колоды
def action_20(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.inventar = getRandomInventar()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность поменять свою карту из профессия на новую из колоды
def action_21(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.profession = getRandomProfesion()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Рядом с вами второй бункер где находятся два строителя
#Рядом с вами второй бункер и он настроен не доброжелательно Подумайте о своей безопасности
#Бункер находится на территории парка с аттракционами (разрушение парка 20%)
#В 20 метрах от вашего бункера сохранился погреб с вином
#В 30 метрах от вас склад с оружием
#Рядом с вами второй бункер где находятся два медицинских сотрудника
#Возле вас находится бункер в котором одни женщины (здоровые возраст до 30 лет)
#Возле вас находится бункер в котором одни мужчины (здоровые возраст до 30 лет)
#Рядом с вами второй бункер где находится два химика
#В 30 метрах от вас склад с оружием
def action_26(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    legend = lobby.legend
    if (action == 'action_1'):
        action_text = person.action_1
    else:
        action_text = person.action_2
    legend.additional_info = (legend.additional_info + '. ' + action_text) if not legend.additional_info == '' else legend.additional_info
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    legend.save()
    person.save()

#Данная карта дает тебе возможность открыть любую карту любой категории у любого игрока на выбор
def action_35(person_username, action, data):
    lobby = Lobby.objects.first()
    if ('someone' in data) and ('card' in data):
        next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
        next_user = lobby.personsquery_set.filter(id = next_user_id).first()
        next_person = lobby.person_set.filter(linked_user__username = next_user.username)
        next_user_shownfield = next_person.shownfields_set.filter(field = data['card']).first()
        if not next_user_shownfield:
            field = ShownFields(field=data['card'])
            field.save()
            next_person.shownfields_set.add(field)
            next_person.save()
        person = lobby.person_set.filter(linked_user__username = person_username).first()
        field = ShownFields(field=action)
        field.save()
        person.shownfields_set.add(field)
        person.save()

#Данная карта дает тебе возможность открыть карту состояния здоровья у любого игрока
def action_36(person_username, action, data):
    lobby = Lobby.objects.first()
    if 'someone' in data:
        next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
        next_user = lobby.personsquery_set.filter(id = next_user_id).first()
        next_person = lobby.person_set.filter(linked_user__username = next_user.username)
        field = ShownFields(field='life')
        field.save()
        next_person.shownfields_set.add(field)
        next_person.save()
        person = lobby.person_set.filter(linked_user__username = person_username).first()
        field = ShownFields(field=action)
        field.save()
        person.shownfields_set.add(field)
        person.save()

#Чтобы одержать победу тебе нужно попасть в бункер вместе с игроком справа от тебя(КАРТА НЕ ВСКРЫВАЕТСЯ)
def action_37(person_username, action):
    pass

#Чтобы одержать победу тебе нужно попасть в бункер а человек слева от тебя - враг если он останеться в игре ты проиграешь даже попав в бункер
def action_38(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карты увеличивает твое время на высказывание на 1 минуту
def action_40(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.speak_time = person.speak_time + 60
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карточка дает тебе возможность сократить время высказывания любого игрока на 30 секунд
def action_41(person_username, action, data):
    if 'someone' in data:
        if not data['someone'] == person_username:
            next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
            next_user = lobby.personsquery_set.filter(id = next_user_id).first()
            next_person = lobby.person_set.filter(linked_user__username = next_user.username)
            next_person.speak_time = next_person.speak_time - 30
            next_person.save()
            person = lobby.person_set.filter(linked_user__username = person_username).first()
            field = ShownFields(field=action)
            field.save()
            person.shownfields_set.add(field)
            person.save()

#Количество мест в бункере больше на 1
def action_42(person_username, action):
    lobby = Lobby.objects.first()
    lobby.number_of_seats = lobby.number_of_seats + 1
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()
    lobby.save()

#Количество мест в бункере меньше на 1
def action_43(person_username, action):
    lobby = Lobby.objects.first()
    lobby.number_of_seats = lobby.number_of_seats - 1
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()
    lobby.save()

#У тебя есть защита на один игровой круг если против твоего персонажа максимально количество голосов
def action_44(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.protection = True
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#У тебя есть защита на один игровой круг другого игрока, ты не можешь защитить себя
def action_45(person_username, action, data):
    lobby = Lobby.objects.first()
    if 'someone' in data:
        if not data['someone'] == person_username:
            next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
            next_user = lobby.personsquery_set.filter(id = next_user_id).first()
            next_person = lobby.person_set.filter(linked_user__username = next_user.username)
            next_person.protection = True
            next_person.save()
            person = lobby.person_set.filter(linked_user__username = person_username).first()
            field = ShownFields(field=action)
            field.save()
            person.shownfields_set.add(field)
            person.save()

#Данная карта дает тебе возможность самому выбрать кто покинет игровой круг без голосования
def action_46(person_username, action, data):
    lobby = Lobby.objects.first()
    if 'someone' in data:
        if not data['someone'] == person_username:
            lobby.person_set.filter(linked_user__username = data['someone']).first().delete()
            lobby.userinfo_set.filter(username = data['someone']).first().delete()
            lobby.personsquery_set.filter(username = data['someone']).first().delete()
            lobby.personskicklist_set.all().delete()
            lobby.save()
            person = lobby.person_set.filter(linked_user__username = person_username).first()
            field = ShownFields(field=action)
            field.save()
            person.shownfields_set.add(field)
            person.save()

#Данная карта дает возможность добавить один голос на голосовании, теперь их у тебя 2
def action_49(person_username, action):
    lobby = Lobby.objects.first()
    person = lobby.person_set.filter(linked_user__username = person_username).first()
    person.voices = person.voices + 1
    field = ShownFields(field=action)
    field.save()
    person.shownfields_set.add(field)
    person.save()

#Данная карта дает тебе возможность забрать голос другого игрока, теперь у тебя их 2 (твой и чей голос ты забрал(а))
def action_50(person_username, action, data):
    lobby = Lobby.objects.first()
    if 'someone' in data:
        if not data['someone'] == person_username:
            next_user_id = lobby.personsquery_set.filter(username = data['someone']).first().id
            next_user = lobby.personsquery_set.filter(id = next_user_id).first()
            next_person = lobby.person_set.filter(linked_user__username = next_user.username)
            next_person.weight = (next_person.weight - 1) if next_person.weight >= 1 else 0
            next_person.save()
            person = lobby.person_set.filter(linked_user__username = person_username).first()
            person.weight = person.weight + 1
            field = ShownFields(field=action)
            field.save()
            person.shownfields_set.add(field)
            person.save()
