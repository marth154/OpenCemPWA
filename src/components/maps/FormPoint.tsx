import { LoadingButton } from '@mui/lab';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import Details from '../../@types/details';
import typeDevice from '../../utils/mock_data/typeDevice';

interface Props {
    coordMarker: {
        lng: number | undefined
        lat: number | undefined
    }
    setCreateMarker?: (value: { lat: number | undefined, lng: number | undefined }) => void
    fetchPoint: () => void
    mode?: "update" | "read"
    point?: Details
}

interface InitialValue {
    name: string
    description: string
    lat: number
    lng: number
    type: string
}

export default function FormPoint({ coordMarker, setCreateMarker, fetchPoint, mode, point }: Props) {
    const router = useRouter()
    const formik = useFormik<InitialValue>({
        initialValues: {
            lat: coordMarker.lat ? coordMarker.lat : 0,
            lng: coordMarker.lng ? coordMarker.lng : 0,
            description: point && point.description ? point.description : "",
            name: point ? point.name : "",
            type: point ? point.type : "",
        },
        onSubmit: (async values => {
            if (mode === "update" && point) {
                try {
                    await fetch("/api/point", {
                        method: "PUT",
                        body: JSON.stringify({ name: values.name, description: values.description, type: values.type, id: point._id }),
                    })
                        .then((res) => {
                            fetchPoint()
                            router.reload()
                        })
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    await fetch("/api/point", {
                        method: "POST",
                        body: JSON.stringify({ values }),
                    })
                        .then((res) => {
                            setCreateMarker && setCreateMarker({ lat: undefined, lng: undefined })
                            fetchPoint()
                        })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    })

    const { values, getFieldProps, isSubmitting, handleSubmit } = formik

    return (
        <>
            <Stack direction="column" spacing={3}>
                <TextField id="standard-basic" {...getFieldProps("name")} label="Nom" variant="standard" />
                <TextField id="standard-basic"  {...getFieldProps("description")} label="Description" multiline variant="standard" />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        {...getFieldProps("type")}
                    >
                        {typeDevice.map((type) => {
                            return (
                                <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <LoadingButton
                    disabled={
                        !values.name ||
                        !values.type
                    }
                    loading={isSubmitting}
                    onClick={() => handleSubmit()}
                >
                    {mode === "update" ? "Modifier" : "Ajouter"}
                </LoadingButton>
            </Stack>
        </>
    )
}