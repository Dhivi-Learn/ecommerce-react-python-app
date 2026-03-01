# app/_scripts.py
import uvicorn


def dev():
    """Run the app in development mode with hot reload."""
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )


def start():
    """Run the app in production mode."""
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=False,
    )
