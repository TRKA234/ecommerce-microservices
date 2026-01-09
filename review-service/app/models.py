from pydantic import BaseModel
from typing import Optional

class Review(BaseModel):
    user_id: int
    product_id: int
    rating: int
    comment: Optional[str] = None
