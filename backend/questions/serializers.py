from rest_framework import serializers
from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'department', 'difficulty', 'image', 'question', 'answers', 'correct', 'explanation']
