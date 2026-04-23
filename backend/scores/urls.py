from django.urls import path
from . import views

urlpatterns = [
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
    path('scores/add/', views.add_score_view, name='add-score'),
    path('scores/upgrade/', views.upgrade_view, name='upgrade'),
    path('scores/stats/', views.stats_view, name='stats'),
]
