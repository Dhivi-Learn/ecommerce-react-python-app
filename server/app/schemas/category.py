from pydantic import BaseModel
from pydantic import Field


class Category(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1, max_length=255)
    image: str


class CategoryCreate(Category):
    pass


class CategoryResponse(Category):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True
