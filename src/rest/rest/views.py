from typing import Any
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest.repositories.todo import todoReposirotyInstance
from rest.utils.logger import logger

class TodoListView(APIView):
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.repository = todoReposirotyInstance
        self.logger = logger

    def get(self, request):
        try:            
            todos = self.repository.getAllTodo()
            return Response({"todos": todos}, status=status.HTTP_200_OK)
        except Exception as e:
            self.logger.error(e)
            return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER)
        
    def post(self, request):
        try:
            body = request.data
            todo = body.get('todo')
            if not todo:
                return Response({"error": "Todo is required"}, status=status.HTTP_400_BAD_REQUEST)
            self.repository.updateTodo(todo=todo)
            return Response(True, status=status.HTTP_200_OK)
        except Exception as e:
            self.logger.error(e)
            return Response(False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

