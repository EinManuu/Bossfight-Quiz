from django.urls import re_path
from .consumers import BossConsumer

websocket_urlpatterns = [
    re_path(r'^ws/boss/$', BossConsumer.as_asgi()),
]
