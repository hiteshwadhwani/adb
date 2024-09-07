from pymongo import MongoClient

# mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
client = MongoClient("localhost", 27017, maxPoolSize=50)
