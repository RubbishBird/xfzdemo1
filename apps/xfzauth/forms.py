#-*-coding:utf-8-*-
from django import forms
from apps.forms import FormMixin
from django.core.cache import cache
from .models import User


class LoginForm(forms.Form,FormMixin):
    telephone = forms.CharField(max_length=11)
    password = forms.CharField(max_length=20,min_length=6,error_messages={"max_length":"密码最多不能超过20个字符！","min_length":"密码最少不能少于6个字符！"})
    remember = forms.IntegerField(required=False)



class RegisterForm(forms.Form,FormMixin):
    telephone = forms.CharField(max_length=11)
    username = forms.CharField(max_length=100)
    password1 = forms.CharField(max_length=20, min_length=6,error_messages={"max_length": "密码最多不能超过20个字符！", "min_length": "密码最少不能少于6个字符！"})
    password2 = forms.CharField(max_length=20, min_length=6,error_messages={"max_length": "密码最多不能超过20个字符！", "min_length": "密码最少不能少于6个字符！"})
    img_captcha = forms.CharField(max_length=4,min_length=4)
    sms_captcha = forms.CharField(max_length=4, min_length=4)

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')

        # 验证两次输入密码是否一致
        if password1 != password2:
            raise forms.ValidationError("两次输入密码不一致!")

        # 验证图片验证码
        img_captcha = cleaned_data.get("img_captcha")
        cached_img_captcha = cache.get(img_captcha)
        if not cached_img_captcha or cached_img_captcha != img_captcha:
            raise forms.ValidationError("图片验证码错误！")

        telephone = cleaned_data.get('telephone')
        sms_captcha = cleaned_data.get('sms_captcha')
        cached_sms_captcha = cache.get(telephone)
        if not cached_sms_captcha or cached_sms_captcha != sms_captcha:
            raise forms.ValidationError("手机验证码错误！")

        exists = User.objects.filter(telephone=telephone).exists()
        if exists:
            forms.ValidationError("该手机号码已注册！")

        return cleaned_data


