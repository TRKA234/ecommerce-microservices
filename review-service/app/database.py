from pymongo import MongoClient
import os
import time

MONGO_HOST = os.getenv("REVIEW_DB_HOST", "review-db")
MONGO_PORT = int(os.getenv("REVIEW_DB_PORT", 27017))
MONGO_DB = os.getenv("REVIEW_DB_NAME", "reviewdb")

def get_client_with_retry(retries=5, delay=3):
    last_exc = None
    for _ in range(retries):
        try:
            client = MongoClient(f"mongodb://{MONGO_HOST}:{MONGO_PORT}/", serverSelectionTimeoutMS=3000)
            client.admin.command("ping")  # ping untuk cek connection
            return client
        except Exception as e:
            last_exc = e
            time.sleep(delay)
    raise RuntimeError("Could not connect to MongoDB") from last_exc

client = get_client_with_retry()
reviews_collection = client[MONGO_DB]["reviews"]
