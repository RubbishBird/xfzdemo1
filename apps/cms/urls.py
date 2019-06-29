#-*-coding:utf-8-*-
from . import views
from django.urls import path

app_name = 'cms'

urlpatterns = [
    path('cms/',views.login_view,name='login')
]