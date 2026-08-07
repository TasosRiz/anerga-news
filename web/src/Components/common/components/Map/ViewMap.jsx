import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ViewMap = ({ lat, lng }) => {
    return (
        <MapContainer
            center={[Number(lat), Number(lng)]}
            zoom={15}
            style={{ height: "300px", width: "100%", marginTop: '20px' }}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[Number(lat), Number(lng)]} />

        </MapContainer>
    )
}

export default ViewMap
