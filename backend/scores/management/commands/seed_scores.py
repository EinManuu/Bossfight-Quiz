from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Group
from scores.models import Score
import secrets

DEMO_USERS = [
    {'username': 'jsmith',    'group': 'Finance', 'quiz_points': 210, 'boss_damage': 850},
    {'username': 'aparker',   'group': 'IT',      'quiz_points': 290, 'boss_damage': 1200},
    {'username': 'mthompson', 'group': 'IT',      'quiz_points': 180, 'boss_damage': 600},
    {'username': 'lchang',    'group': 'Finance', 'quiz_points': 130, 'boss_damage': 400},
    {'username': 'rnguyen',   'group': 'IT',      'quiz_points': 260, 'boss_damage': 950},
    {'username': 'sbrown',    'group': 'Finance', 'quiz_points': 90,  'boss_damage': 300},
]


class Command(BaseCommand):
    help = 'Seed demo leaderboard users and their scores'

    def handle(self, *args, **options):
        for entry in DEMO_USERS:
            group, _ = Group.objects.get_or_create(name=entry['group'])

            user, created = User.objects.get_or_create(username=entry['username'])
            if created:
                user.set_password(secrets.token_urlsafe(16))
                user.save()
                user.groups.add(group)
                self.stdout.write(f"Created demo user '{entry['username']}'")

            score, _ = Score.objects.get_or_create(user=user)
            score.quiz_points = entry['quiz_points']
            score.boss_damage = entry['boss_damage']
            score.save()
            self.stdout.write(self.style.SUCCESS(
                f"  Score set: {entry['quiz_points']} quiz / {entry['boss_damage']} boss"
            ))

        # Ensure the real IT and Finance users have a Score row too
        for username in ('IT', 'Finance'):
            user = User.objects.filter(username=username).first()
            if user:
                Score.objects.get_or_create(user=user)
                self.stdout.write(f"Ensured Score row for '{username}'")
