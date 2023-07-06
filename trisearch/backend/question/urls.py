from django.urls import path
from .views import (
    QuestionsGeneral,
    QuestionsDetail,
)

urlpatterns = [
    path('', QuestionsGeneral.as_view()),
    path('<int:pk>/', QuestionsDetail.as_view()),
]