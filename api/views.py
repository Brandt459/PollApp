from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from .serializers import PollSerializer, UserSerializer, UserSerializerWithToken
from .models import Poll

# Create your views here.


@api_view(['GET'])
def pollList(request):
    polls = Poll.objects.all()
    serializer = PollSerializer(polls, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createPoll(request):
    serializer = PollSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def deletePoll(request, pk):
    poll = Poll.objects.get(id=pk)
    poll.delete()
    return Response('Poll deleted')


@api_view(['POST'])
def update(request, pk):
    poll = Poll.objects.get(id=pk)
    serializer = PollSerializer(instance=poll, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def getUserId(request):
    return Response(User.objects.get(username=request.data["username"]).id)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
