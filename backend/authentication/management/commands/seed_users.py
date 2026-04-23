from django.core.management.base import BaseCommand
from django.contrib.auth.models import User, Group


SEED_USERS = [
    {'username': 'IT', 'password': 'IT123', 'group': 'IT'},
    {'username': 'Finance', 'password': 'Finance123', 'group': 'Finance'},
]


class Command(BaseCommand):
    help = 'Seed initial IT and Finance users'

    def handle(self, *args, **options):
        for entry in SEED_USERS:
            group, _ = Group.objects.get_or_create(name=entry['group'])

            if User.objects.filter(username=entry['username']).exists():
                self.stdout.write(f"User '{entry['username']}' already exists, skipping.")
                continue

            user = User.objects.create_user(
                username=entry['username'],
                password=entry['password'],
            )
            user.groups.add(group)
            self.stdout.write(self.style.SUCCESS(f"Created user '{entry['username']}' in group '{entry['group']}'"))
