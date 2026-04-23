from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/questions/', include('questions.urls')),
    path('api/', include('scores.urls')),
    path('api/boss/', include('boss.urls')),
]
