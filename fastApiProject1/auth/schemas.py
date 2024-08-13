from fastapi_users import schemas
from orders.schemas import RentalCreate as orders_schemas


class UserRead(schemas.BaseUser[int]):
    id: int
    email: str
    username: str
    first_name: str
    last_name: str
    phone_number: str

    class Config:
        orm_mode = True


class UserCreate(schemas.BaseUserCreate):
    email: str
    username: str
    first_name: str
    last_name: str
    phone_number: str
    password: str

# class UserUpdate(schemas.BaseUserUpdate):
#     pass
