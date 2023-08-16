from django.shortcuts import render

from rest_framework.generics import (
    GenericAPIView
)

from rest_framework.response import Response
from rest_framework import status

from .models import Question
from tag.models import Tag
from .serializers import QuestionSerializer
from django.core import serializers

class QuestionsGeneral(GenericAPIView):
    # serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    def get(self, request, *args, **kwargs):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            question = serializer.save()
            return Response(QuestionSerializer(question).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)