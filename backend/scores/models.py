from django.db import models
from django.contrib.auth.models import User


class Score(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='score')
    quiz_points = models.IntegerField(default=0)
    boss_damage = models.IntegerField(default=0)
    upgrade = models.CharField(max_length=50, default='', blank=True)

    @property
    def total(self):
        return self.quiz_points + self.boss_damage

    @property
    def level(self):
        return self.quiz_points // 500

    def __str__(self):
        return f"{self.user.username}: {self.total}"
