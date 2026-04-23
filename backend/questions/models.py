from django.db import models


class Question(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]

    department = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    image = models.CharField(max_length=255, blank=True, default='')
    question = models.TextField()
    answers = models.JSONField()
    correct = models.IntegerField()
    explanation = models.TextField()

    def __str__(self):
        return f"[{self.department}] {self.question[:60]}"
