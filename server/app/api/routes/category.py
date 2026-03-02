from fastapi import APIRouter, Depends
from app.services.category_service import CategoryService
from app.schemas.category import CategoryCreate
from app.api.dependencies import get_category_service


router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("/")
async def get_categories(service: CategoryService = Depends(get_category_service)):
    return await service.get_all_categories()


@router.post("/create")
async def create_category(
    category: CategoryCreate, service: CategoryService = Depends(get_category_service)
):
    return await service.create_category(category)


@router.put("/update/{id}")
async def update_category(
    id: int,
    category: CategoryCreate,
    service: CategoryService = Depends(get_category_service),
):
    return await service.update_category(id, category)


@router.delete("/delete/{id}")
async def delete_category(
    id: int, service: CategoryService = Depends(get_category_service)
):
    return await service.delete_category(id)
