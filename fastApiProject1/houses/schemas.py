from datetime import datetime

from pydantic import BaseModel


class HouseRead(BaseModel):
    name: str
    description: str
    address: str
    category_id: int
    rent_price: str


class HouseCreate(BaseModel):
    name: str
    description: str
    address: str
    category_id: int
    rent_price: str


class ImageCreate(BaseModel):
    house_id: int
    url: str
