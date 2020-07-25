from db_models import urls
from django.urls import path
from django.conf.urls import include, url

urlpatterns = [
    path('', include(urls)),
    path('', include('www.urls'))
]
