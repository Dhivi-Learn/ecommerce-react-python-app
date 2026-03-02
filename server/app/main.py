from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, user, category
from app.core.config import settings

app = FastAPI(
    title="FastAPI Ecommerce",
    description="Ecommerce API",
    version="1.0.0",
)

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the authentication router
app.include_router(auth.router)
# Include the user router
app.include_router(user.router)
# Include the category router
app.include_router(category.router)


@app.get("/")
async def read_root():
    return {"message": "Ecommerce API is running..."}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="[IP_ADDRESS]", port=settings.PORT, reload=True)
