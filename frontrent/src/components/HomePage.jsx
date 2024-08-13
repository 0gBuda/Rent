import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const response = await fetch('/houses/');
                if (response.ok) {
                    const data = await response.json();
                    setHouses(data);
                } else {
                    console.error('Failed to fetch houses:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching houses:', error);
            }
        };

        fetchHouses();
    }, []);

    const fetchImageForHouse = async (house_id) => {
        try {
            const response = await fetch(`/houses/image/${house_id}/`);
            if (response.ok) {
                const data = await response.json();
                return data.length > 0 ? data[0].url : null;
            } else {
                console.error(`Failed to fetch image for house ${house_id}:`, response.statusText);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching image for house ${house_id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchImagesForAllHouses = async () => {
            const housesWithImages = await Promise.all(houses.map(async (house) => {
                const imageUrl = await fetchImageForHouse(house.id);
                return { ...house, imageUrl };
            }));
            setHouses(housesWithImages);
        };

        if (houses.length > 0) {
            fetchImagesForAllHouses();
        }
    }, [houses]);

    return (
        <div className="container mt-lg-4">
            <div className="row">
                {houses.map((house) => (
                    <div key={house.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={house.imageUrl ? house.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxzmvvWOi-6WsavjRDUGpXmzhkGRwzh0lkGzCMviwnZA&s"}
                                 className="card-img-top" alt={house.name} style={{ height: "200px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{house.name}</h5>
                                <p className="card-text">{house.description.length > 30 ? `${house.description.substring(0, 40)}...` : house.description}</p>
                                <p className="card-text">Цена: {house.rent_price}р. за день</p>
                                <p className="card-text">Адресс: {house.address}</p>
                                <a href={`/houses/${house.id}`} className="btn btn-primary">Learn More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
