import { useState } from "react"
import { add } from "services/notification/notification";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'assets/css/mapRequired.css'
import L from 'leaflet';
import marker from 'assets/images/conejo_burla.png';
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [50,50],     
});
export default function SandBox() {
    const [input, setInput] = useState('');
    const [input2, setInput2] = useState('');
    function saveNotification() {
        const data = {
            id: localStorage.getItem('storage_id'),
            text: input,
            from: input2
        }
        add(data).then((res) => {
            console.log(res);
        })
    }
    return (
        <>
            {/* <div className="mt-40 text-center">
                <h2>From</h2>
                <input type="text" value={input2} onChange={(e) => setInput2(e.target.value)} />
                <h1>Mensaje</h1>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={saveNotification}>Send</button>
            </div> */}
            <div className="h-screen w-full p-20">
                <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[51.505, -0.09]} icon={myIcon}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    )

}