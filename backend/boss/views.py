from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Boss
from .consumers import BOSS_GROUP
from questions.models import Question
from questions.serializers import QuestionSerializer


def _serialize_boss(boss):
    return {
        'id': boss.pk,
        'name': boss.name,
        'description': boss.description,
        'currentHp': boss.current_hp,
        'maxHp': boss.max_hp,
    }


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def boss_state_view(request):
    boss = Boss.get_active()
    if not boss:
        return Response({'error': 'No active boss'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return Response(_serialize_boss(boss))

    new_hp = int(request.data.get('currentHp', boss.current_hp))
    boss.current_hp = max(0, min(boss.max_hp, new_hp))
    boss.save()
    async_to_sync(get_channel_layer().group_send)(
        BOSS_GROUP,
        {'type': 'boss_hp_update', 'currentHp': boss.current_hp},
    )
    return Response(_serialize_boss(boss))


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def boss_create_view(request):
    name = request.data.get('name', '').strip()
    if not name:
        return Response({'error': 'Name is required'}, status=status.HTTP_400_BAD_REQUEST)

    boss = Boss.objects.create(
        name=name,
        description=request.data.get('description', ''),
        max_hp=int(request.data.get('maxHp', 10000)),
        is_active=True,
    )
    return Response(_serialize_boss(boss), status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def boss_questions_view(request):
    boss = Boss.get_active()
    if not boss:
        return Response([])
    if boss.questions.exists():
        qs = boss.questions.all()
    else:
        qs = Question.objects.exclude(difficulty__iexact='easy')
    serializer = QuestionSerializer(qs, many=True)
    return Response(serializer.data)
