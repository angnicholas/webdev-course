from django.shortcuts import render
from rest_framework.generics import (
    GenericAPIView,
    # CreateAPIView,
    # ListAPIView,
    # RetrieveAPIView,
    # DestroyAPIView,
    # UpdateAPIView,
)
from rest_framework.response import Response
from rest_framework import status

from .models import Question
from tag.models import Tag
from .serializers import QuestionSerializer
from django.core import serializers

# 5 endpoints

# CRUD -> 4 operations that you can do data

# -> /question/
# - create
# - read everything

# -> /question/2
# - read 1 particular one
# - modify 1 particular one
# - delete 1 particular one





# Endpoint consists of a URL + Verb.
# We typically group the same URL under the same class.
# Then each method in the class corresponds to each verb.

class QuestionsGeneral(GenericAPIView): # For the "/" URL.
    # Corresponds to the '/question/' URL

    # First, consider the GET method, getting all Questions.

    # This is a demonstration of how to retrieve objects from a database
    # and send it over a REST API.

    # Every API endpoint begins with a request and ends with a response.
    # Therefore, we will start with the request.
    
    def get1(self, request, *args, **kwargs):
        # Request consists of 4 parts
        # The VERB: (get, post, put, etc.) -> in this case it is GET
        # The URL 
        # The Headers
        # The Payload

        # Which get parsed into different parts that can be accessed by us.

        print('')
        print('')
        print('')

        print("We hit list questions!")
        print('This is the Request', request)
        print('This is the Request HEADERS', request.headers)

        print('This is the Request data', request.data)
        print('This is the Request query params', request.query_params)
        print('These are the args', args)
        print('These are the kwargs', kwargs)

        print('Let us send a response!')

        return Response([{"hello":4}, 6], status=status.HTTP_404_NOT_FOUND)
    

    
    def get2(self, request, *args, **kwargs):
        # Now let's examine the response. A response is just some
        # collection of simple-formed data (think dicts, lists, 
        # strings, ints, no objects) that can be sent over the wire.

        queryset = Question.objects.filter(pk=1)
        print('Queryset is', queryset)

        queryset = Question.objects.all()
        print('Queryset is', queryset)

        return Response(queryset, status=status.HTTP_200_OK)

    def get3(self, request, *args, **kwargs):
        # Since we can't send objects (how do you send an apple over
        # a copper wire when the other side doesn't know what the 
        # structure of an apple is?) - we have to serialize all objects ->
        # convert them into some primitive form

        queryset = Question.objects.filter(pk=1)
        serialized = serializers.serialize("json", queryset)
        return Response(serialized, status=status.HTTP_200_OK)
    
    # https://www.django-rest-framework.org/tutorial/1-serialization/#working-with-serializers
    def get4(self, request, *args, **kwargs):
        # An easy way to make life easier, is to use a serializer
        # that is derived from the object we defined instead
        # giving additional functionality

        queryset = Question.objects.filter(pk=1) # [question1]
        my_object = queryset[0] #question1

        serializer = QuestionSerializer(my_object) #serializer object -> 
        print('Serializer data', serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    






    def get5(self, request, *args, **kwargs):
        # So now we can send groups of items over as well

        queryset = Question.objects.all()
        serializer = QuestionSerializer(queryset, many=True)
        print('Serializer data', serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get6(self, request, *args, **kwargs):
        # Sending all items over is not very useful, usually we want to 
        # be able to filter.

        # Use the Django ORM to obtain all Questions containing a tag
        # with name 'Differential Equations'

        questions_have_tag_diff_eqns = Question.objects.filter(
            tags__name='Differential Equations'
        )

        # View the SQL command generated:
        print("=============")
        print("THIS IS THE SQL COMMAND GENERATED. NOTE THE JOINS:")
        print(str(questions_have_tag_diff_eqns.query))
        print("=============")

        # Note: There are multiple ways to run ORM commands to get 
        # some kind of data. Some are more efficient than the others.
        # It is always useful to check what is the best way of doing
        # a query, if it is non-trivial. Some pitfalls include the N+1
        # query problem. It is because different ORM commands evaluate
        # into different SQL queries that can produce the same result
        # with different efficiencies.

        # The ORM provides an abstraction over the Relational Database, SQL
        # (The R in ORM), allowing you to access it as Python objects
        # (The O in ORM), by creating a mapping between them. (the M)

        serializer = QuestionSerializer(questions_have_tag_diff_eqns, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
              
    def get(self, request, *args, **kwargs):
        return self.get5(request, *args, **kwargs)


    # Now, creating objects is similarly straightforward.

    def post1(self, request, *args, **kwargs):
        # Now let us implement a post method.

        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        return self.post1(request, *args, **kwargs)


class QuestionsDetail(GenericAPIView):

    def get(self, request, *args, **kwargs):
        try:
            question = Question.objects.get(pk=kwargs['pk'])
        except:
            return Response(f"Question does not exist.",
                            status=status.HTTP_404_NOT_FOUND)
        
        serializer = QuestionSerializer(question)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        try:
            question = Question.objects.get(pk=kwargs['pk'])
        except:
            return Response(f"Question does not exist.",
                            status=status.HTTP_404_NOT_FOUND)
    
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        # Now we try to delete
        # Notice the possibility of error 
        # due to violation of foreign key integrity
        # constraint.

        try:
            question = Question.objects.get(pk=kwargs['pk'])
        except:
            return Response(f"Question does not exist.",
                            status=status.HTTP_404_NOT_FOUND)

        try:
            question.delete()
            return Response(f"Question deleted.", status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(f"Unable to delete due to error {e}.", 
                            status=status.HTTP_403_FORBIDDEN)

    

# if request.method == 'GET':
    #     serializer = SnippetSerializer(snippet)
    #     return JsonResponse(serializer.data)

    # elif request.method == 'PUT':
    #     data = JSONParser().parse(request)
    #     serializer = SnippetSerializer(snippet, data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data)
    #     return JsonResponse(serializer.errors, status=400)

    # elif request.method == 'DELETE':
    #     snippet.delete()
    #     return HttpResponse(status=204)


# class QuestionsDetail(GenericAPIView):

#     @staticmethod
#     def get_question(request, callback, *args, **kwargs):
#         pk = kwargs.get('pk', -1)
#         if pk == -1: #Should not happen!
#             return Response(
#                 "Question ID not found in request header.", 
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

#         try:
#             question = Question.objects.get(pk=pk)
#         except:
#             return Response(f"Question with ID {pk} does not exist.",
#                             status=status.HTTP_404_NOT_FOUND) # classic
#         return callback(question)

#     def get(self, request, *args, **kwargs):
#         def callback(question):
#             print(question)
#             return Response(f"ok", status=status.HTTP_200_OK)

#         return self.get_question(request, callback, *args, **kwargs)
    
        

        

    

class GetQuestion(GenericAPIView):
    def get(self, request, *args, **kwargs):
        print('This is the Request', request)
        print('This is the Request data', request.data)
        print('This is the Request query params', request.query_params)
        print('These are the args', args)
        print('These are the kwargs', kwargs)
        print('Let us send a response!')
        return Response("hello", status=status.HTTP_200_OK)
