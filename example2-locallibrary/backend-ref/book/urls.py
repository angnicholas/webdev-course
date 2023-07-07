from django.urls import path
from .views import (
    ListBooks,
    GetBook,
)

urlpatterns = [
    path('list/', ListBooks.as_view()),
    path('list/<int:pk>/', GetBook.as_view()),
]