from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Question
from .serializers import QuestionSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def questions_list(request):
    department = request.query_params.get('department', None)
    qs = Question.objects.all()
    if department:
        qs = qs.filter(department__iexact=department)
    serializer = QuestionSerializer(qs, many=True)
    return Response(serializer.data)


