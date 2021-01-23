from django.contrib import admin
from django.apps import apps
from knox.models import AuthToken
from rest_framework.authtoken.models import TokenProxy


models = apps.get_models()

for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass

admin.site.unregister(AuthToken)
admin.site.unregister(TokenProxy)
