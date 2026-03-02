from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.sql import func
from datetime import datetime
from typing import List
from app.models.wishlist import Wishlist


max_string_length = 255
max_password_length = 255


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    email: Mapped[str] = mapped_column(
        String(max_string_length), unique=True, index=True, nullable=False
    )
    password: Mapped[str] = mapped_column(String(max_password_length), nullable=False)
    first_name: Mapped[str] = mapped_column(String(max_string_length), nullable=False)
    last_name: Mapped[str] = mapped_column(String(max_string_length), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(max_string_length), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=func.now(), onupdate=func.now()
    )
    wishlists: Mapped[List["Wishlist"]] = relationship(
        "Wishlist", back_populates="user"
    )
