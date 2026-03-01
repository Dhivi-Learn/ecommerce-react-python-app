from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService
from app.schemas.user import UserCreate

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
async def get_users(db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    return await service.get_all_users()


@router.post("/create")
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    return await service.create_user(user)


@router.put("/update/{id}")
async def update_user(
    id: int,
    user: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    repo = UserRepository(db)
    service = UserService(repo)
    return await service.update_user(id, user)


@router.delete("/delete{id}")
async def delete_user(id: int, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    return await service.delete_user(id)
