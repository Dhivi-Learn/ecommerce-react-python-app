from app.repositories.category_repository import CategoryRepository
from app.schemas.category import CategoryResponse, CategoryCreate
from typing import List


class CategoryService:
    def __init__(self, repo: CategoryRepository):
        self.repo = repo

    async def get_all_categories(self) -> List[CategoryResponse]:
        return await self.repo.get_all_categories()

    async def create_category(self, category: CategoryCreate) -> CategoryResponse:
        return await self.repo.create_category(category)

    async def update_category(
        self, id: int, category: CategoryCreate
    ) -> CategoryResponse:
        return await self.repo.update_category(id, category)

    async def delete_category(self, id: int) -> str:
        return await self.repo.delete_category(id)
