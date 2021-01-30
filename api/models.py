from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Poll(models.Model):
    title = models.CharField(max_length=200)
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option1total = models.IntegerField(default=0)
    option2total = models.IntegerField(default=0)
    owner = models.CharField(max_length=150, null=True)
    option1votes = models.ManyToManyField(
        User, related_name="option1votes", blank=True)
    option2votes = models.ManyToManyField(
        User, related_name="option2votes", blank=True)
    votes = models.ManyToManyField(
        User, related_name="votes", blank=True)

    def __str__(self):
        return self.title
