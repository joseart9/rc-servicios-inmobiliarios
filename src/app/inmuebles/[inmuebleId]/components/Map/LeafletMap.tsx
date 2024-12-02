import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Inmueble from "@/types/Inmueble";

import { icon } from "leaflet"

const ICON = icon({
    iconUrl: "/marker-icon-2x.png",
    iconSize: [25, 45],
})

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
                <Marker position={coordinates} icon={ICON}>
                    <Popup>
                        <p className="uppercase">{inmueble.nombre}</p>
                        <p className="text-default-500 capitalize">
                            {inmueble.direccion?.calle} {inmueble.direccion?.numeroExterior},{" "}
                            {inmueble.direccion?.ciudad}, {inmueble.direccion?.estado}
                        </p>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}