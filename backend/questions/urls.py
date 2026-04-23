from django.urls import path
from . import views

urlpatterns = [
    path('', views.questions_list, name='questions-list'),
    path('create/', views.create_question, name='create-question'),
]
