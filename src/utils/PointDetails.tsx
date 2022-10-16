import { Stack, Typography } from "@mui/material"
import Details from "../@types/details"

interface Props {
    details: Details
}

export default function PointDetails({ details }: Props) {
    return (
        <>
            <Stack>
                <Typography>{`Détail de l'appareil`}</Typography>
                <Stack direction="column">
                    <Typography>ID: {details.id}</Typography>
                    <Typography>Nom: {details.name}</Typography>
                    <Typography>Date: {details.createdAt}</Typography>
                </Stack>
            </Stack>
        </>
    )
}