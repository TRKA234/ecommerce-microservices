from fastapi import FastAPI, HTTPException
from app.database import reviews_collection
from app.models import Review
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS optional
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "review-service running"}

@app.post("/reviews")
def add_review(review: Review):
    result = reviews_collection.insert_one(review.dict())
    return {"message": "review added", "id": str(result.inserted_id)}

@app.get("/reviews/{product_id}")
def get_reviews(product_id: int):
    reviews = list(reviews_collection.find({"product_id": product_id}))
    for r in reviews:
        r["_id"] = str(r["_id"])
    return reviews
