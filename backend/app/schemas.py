from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class PostCreate(BaseModel):
    title: str
    content: str
    category: str

class PostRead(BaseModel):
    id: int
    title: str
    content: str
    category: str
    author_id: int
    created_at: datetime
    author: UserRead
    class Config:
        orm_mode = True

class PostUpdate(BaseModel):
    title: Optional[str]
    content: Optional[str]
    category: Optional[str]
