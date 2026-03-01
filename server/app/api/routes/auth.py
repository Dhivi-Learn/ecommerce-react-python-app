from fastapi import APIRouter, Depends, HTTPException
from app.schemas.user import UserResponse
from app.repositories.user_repository import UserRepository
from app.schemas.user import UserLogin, UserCreate
from app.core.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.user_service import UserService
from app.core.security import create_access_token

# Create a router
router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse)
# Register a new user
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    try:
        auth_user = await service.register_user(user)
        return auth_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(user: UserLogin, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    service = UserService(repo)
    auth_user = await service.authenticate_user(user.email, user.password)
    if not auth_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(auth_user.id)})
    return {"access_token": token, "token_type": "bearer"}
