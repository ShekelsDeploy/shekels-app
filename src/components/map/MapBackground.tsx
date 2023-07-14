import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'assets/css/mapRequired.css'
export default function MapBackground({ children }: any) {
    return (
        <>
            <div className="h-screen w-full relative">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />
                </MapContainer>
                <div className="absolute inset-0 z-30 top-16 blur-none flex justify-center">
                    {children}
                </div>
            </div>
        </>
    );
}