from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Boss
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
    return Response(_serialize_boss(boss))


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
