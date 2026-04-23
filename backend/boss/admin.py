from django.contrib import admin
from .models import Boss


@admin.register(Boss)
class BossAdmin(admin.ModelAdmin):
    list_display = ['name', 'hp_display', 'is_active', 'question_count']
    list_editable = ['is_active']
    filter_horizontal = ['questions']
    actions = ['reset_hp']

    def hp_display(self, obj):
        return f"{obj.current_hp:,} / {obj.max_hp:,}"
    hp_display.short_description = 'HP'

    def question_count(self, obj):
        count = obj.questions.count()
        return count if count else 'all medium/hard'
    question_count.short_description = 'Question pool'

    @admin.action(description='Reset HP to max')
    def reset_hp(self, request, queryset):
        for boss in queryset:
            boss.current_hp = boss.max_hp
            boss.save()
        self.message_user(request, f"Reset HP for {queryset.count()} boss(es).")
