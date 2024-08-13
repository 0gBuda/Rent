from sqlalchemy import Table, Column, Integer, TIMESTAMP, ForeignKey, Date
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

from auth.models import User
from houses.models import Houses

Base = declarative_base()


class Rental(Base):
    __tablename__ = "rental"

    id = Column(Integer, primary_key=True, autoincrement=True)
    house_id = Column(Integer, ForeignKey(Houses.id), nullable=False)
    user_id = Column(Integer, ForeignKey(User.id), nullable=False)
    start_date = Column(TIMESTAMP, nullable=False)
    end_date = Column(TIMESTAMP, nullable=False)

    # house = relationship("Houses", back_populates="rentals")
    # user = relationship("User", back_populates="rentals")

    def __str__(self):
        return self.name
