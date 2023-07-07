from django.shortcuts import render
from rest_framework.generics import (
    GenericAPIView,
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView,
    UpdateAPIView,
)
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class ListBooks(GenericAPIView):
    def get(self, request, *args, **kwargs):
        print('This is the Request', request)
        print('This is the Request data', request.data)
        print('This is the Request query params', request.query_params)
        print('These are the args', args)
        print('These are the kwargs', kwargs)
        print('Let us send a response!')
        return Response("hello", status=status.HTTP_200_OK)

class GetBook(GenericAPIView):
    def get(self, request, *args, **kwargs):
        print('This is the Request', request)
        print('This is the Request data', request.data)
        print('This is the Request query params', request.query_params)
        print('These are the args', args)
        print('These are the kwargs', kwargs)
        print('Let us send a response!')
        return Response("hello", status=status.HTTP_200_OK)
