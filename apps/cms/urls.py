#-*-coding:utf-8-*-
from . import views
from django.urls import path

app_name = 'cms'

urlpatterns = [
    path('',views.login_view,name='login')
]