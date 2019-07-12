#-*-coding:utf-8-*-

from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm,RegisterForm
from django.http import JsonResponse
from utils import restful
from django.shortcuts import redirect,reverse
from io import BytesIO
from django.http import HttpResponse
from utils.captcha.xfzcaptcha import Captcha
from utils import messageSender
from django.core.cache import cache
from .models import User
# from django.contrib.auth import get_user_model

@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        user = authenticate(request,telephone=telephone,password=password)
        if user:
            if user.is_active:
                login(request,user)
                if remember:
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return restful.ok()
            else:
                return restful.unauth(message="您的账号已经被冻结！")
        else:
            return restful.params_error(message="手机号或者密码错误")
    else:
        errors = form.get_errors()
        return restful.params_error(message=errors)

def logout_view(request):
    logout(request)
    return redirect(reverse('index'))

@require_POST
def register(request):
    form = RegisterForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get("telephone")
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = User.objects.create_user(telephone=telephone,username=username,password=password)
        login(request,user)
        return restful.ok()
    else:
        return restful.params_error(message=form.get_errors())


#生成验证码
def img_captcha(request):
    text,image = Captcha.gene_code()
    #BytesIO相当于一个管道，用来存储图片的流数据
    out = BytesIO()
    #调用image的save方法，将image对象保存到BytesIO中
    image.save(out,'png')
    #将BytesIO的文件指针移动到最开始的位置
    out.seek(0)

    response = HttpResponse(content_type = 'image/png')
    #从BytesIO的管道中，读取图片数据，保存到response对象上
    response.write(out.read())
    response['Content_length'] = out.tell()
    cache.set(text, text, 5 * 60)
    return response

#生成短信验证码
def sms_captcha(request):
    telephone = request.GET.get('telephone')
    code = Captcha.gene_text()
    cache.set(telephone,code,5*60)
    cachecode = str(cache.get(code))
    print("cachecode:" + cachecode)
    print('短信验证码：' + code)
    # result = messageSender.send(telephone,code)
    # if result:
    #     return restful.ok()
    # else:
    #     return restful.params_error(message="短信验证码发送失败")
    return restful.ok()


