from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate, UserResponse
from app.models.user import User
from app.core.security import hashed_password, verify_password


class UserService:
    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    async def register_user(self, user: UserCreate) -> User:
        existing = await self.user_repository.get_user_by_email(user.email)
        if existing:
            raise ValueError("Email already registered")

        user.password = hashed_password(user.password)
        return await self.user_repository.create_user(user)

    async def authenticate_user(self, email: str, password: str) -> User | None:
        user = await self.user_repository.get_user_by_email(email)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user

    async def get_all_users(self) -> list[UserResponse]:
        return await self.user_repository.get_all_users()

    async def update_user(self, id: int, user: UserCreate) -> UserResponse:
        return await self.user_repository.update_user(id, user)

    async def create_user(self, user: UserCreate) -> UserResponse:
        return await self.user_repository.create_user(user)

    async def delete_user(self, id: int) -> UserResponse:
        return await self.user_repository.delete_user(id)
