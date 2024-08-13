from datetime import datetime, timedelta

from sqlalchemy import Column, Integer, String, TIMESTAMP, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from auth.models import User

Base = declarative_base()


class Categories(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    houses = relationship("Houses", back_populates="category")

    def __str__(self):
        return self.name


class Houses(Base):
    __tablename__ = "house"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    address = Column(String, nullable=False)
    category_id = Column(Integer, ForeignKey(Categories.id))
    rent_price = Column(String, nullable=False)  # Цена аренды
    images = relationship("Image", backref="house", lazy="dynamic", cascade="all, delete-orphan")
    category = relationship("Categories", back_populates="houses")
    rentals = relationship("OccupiedDates", back_populates="house")

    # house = relationship("Houses", back_populates="occupied_dates")

    def __str__(self):
        return self.name


class OccupiedDates(Base):
    __tablename__ = 'occupied_dates'

    id = Column(Integer, primary_key=True, autoincrement=True)
    house_id = Column(Integer, ForeignKey(Houses.id), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)

    house = relationship("Houses", back_populates="rentals")
    # user = relationship("User", back_populates="rentals")


class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True, autoincrement=True)
    url = Column(String, nullable=False)
    house_id = Column(Integer, ForeignKey(Houses.id))
