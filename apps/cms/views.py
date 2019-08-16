from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.views.generic import View
from django.views.decorators.http import require_POST,require_GET
from utils import restful
from apps.news.models import NewsCategory
from apps.cms.forms import EditNewsCategoryForm
import os
from django.conf import settings
import qiniu

@staff_member_required(login_url='index')
def index(request):
    return render(request,'cms/index.html')


class WriteNewsView(View):
    def get(self,request):
        categories = NewsCategory.objects.all()
        context = {
            'categories':categories
        }
        return render(request,'cms/write_news.html',context=context)


@require_GET
def category_news(request):
    categories = NewsCategory.objects.all()
    context = {
        'categories':categories
    }
    return render(request,'cms/news_category.html',context=context)

@require_POST
def add_news_category(request):
    name = request.POST.get('name')
    exists = NewsCategory.objects.filter(name=name).exists()
    if not exists:
        NewsCategory.objects.create(name=name)
        return restful.ok()
    else:
        return restful.params_error(message="该分类名称已经存在")


@require_POST
def edit_news_category(request):
    form = EditNewsCategoryForm(request.POST)
    if form.is_valid():
        pk = form.cleaned_data.get('pk')
        name = form.cleaned_data.get('name')
        exists = NewsCategory.objects.filter(name=name).exists()
        try:
            if not exists:
                NewsCategory.objects.filter(pk=pk).update(name=name)
                return restful.ok()
            else:
                return restful.params_error(message='该分类名称已存在')
        except:
            return restful.params_error(message='该分类不存在')
    else:
        return restful.params_error(message=form.get_errors())

def delete_news_category(request):
    pk = request.POST.get('pk')
    try:
        NewsCategory.objects.filter(pk=pk).delete()
        return restful.ok()
    except:
        return restful.unauth(message='该分类不存在')


@require_POST
def upload_file(request):
    file = request.FILES.get('file')
    name = file.name
    with open(os.path.join(settings.MEDIA_ROOT,name),'wb') as fp:
        for chunk in file.chunks():
            fp.write(chunk)
    url = request.build_absolute_uri(settings.MEDIA_URL+name)
    return restful.result(data={'url':url})


@require_GET
def qntoken(request):
    access_key = 'vWrrniJ33WvIqpsf84WA_TVSGh8t77J7lCePUkT0'
    secret_key = 'qbVvAvxAvvfl9aN9W4Rxs2O6hXHAcwuLo8ezbfp1'
    # bucket为七牛存储空间的名称
    bucket = 'feng'
    q = qiniu.Auth(access_key, secret_key)
    token = q.upload_token(bucket)
    url =request.build_absolute_uri()
    return restful.result(data={'token':token,'url':url})


