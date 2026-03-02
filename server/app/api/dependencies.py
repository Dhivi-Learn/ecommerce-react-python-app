from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.repositories.category_repository import CategoryRepository
from app.repositories.user_repository import UserRepository
from app.services.category_service import CategoryService
from app.services.user_service import UserService


def get_user_service(db: AsyncSession = Depends(get_db)) -> UserService:
    user_repository = UserRepository(db)
    return UserService(user_repository)


def get_category_service(db: AsyncSession = Depends(get_db)) -> CategoryService:
    category_repository = CategoryRepository(db)
    return CategoryService(category_repository)
