from api.serializers import UserSerializer


def jwtResponseHandler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }
