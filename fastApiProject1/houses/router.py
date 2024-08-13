from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from houses.models import Houses, OccupiedDates, Image
from houses.schemas import HouseCreate, ImageCreate

router = APIRouter(
    prefix="/houses",
    tags=["Houses"],
)


# Эндпоинт для просмотра каталога доступного для аренды жилья
@router.get("/")
async def get_houses(session: AsyncSession = Depends(get_async_session)):
    query = select(Houses)
    result = await session.execute(query)
    return result.scalars().all()


@router.get("/{house_id}/")
async def get_houses(house_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(Houses).filter(Houses.id == house_id)
    result = await session.execute(query)
    return result.scalars().all()


@router.post("/")
async def create_house(new_house: HouseCreate, session: AsyncSession = Depends(get_async_session)):
    try:
        stmt = insert(Houses).values(**new_house.dict())
        await session.execute(stmt)
        await session.commit()
        return {"message": "House created"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/occupied_dates/{house_id}/")
async def get_occupied_dates(house_id: int, session: AsyncSession = Depends(get_async_session)):
    query = select(OccupiedDates).filter(OccupiedDates.house_id == house_id)
    result = await session.execute(query)
    return result.scalars().all()


@router.post("/image")
async def create_image(new_image: ImageCreate, session: AsyncSession = Depends(get_async_session)):
    try:
        stmt = insert(Houses).values(**new_image.dict())
        await session.execute(stmt)
        await session.commit()
        return {"message": "Image inserted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/image/{house_id}/")
async def get_image(house_id: int,session: AsyncSession = Depends(get_async_session)):
    query = select(Image).filter(Image.house_id == house_id)
    result = await session.execute(query)
    return result.scalars().all()