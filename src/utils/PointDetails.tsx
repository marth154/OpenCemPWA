import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import Details from "../@types/details";
import FormPoint from '../components/maps/FormPoint';
import useSession from '../hook/useSession';
import typeDevice from "./mock_data/typeDevice";

interface Props {
    details: Details | undefined
    setOpen?: (value: boolean) => void
    fetchPoint: () => void
}

export default function PointDetails({ details, fetchPoint, setOpen }: Props) {
    const [mode, setMode] = useState<"update" | "read">("read")
    const _type = typeDevice.find((type) => { return type.value === details?.type })
    const [load, setLoad] = useState<boolean>(false)
    const session = useSession()

    const handleDelete = async (id: string) => {
        setLoad(true)
        try {
            await fetch("/api/point", {
                method: "DELETE",
                body: JSON.stringify({ id: id })
            }).then((res) => {
                fetchPoint()
                setOpen && setOpen(false)
                setLoad(false)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {(mode === "read" && details) ?
                <Stack>
                    <Typography>{`Détail de l'appareil`}</Typography>
                    <Stack direction="column">
                        <Typography>ID: {details._id}</Typography>
                        <Typography>Nom: {details.name}</Typography>
                        <Typography>Date: {details.createdAt}</Typography>
                        <Typography>Type: {_type?.label}</Typography>
                    </Stack>
                    {session.access == "EDIT" && <Stack direction="row" justifyContent="space-around">
                        <Button onClick={() => {setMode("update"); setOpen && setOpen(true)}}>
                            Modifier
                        </Button>
                        <LoadingButton loading={load} color="error" variant="contained" onClick={() => {
                            handleDelete(details._id)
                        }}>
                            Supprimer
                        </LoadingButton>
                    </Stack>}
                </Stack> :
                <Stack >
                    <FormPoint coordMarker={{ lat: details?.lat, lng: details?.lng }} fetchPoint={fetchPoint} mode="update" point={details} />
                </Stack>
            }
        </>
    )
}