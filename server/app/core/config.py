from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database configuration
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "dhinesh"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "fastapi-shop"
    PORT: int = 8000

    DATABASE_URL: str = (
        f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "ecommerce-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 1  # 1 day

    class Config:
        env_file = ".env"


settings = Settings()
