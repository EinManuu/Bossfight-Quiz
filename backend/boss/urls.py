from django.urls import path
from . import views

urlpatterns = [
    path('state/', views.boss_state_view, name='boss-state'),
    path('questions/', views.boss_questions_view, name='boss-questions'),
]
