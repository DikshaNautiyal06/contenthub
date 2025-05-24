from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from . import database, schemas, auth, crud, models

app = FastAPI()
database.init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/auth/register", response_model=schemas.UserRead)
def register(user: schemas.UserCreate, session: Session = Depends(database.get_session)):
    if crud.get_user_by_username(session, user.username):
        raise HTTPException(400, "Username already taken")
    hashed = auth.get_password_hash(user.password)
    return crud.create_user(session, user, hashed)

@app.post("/api/auth/token", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(database.get_session)):
    user = auth.authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(401, "Invalid credentials")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=schemas.UserRead)
def me(user=Depends(auth.get_current_user)):
    return user

@app.get("/api/posts", response_model=list[schemas.PostRead])
def read_posts(category: str = None, search: str = None, skip: int = 0, limit: int = 100, session: Session = Depends(database.get_session)):
    return crud.get_posts(session, skip, limit, category, search)

@app.get("/api/posts/{post_id}", response_model=schemas.PostRead)
def read_post(post_id: int, session: Session = Depends(database.get_session)):
    db = crud.get_post(session, post_id)
    if not db:
        raise HTTPException(404, "Not found")
    return db

@app.post("/api/posts", response_model=schemas.PostRead)
def create_post(post: schemas.PostCreate, user=Depends(auth.get_current_user), session: Session = Depends(database.get_session)):
    return crud.create_post(session, post, user.id)

@app.put("/api/posts/{post_id}", response_model=schemas.PostRead)
def update_post(post_id: int, up: schemas.PostUpdate, user=Depends(auth.get_current_user), session: Session = Depends(database.get_session)):
    db_post = crud.get_post(session, post_id)
    if not db_post or db_post.author_id != user.id:
        raise HTTPException(403, "Not authorized")
    return crud.update_post(session, db_post, up)



@app.delete("/api/posts/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, user=Depends(auth.get_current_user), session: Session = Depends(database.get_session)):
    db_post = crud.get_post(session, post_id)
    if not db_post or db_post.author_id != user.id:
        raise HTTPException(403, "Not authorized")
    crud.delete_post(session, db_post)
    return {}

@app.get("/api/myposts", response_model=list[schemas.PostRead])
def get_my_posts(
    user=Depends(auth.get_current_user),
    session: Session = Depends(database.get_session)
):
    return crud.get_posts_by_author(session, user.id)

