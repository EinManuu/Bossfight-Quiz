from django.urls import path
from . import views

urlpatterns = [
    path('state/', views.boss_state_view, name='boss-state'),
    path('create/', views.boss_create_view, name='boss-create'),
    path('questions/', views.boss_questions_view, name='boss-questions'),
]
