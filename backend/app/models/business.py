# 업종/상권/폐업위험지수 도메인 모델 정의
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class District(Base):
    """상권"""

    __tablename__ = "districts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)

    businesses: Mapped[list["Business"]] = relationship(back_populates="district")


class Business(Base):
    """업종"""

    __tablename__ = "businesses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    category: Mapped[str] = mapped_column(String(50), nullable=False)
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.id"))

    district: Mapped["District"] = relationship(back_populates="businesses")
    risk_scores: Mapped[list["RiskScore"]] = relationship(back_populates="business")


class RiskScore(Base):
    """폐업위험지수"""

    __tablename__ = "risk_scores"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    business_id: Mapped[int] = mapped_column(ForeignKey("businesses.id"))
    score: Mapped[float] = mapped_column(Float, nullable=False)

    business: Mapped["Business"] = relationship(back_populates="risk_scores")
