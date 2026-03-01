from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from app.core.config import settings

# create an async engine
engine = create_async_engine(
    settings.DATABASE_URL, echo=False, pool_size=10, max_overflow=20
)
# create an async session
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


# Dependency
async def get_db():
    db = AsyncSessionLocal()  # create a database connection
    try:
        yield db  # yield the database connection
    finally:
        db.close()  # close the database connection
