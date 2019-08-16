#-*-coding:utf-8-*-
from . import views
from django.urls import path

app_name = 'cms'

urlpatterns = [
    path('',views.index,name='index'),
    path('write_news/',views.WriteNewsView.as_view(),name='write_news'),
    path('category_news/',views.category_news,name='category_news'),
    path('add_news_category/',views.add_news_category,name='add_news_category'),
    path('edit_news_category/',views.edit_news_category,name='edit_news_category'),
    path('delete_news_category/',views.delete_news_category,name='delete_news_category'),
    path('upload_file/',views.upload_file,name='upload_file'),
    path('qntoken/',views.qntoken,name='qntoken'),
]