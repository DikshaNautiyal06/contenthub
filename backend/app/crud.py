from typing import List
from sqlmodel import Session, select
from . import models, schemas

def get_user_by_username(session: Session, username: str):
    return session.exec(select(models.User).where(models.User.username == username)).first()

def create_user(session: Session, user: schemas.UserCreate, hashed_pw: str):
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pw)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_post(session: Session, post_id: int):
    return session.get(models.Post, post_id)

def get_posts(session: Session, skip=0, limit=100, category=None, search=None) -> List[models.Post]:
    q = select(models.Post)
    if category:
        q = q.where(models.Post.category == category)
    if search:
        q = q.where(
            (models.Post.title.ilike(f"%{search}%")) |
            (models.Post.content.ilike(f"%{search}%"))
        )
    return session.exec(q.offset(skip).limit(limit).order_by(models.Post.created_at.desc())).all()

def get_posts_by_author(session: Session, author_id: int) -> List[models.Post]:
    q = select(models.Post).where(models.Post.author_id == author_id)
    return session.exec(q.order_by(models.Post.created_at.desc())).all()

def create_post(session: Session, post: schemas.PostCreate, user_id: int):
    db_post = models.Post(**post.dict(), author_id=user_id)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post

def update_post(session: Session, db_post: models.Post, post_up: schemas.PostUpdate):
    for k, v in post_up.dict(exclude_unset=True).items():
        setattr(db_post, k, v)
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post

def delete_post(session: Session, db_post: models.Post):
    session.delete(db_post)
    session.commit()