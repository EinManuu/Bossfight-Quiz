from django.db import models


class Boss(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    max_hp = models.IntegerField(default=10000)
    current_hp = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)
    questions = models.ManyToManyField('questions.Question', blank=True)

    def save(self, *args, **kwargs):
        if not self.pk and self.current_hp == 0:
            self.current_hp = self.max_hp
        if self.is_active:
            Boss.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)

    @classmethod
    def get_active(cls):
        return cls.objects.filter(is_active=True).prefetch_related('questions').first()

    def __str__(self):
        status = 'Active' if self.is_active else 'Inactive'
        return f"{self.name} [{status}] {self.current_hp:,}/{self.max_hp:,} HP"
