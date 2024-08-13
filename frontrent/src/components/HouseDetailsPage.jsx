import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const HouseDetail = () => {
    const {house_id} = useParams();
    const [houses, setHouse] = useState(null);
    const [occupiedDates, setOccupiedDates] = useState([]);
    const [images, setImages] = useState([]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

// Обработчики событий для изменения состояний дат аренды
    const handleCheckInDateChange = (event) => {
        setCheckInDate(event.target.value);
    };

    const handleCheckOutDateChange = (event) => {
        setCheckOutDate(event.target.value);
    };

// Обработчик события отправки формы аренды
    const handleRentSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/rent/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    house_id: house_id,
                    start_date: checkInDate,
                    end_date: checkOutDate,
                }),
            });

            if (response.ok) {
                console.log('Rental created successfully');
            } else {
                console.error('Failed to create rental');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    useEffect(() => {
        const fetchHouse = async () => {
            const response = await fetch(`/houses/${house_id}/`);
            const data = await response.json();
            setHouse(data);
        };

        const fetchOccupiedDates = async () => {
            const response = await fetch(`/houses/occupied_dates/${house_id}/`);
            const data = await response.json();
            setOccupiedDates(data);
        };

        const fetchImages = async () => {
            const response = await fetch(`/houses/image/${house_id}/`);
            if (response.ok) {
                const data = await response.json();
                setImages(data.map(image => image.url));
            }
        };

        fetchHouse();
        fetchOccupiedDates();
        fetchImages();
    }, [house_id]);

    if (!houses) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Левая часть: слайдер с изображениями дома */}
                <div className="col-md-6">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {Array.isArray(images) && images.map((image, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={image} className="d-block w-100 h-100" alt={`House ${index + 1}`}/>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                {/* Правая часть: описание дома */}
                <div className="col-md-6">
                    {houses.map((house) => (
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">{house.name}</h2>
                                <p className="card-text">{house.description}</p>
                                <p className="card-text"><strong>Адресс:</strong> {house.address}</p>
                                <p className="card-text"><strong>Цена за день аренды:</strong> {house.rent_price}т.р.
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Занятые даты */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Занятые даты:</h5>
                            <ul className="list-unstyled">
                                {Array.isArray(occupiedDates) && occupiedDates.map((date, index) => (
                                    <li key={index}>{date.start_date} - {date.end_date}</li>
                                ))}
                                {!Array.isArray(occupiedDates) && (
                                    <li>No booked dates</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Форма для аренды */}
                    <div className="card mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Арендуйте этот дом:</h5>
                            <form onSubmit={handleRentSubmit}>
                                <div className="form-group mb-3">
                                    <label>Дата заезда</label>
                                    <input type="date" className="form-control" value={checkInDate}
                                           onChange={handleCheckInDateChange} required/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Дата выезда</label>
                                    <input type="date" className="form-control" value={checkOutDate}
                                           onChange={handleCheckOutDateChange} required/>
                                </div>
                                <button type="submit" className="btn btn-primary">Арендовать</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HouseDetail;
