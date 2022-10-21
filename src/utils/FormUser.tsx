import { LoadingButton } from '@mui/lab';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import User from '../@types/user';

interface Props {
    fetchUser: () => void
    mode?: "update" | "read"
    user?: User
    setOpenDialog?: (value: boolean) => void
}

interface InitialValue {
    name: string
    email: string
    access: string
}

export default function FormUser({ fetchUser, mode, user, setOpenDialog }: Props) {
    const formik = useFormik<InitialValue>({
        initialValues: {
            email: user ? user.email : "",
            name: user ? user.name : "",
            access: user ? user.access : "",
        },
        onSubmit: (async values => {
            if (mode === "update" && user) {
                try {
                    await fetch("/api/user", {
                        method: "PUT",
                        body: JSON.stringify({ name: values.name, access: values.access, email: values.email, id: user._id }),
                    })
                        .then((res) => {
                            fetchUser()
                            setOpenDialog && setOpenDialog(false)
                        })
                } catch (error) {
                    console.log(error)
                }
            } else {
                try {
                    await fetch("/api/user", {
                        method: "POST",
                        body: JSON.stringify({ values }),
                    })
                        .then((res) => {
                            fetchUser()
                            setOpenDialog && setOpenDialog(false)
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
                <TextField id="standard-basic"  {...getFieldProps("email")} label="Email" multiline variant="standard" />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Accès</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        {...getFieldProps("access")}
                    >
                        <MenuItem value="READ_ONLY">Read only</MenuItem>
                        <MenuItem value="EDIT">Edit</MenuItem>
                    </Select>
                </FormControl>
                <LoadingButton
                    disabled={
                        !values.name ||
                        !values.access ||
                        !values.email
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