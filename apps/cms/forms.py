#-*-coding:utf-8-*-

from apps.forms import FormMixin
from django import forms

class EditNewsCategoryForm(forms.Form,FormMixin):
    pk = forms.IntegerField(error_messages={'required':'必须传入分类的ID'})
    name = forms.CharField(max_length=100)