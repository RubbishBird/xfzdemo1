#-*-coding:utf-8-*-

from django.contrib.auth import login,logout,authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from django.http import JsonResponse
from utils import restful
from django.shortcuts import redirect,reverse
from io import BytesIO
from django.http import HttpResponse
from utils.captcha.xfzcaptcha import Captcha


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


def img_captcha(request):
    text,image = Captcha.gene_code()
    #BytesIO相当于一个管道，用来存储图片的流数据
    out = BytesIO()
    #调用image的save方法，将image对象保存到BytesIO中
    image.save(out,'png')
    #将BytesIO的文件指针移动到最开始的位置
    out.seek(0)

    response = HttpResponse(Content_type = 'image/png')
    #从BytesIO的管道中，读取图片数据，保存到response对象上
    response.write(out.read())
    response['Content_length'] = out.tell()

    return response
