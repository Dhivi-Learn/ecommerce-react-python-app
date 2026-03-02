from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

max_password_length = 255
min_password_length = 8


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(
        min_length=min_password_length, max_length=max_password_length
    )


class User(UserLogin):
    first_name: str
    last_name: str
    phone_number: str

class UserCreate(User):
    pass



class UserResponse(BaseModel):
    id: int
    email: EmailStr
    first_name: str
    last_name: str
    phone_number: str
    is_active: bool
    is_admin: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        # This line is used to convert the ORM model to a Pydantic model.
        # It is used to convert the database model to a Pydantic model.
        # It is used to convert the Pydantic model to a database model.
        # It is used to convert the Pydantic model to a JSON model.
        # It is used to convert the JSON model to a Pydantic model.
        # It is used to convert the JSON model to a database model.
        # It is used to convert the database model to a JSON model.
