from app.core.database import AsyncSessionLocal
from sqlalchemy.ext.asyncio import AsyncSession


# Dependency to get database session
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
