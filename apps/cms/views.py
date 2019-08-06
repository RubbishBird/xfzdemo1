from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.views.generic import View
from django.views.decorators.http import require_POST,require_GET
from utils import restful
from apps.news.models import NewsCategory

@staff_member_required(login_url='index')
def index(request):
    return render(request,'cms/index.html')


class WriteNewsView(View):
    def get(self,request):
        return render(request,'cms/write_news.html')


@require_GET
def category_news(request):
    return render(request,'cms/news_category.html')

@require_POST
def add_news_category(request):
    name = request.GET.get('name')
    exists = NewsCategory.objects.filter(name=name).exists()
    if not exists:
        NewsCategory.objects.create(name=name)
        return restful.ok()
    else:
        return restful.params_error(message="该分类名称已经存在")
