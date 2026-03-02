from pydantic import BaseModel, Field
from datetime import datetime


class Product(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1, max_length=255)
    image: str = Field(..., min_length=1)
    price: float = Field(..., gt=0)
    rating: float = Field(..., gt=0)
    is_active: bool = Field(..., default=True)
    category_id: int = Field(..., gt=0)


class ProductCreate(Product):
    pass


class ProductResponse(Product):
    id: int
    created_at: datetime
    updated_at: datetime
