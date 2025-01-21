import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import Inmueble from "@/types/Inmueble";

import { icon } from "leaflet"

const ICON = icon({
    iconUrl: "/circle_area.svg",
    iconSize: [100, 100],
})

const fillBlueOptions = { fillColor: 'blue' }

export default function LeaftletMap({ inmueble, coordinates }: { inmueble: Inmueble, coordinates: [number, number] }) {
    return (
        <div id="map" className="w-full h-[400px] rounded-lg col-span-2">
            <MapContainer
                key={coordinates?.join(",")}
                center={coordinates}
                zoom={15}
                scrollWheelZoom={false}
                className="rounded-lg w-full h-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                    center={coordinates}
                    pathOptions={fillBlueOptions}
                    radius={500}
                    stroke={false}
                />
            </MapContainer>
        </div>
    )
}