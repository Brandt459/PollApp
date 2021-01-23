from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('poll-list/', views.pollList),
    path('create-poll/', views.createPoll),
    path('delete-poll/<str:pk>/', views.deletePoll),
    path('update/<str:pk>/', views.update),
    path('token-auth/', obtain_jwt_token),
    path('users/', views.UserList.as_view()),
]
