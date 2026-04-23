from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username', '')
    password = request.data.get('password', '')

    user = authenticate(username=username, password=password)
    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    groups = list(user.groups.values_list('name', flat=True))
    role = groups[0] if groups else 'user'

    refresh = RefreshToken.for_user(user)

    return Response({
        'access': str(refresh.access_token),
        'username': user.username,
        'role': role,
    })


@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    username = request.data.get('username', '').strip()
    if not username:
        return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password='bip2026')
    groups = list(user.groups.values_list('name', flat=True))
    role = groups[0] if groups else 'user'

    refresh = RefreshToken.for_user(user)
    return Response(
        {
            'access': str(refresh.access_token),
            'username': user.username,
            'role': role,
            'message': 'User created successfully. Your password is bip2026.',
        },
        status=status.HTTP_201_CREATED,
    )
