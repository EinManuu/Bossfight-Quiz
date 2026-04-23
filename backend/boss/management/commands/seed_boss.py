from django.core.management.base import BaseCommand
from boss.models import Boss


class Command(BaseCommand):
    help = 'Seed the default Phishing Storm boss'

    def handle(self, *args, **options):
        if Boss.objects.exists():
            self.stdout.write('Boss already exists — skipping.')
            return

        Boss.objects.create(
            name='Phishing Storm',
            description='A coordinated phishing campaign is targeting the company. '
                        'Answer questions correctly to deal damage and protect the network.',
            max_hp=10000,
            current_hp=6200,
            is_active=True,
        )
        self.stdout.write(self.style.SUCCESS(
            "Created boss 'Phishing Storm' (active, HP 6200/10000). "
            "No questions selected — falls back to all medium/hard questions."
        ))
