import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";

function formatPostalCode(value = "") {
    const digits = value.replace(/\D/g, "").slice(0, 5);

    return digits.length > 3
        ? `${digits.slice(0, 3)} ${digits.slice(3)}`
        : digits;
}

function RecenterMap({ lat, lng }) {
    const map = useMap();

    useEffect(() => {
        if (lat && lng) {
            map.setView([Number(lat), Number(lng)], 16);
        }
    }, [lat, lng, map]);

    return null;
}

function LocationMarker({
    lat,
    lng,
    setLat,
    setLng,
    setAddress,
    setCity,
    setPostalCode,
}) {
    const [position, setPosition] = useState(
        lat && lng ? [Number(lat), Number(lng)] : null
    );

    useEffect(() => {
        if (lat && lng) {
            setPosition([Number(lat), Number(lng)]);
        }
    }, [lat, lng]);

    useMapEvents({
        async click(e) {
            const { lat, lng } = e.latlng;

            setPosition([lat, lng]);
            setLat(lat);
            setLng(lng);

            try {
                const params = new URLSearchParams({
                    format: "jsonv2",
                    lat: String(lat),
                    lon: String(lng),
                    addressdetails: "1",
                    "accept-language": "el",
                });

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?${params.toString()}`
                );

                if (!res.ok) {
                    throw new Error("Δεν ήταν δυνατή η εύρεση διεύθυνσης.");
                }

                const data = await res.json();
                const location = data.address || {};

                const road = location.road || "";
                const houseNumber = location.house_number || "";

                // Αν υπάρχει αριθμός: "Τσιμισκή 2"
                // Αν δεν υπάρχει: "Τσιμισκή"
                const fullAddress = houseNumber
                    ? `${road} ${houseNumber}`.trim()
                    : road;

                setAddress(fullAddress);

                setCity(
                    location.city ||
                    location.town ||
                    location.village ||
                    location.municipality ||
                    ""
                );

                setPostalCode(
                    location.postcode
                        ? formatPostalCode(location.postcode)
                        : ""
                );
            } catch (err) {
                console.error("Reverse geocoding error:", err);
            }
        },
    });

    return position ? <Marker position={position} /> : null;
}

function MapPicker({
    lat,
    lng,
    setLat,
    setLng,
    setAddress,
    setCity,
    setPostalCode,
}) {
    const defaultCenter =
        lat && lng ? [Number(lat), Number(lng)] : [37.9838, 23.7275];

    return (
        <MapContainer
            center={defaultCenter}
            zoom={13}
            style={{
                height: "400px",
                width: "100%",
                marginBottom: "20px",
                zIndex: "1",
            }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <RecenterMap lat={lat} lng={lng} />

            <LocationMarker
                lat={lat}
                lng={lng}
                setLat={setLat}
                setLng={setLng}
                setAddress={setAddress}
                setCity={setCity}
                setPostalCode={setPostalCode}
            />
        </MapContainer>
    );
}

export default MapPicker;