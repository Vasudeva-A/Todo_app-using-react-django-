from django.urls import path
from .views import *

urlpatterns = [
    path('list/',getTodos,name='get_todos'),
    path('add/',addTodo,name='add_todo'),
    path('update/<str:pk>/',updateTodo,name='update_todo'),
    path('delete/<str:pk>/',deleteTodo,name='delete_todo'),     
]