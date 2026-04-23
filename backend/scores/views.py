from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Score

VALID_UPGRADES = {'power', 'exploit', 'zeroday'}


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leaderboard_view(request):
    entries = []
    for score in Score.objects.select_related('user').prefetch_related('user__groups'):
        groups = list(score.user.groups.values_list('name', flat=True))
        role = groups[0] if groups else 'user'
        entries.append({
            'username': score.user.username,
            'role': role,
            'quizPoints': score.quiz_points,
            'bossDamage': score.boss_damage,
            'total': score.total,
        })
    entries.sort(key=lambda e: e['total'], reverse=True)
    return Response(entries)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_score_view(request):
    quiz_points = int(request.data.get('quizPoints', 0))
    boss_damage = int(request.data.get('bossDamage', 0))

    score, _ = Score.objects.get_or_create(user=request.user)
    score.quiz_points += quiz_points
    score.boss_damage += boss_damage
    score.save()

    return Response({
        'quizPoints': score.quiz_points,
        'bossDamage': score.boss_damage,
        'total': score.total,
        'level': score.level,
        'upgrade': score.upgrade,
    }, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def upgrade_view(request):
    upgrade = request.data.get('upgrade', '')
    if upgrade not in VALID_UPGRADES:
        return Response({'error': 'Invalid upgrade'}, status=status.HTTP_400_BAD_REQUEST)
    score, _ = Score.objects.get_or_create(user=request.user)
    score.upgrade = upgrade
    score.save()
    return Response({'upgrade': score.upgrade}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stats_view(request):
    score, _ = Score.objects.get_or_create(user=request.user)
    return Response({
        'quizPoints': score.quiz_points,
        'bossDamage': score.boss_damage,
        'total': score.total,
        'level': score.level,
        'upgrade': score.upgrade,
    })


