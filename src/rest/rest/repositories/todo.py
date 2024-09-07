
from pymongo import MongoClient
from logging import Logger
from rest.utils.logger import logger
from rest.utils.db import client

class TodoReposiroty:
    def __init__(self, client: MongoClient, logger: Logger) -> None:
        self.collection = client["test_db"].get_collection("todos")
        self.logger = logger
    
    def getAllTodo(self):
        try:
            todos = [record["todo"] for record in self.collection.find({})]
            self.logger.info("Todos fetched successfully")
            return todos
        except Exception as e:
            self.logger.error(e)
            return []
    
    def updateTodo(self, todo: str):
        try:
            self.collection.insert_one({"todo": todo})
            self.logger.info(f"Todo {todo} added successfully")
            return True
        except Exception as e:
            self.logger.error(e)
            return False
        
todoReposirotyInstance = TodoReposiroty(client, logger)