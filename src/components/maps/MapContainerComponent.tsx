import { Box } from '@mui/material';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import Details from '../../@types/details';
import useSession from '../../hook/useSession';
import PointDetails from '../../utils/PointDetails';
import FormPoint from './FormPoint';

export default function MapContainerComponent() {
    const [createMarker, setCreateMarker] = useState<{ lat: number | undefined, lng: number | undefined }>({ lat: undefined, lng: undefined })
    const [listPoint, setListPoint] = useState<Details[] | undefined>()
    const [open, setOpen] = useState<boolean>(false)
    const session = useSession()
    function MyComponent() {
        const map = useMapEvents({
            popupopen: (e) => {
            },
            click: (e) => {
                const { lat, lng } = e.latlng;
                (session.access == "EDIT" && !open) && setCreateMarker({ lat: lat, lng: lng })
            }
        });

        return null
    }

    const fetchPoint = async () => {
        const res = await fetch("/api/point", {
            method: "GET",
        }).then((res) => { return res.json() })
        setListPoint(res.data)
    }

    useEffect(() => {
        fetchPoint();
    }, [])

    return (
        <MapContainer
            style={{ height: "70vh", border: "3px solid #9B887A"}}
            center={[47, 2]}
            zoom={6}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />
            {(createMarker.lat && createMarker.lng) &&
                <Marker position={[createMarker.lat, createMarker.lng]}>
                    <Popup>
                        <Box sx={{ width: "16rem" }}>
                            <FormPoint coordMarker={createMarker} setCreateMarker={setCreateMarker} fetchPoint={fetchPoint} />
                        </Box>
                    </Popup>
                </Marker>}
            {listPoint && listPoint.map((point: Details) => {
                return (
                    <>
                        <Marker position={[point.lat, point.lng]}>
                            <Popup>
                                <Box sx={{ width: "16rem" }}>
                                    <PointDetails details={point} fetchPoint={fetchPoint} setOpen={(value: boolean) => setOpen(value)}/>
                                </Box>
                            </Popup>
                        </Marker>
                    </>
                )
            })}
        </MapContainer>
    )
}