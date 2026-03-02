from sqlalchemy.ext.asyncio import AsyncSession
from app.models.category import Category
from app.schemas.category import CategoryResponse, CategoryCreate
from sqlalchemy import select
from typing import List


class CategoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    # get
    async def get_all_categories(self) -> List[CategoryResponse]:
        result = await self.db.execute(select(Category))
        categories = result.scalars().all()
        categories = sorted(categories, key=lambda x: x.id)
        categories = [
            CategoryResponse.model_validate(category) for category in categories
        ]
        return categories

    async def get_category_by_id(self, id: int) -> Category | None:
        result = await self.db.execute(select(Category).where(Category.id == id))
        return result.scalars().first()

    async def get_category_by_name(self, name: str) -> Category | None:
        result = await self.db.execute(select(Category).where(Category.name == name))
        return result.scalars().first()

    # create
    async def create_category(self, category: CategoryCreate) -> CategoryResponse:
        db_category = Category(
            name=category.name, description=category.description, image=category.image
        )
        existing_category = await self.get_category_by_name(category.name)
        if existing_category is not None:
            raise ValueError("Category already exists")

        self.db.add(db_category)
        await self.db.commit()
        await self.db.refresh(db_category)
        return CategoryResponse.model_validate(db_category)

    # update
    async def update_category(
        self, id: int, category: CategoryCreate
    ) -> CategoryResponse:
        db_category = await self.get_category_by_id(id)
        if not db_category:
            raise ValueError("Category not found")
        db_category.name = category.name
        db_category.description = category.description
        db_category.image = category.image
        await self.db.commit()
        await self.db.refresh(db_category)
        return CategoryResponse.model_validate(db_category)

    # delete
    async def delete_category(self, id: int) -> str:
        db_category = await self.get_category_by_id(id)
        if not db_category:
            raise ValueError("Category not found")
        self.db.delete(db_category)
        await self.db.commit()
        return "Category deleted"
