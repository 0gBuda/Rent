from fastapi import APIRouter, Depends, HTTPException
from fastapi_users import FastAPIUsers
from datetime import datetime, timedelta
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession
from auth.base_config import auth_backend
from auth.manager import get_user_manager
from database import get_async_session
from houses.models import OccupiedDates
from auth.models import User
from orders.models import Rental
from orders.schemas import RentalCreate

router = APIRouter(
    prefix="/rent",
    tags=["Rent"],
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user()



@router.post("/")
async def create_rental(rental_data: RentalCreate, session: AsyncSession = Depends(get_async_session),
                        user: User = Depends(current_user)):
    # Проверка, чтобы дата старта аренды была не раньше завтрашнего дня
    tomorrow = datetime.utcnow() + timedelta(days=1)
    if rental_data.start_date.date() < tomorrow.date():
        raise HTTPException(status_code=400, detail="Start date must be at least tomorrow")

    # Проверка, чтобы продолжительность аренды была не более двух месяцев
    max_rental_duration = timedelta(days=60)
    rental_duration = rental_data.end_date - rental_data.start_date
    if rental_duration > max_rental_duration:
        raise HTTPException(status_code=400, detail="Rental duration cannot exceed two months")

    if rental_data.end_date < rental_data.start_date:
        raise HTTPException(status_code=400, detail="End date must be greater than start date")

    # Получаем список занятых дат для данного жилья
    occupied_dates = await session.execute(select(OccupiedDates)
                                           .filter(OccupiedDates.house_id == rental_data.house_id)
                                           .filter(OccupiedDates.start_date <= rental_data.end_date)
                                           .filter(OccupiedDates.end_date >= rental_data.start_date))
    occupied_dates = occupied_dates.scalars().all()

    for occupied_date in occupied_dates:
        # Преобразование occupied_date.start_date в тип datetime.date
        occupied_start_date = occupied_date.start_date

        if (occupied_start_date <= rental_data.end_date.date() and
                occupied_date.end_date >= rental_data.start_date.date()):
            raise HTTPException(status_code=400, detail="Dates are already occupied")

    # Создаем запись об аренде
    rental_data_dict = rental_data.dict()
    rental_data_dict["user_id"] = user.id
    rental = insert(Rental).values(**rental_data_dict)
    await session.execute(rental)
    await session.commit()

    # Добавляем выбранные даты для аренды в модель occupied_dates
    occupied_dates_data = OccupiedDates(
        house_id=rental_data.house_id,
        user_id=user.id,
        start_date=rental_data.start_date,
        end_date=rental_data.end_date
    )
    session.add(occupied_dates_data)
    await session.commit()

    return {"message": "Rent created"}


@router.get("/{user_id}/")
async def get_occupied_dates(user_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(Rental).filter(Rental.user_id == user_id)
    result = await session.execute(query)
    return result.scalars().all()
