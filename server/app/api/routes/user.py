from fastapi import APIRouter, Depends
from app.services.user_service import UserService
from app.schemas.user import UserCreate
from app.api.dependencies import get_user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/")
async def get_users(service: UserService = Depends(get_user_service)):
    return await service.get_all_users()


@router.post("/create")
async def create_user(
    user: UserCreate, service: UserService = Depends(get_user_service)
):
    return await service.create_user(user)


@router.put("/update/{id}")
async def update_user(
    id: int,
    user: UserCreate,
    service: UserService = Depends(get_user_service),
):
    return await service.update_user(id, user)


@router.delete("/delete{id}")
async def delete_user(id: int, service: UserService = Depends(get_user_service)):
    return await service.delete_user(id)
