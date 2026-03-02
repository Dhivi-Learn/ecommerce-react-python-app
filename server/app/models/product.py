from app.core.database import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Float, Integer, Boolean, DateTime
from sqlalchemy.sql import func
from datetime import datetime
from typing import List


max_string_length = 255
max_password_length = 255


class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, index=True)
    name: Mapped[str] = mapped_column(
        String(max_string_length), nullable=False, index=True
    )
    description: Mapped[str] = mapped_column(
        String(max_string_length), nullable=False, index=True
    )
    image: Mapped[str] = mapped_column(
        String(max_string_length), nullable=False, index=True
    )
    price: Mapped[float] = mapped_column(Float, nullable=False, index=True)
    rating: Mapped[float] = mapped_column(Float, nullable=False, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    category_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=func.now(), onupdate=func.now()
    )
    wishlists: Mapped[List["Wishlist"]] = relationship(
        "Wishlist", back_populates="product"
    )
