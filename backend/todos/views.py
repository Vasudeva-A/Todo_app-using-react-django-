from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import *
from .serializers import *

@api_view(['GET','POST'])
def getTodos(request):
    todos = Todo.objects.all()
    serializers = TodoSerializer(todos,many=True)
    return Response(serializers.data)
@api_view(['GET','POST'])
def addTodo(request):
    serializers = TodoSerializer(data=request.data)
    if serializers.is_valid():
        serializers.save()
    return Response(serializers.data)
@api_view(['PUT'])
def updateTodo(request,pk):
    todo = Todo.objects.get(id=pk)
    todo.completed = not todo.completed
    todo.save()
    serializers = TodoSerializer(todo,many=False)
    return Response(serializers.data)


    
@api_view(['DELETE'])
def deleteTodo(request,pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response({'status':'deleted'})