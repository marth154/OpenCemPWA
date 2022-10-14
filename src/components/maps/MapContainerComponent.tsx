import { Box } from '@mui/material';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import points from '../../../static/points';
import Details from '../../@types/details';
import PointDetails from '../../utils/PointDetails';

export default function MapContainerComponent() {
    return (
        <MapContainer
            style={{ height: "37rem" }}
            center={[51.505, -0.09]}
            zoom={4}
            scrollWheelZoom={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {points.map((point: Details) => {
                return (
                    <>
                        <Marker position={[point.latitude, point.longitude]}>
                            <Popup>
                                <Box sx={{ width: "16rem", height: "15rem" }}>
                                    <PointDetails details={point} />
                                </Box>
                            </Popup>
                        </Marker>
                    </>
                )
            })}
        </MapContainer>
    )
}