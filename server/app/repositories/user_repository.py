from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hashed_password


class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_user_by_email(self, email: str) -> User | None:
        result = await self.db.execute(select(User).filter(User.email == email))
        return result.scalars().first()

    async def get_user_by_id(self, id: int) -> User | None:
        return await self.db.get(User, id)

    async def get_all_users(self) -> list[UserResponse]:
        result = await self.db.execute(select(User))
        users = result.scalars().all()
        users.sort(key=lambda x: x.id)
        return [UserResponse.model_validate(user) for user in users]

    async def create_user(self, user: UserCreate) -> User:
        db_user = User(
            email=user.email,
            password=hashed_password(user.password),
            first_name=user.first_name,
            last_name=user.last_name,
            phone_number=user.phone_number,
        )
        self.db.add(db_user)  # Add the user to the session
        await self.db.commit()  # Commit the transaction
        await self.db.refresh(db_user)  # Refresh the user object
        return UserResponse.model_validate(db_user)

    async def update_user(self, id: int, user: UserCreate) -> User:
        db_user = await self.get_user_by_id(id)
        if not db_user:
            return None
        db_user.email = user.email
        db_user.password = hashed_password(user.password)
        db_user.first_name = user.first_name
        db_user.last_name = user.last_name
        db_user.phone_number = user.phone_number
        await self.db.commit()  # Commit the transaction
        await self.db.refresh(db_user)  # Refresh the user object
        return UserResponse.model_validate(db_user)

    async def delete_user(self, id: int) -> User:
        db_user = await self.get_user_by_id(id)
        if not db_user:
            return None
        await self.db.delete(db_user)
        await self.db.commit()  # Commit the transaction
        return UserResponse.model_validate(db_user)
