1. Install Python using uv
   uv add python
2. Install required dependencies
   uv add fastapi uvicorn sqlalchemy[asyncio] asyncpg psycopg2-binary alembic pydantic pydantic-settings python-dotenv bcrypt passlib python-jose[cryptography] python-multipart
   httpx redis pytest pytest-asyncio
3. Create virtual environment
   uv venv
4. Activate virtual environment
   uv shell or
   activate venv--> .venv\Scripts\activate
   deactivate venv--> deactivate
5. Run the server
   uv run uvicorn app.main:app --reload
   or uv run python -m uvicorn app.main:app --reload
6. Create a new database
   CREATE DATABASE fastapi_shop;

7. Create Engine and Session using sqlalchemy
   engine = create_async_engine(url)
   AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
   Base = DeclarativeBase()
   async def get_db():
   db = AsyncSessionLocal()
   try:
   yield db
   finally:
   await db.close()

8. Create a new migration
   uv run alembic revision --autogenerate -m "migration message or title"
9. Apply the migration
   uv run alembic upgrade head
10. Downgrade the migration
    uv run alembic downgrade -1
11. Upgrade the migration
    uv run alembic upgrade +1
12. Create Routes (controller)
    APIRouter(prefix="/users", tags=["Users"])
13. Create Repository
    - import model
    - create repository methods
14. Create Models
    - import Base
    - create model
15. Create Schemas
    - import BaseModel
    - create schema
16. Create Services
    - import repository
    - import schema
    - create service methods
