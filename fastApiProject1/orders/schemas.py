from pydantic import BaseModel
from datetime import datetime


class RentalCreate(BaseModel):
    house_id: int
    start_date: datetime
    end_date: datetime

