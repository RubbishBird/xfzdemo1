from django.db import models

class NewsCategory(models.Model):
    name = models.CharField(max_length=100)


class NewsLink(models.Model):
    link = models.CharField(max_length=300)