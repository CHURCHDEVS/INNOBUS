import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, MapPin, ArrowRight } from 'lucide-react';

function RoutePlanner() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex-1 relative">
                <div className="absolute inset-0">
                    <MapContainer center={[4.6097, -74.0817]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <Marker position={[4.6097, -74.0817]}>
                            <Popup>
                                Bogotá, Colombia
                            </Popup>
                        </Marker>
                    </MapContainer >
                </div >
            </div >
        </div >
    );
}

export default RoutePlanner;
