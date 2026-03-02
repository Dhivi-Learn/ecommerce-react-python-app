from pydantic import BaseModel
from app.schemas.user import UserResponse as UserSchema
from app.schemas.product import ProductResponse as ProductSchema




class Wishlist(BaseModel):
    user_id:int
    product_id:int
    user: UserSchema
    product: ProductSchema

class WishListCreate(BaseModel):
    user_id:int
    product_id:int


class WishlistResponse(Wishlist):
    id:int
    user_id:int
    product_id:int
    created_at:str
    updated_at:str


    class Config:
        from_attributes = True
        orm_mode = True