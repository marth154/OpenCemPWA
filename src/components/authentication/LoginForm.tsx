import { LoadingButton } from "@mui/lab";
import { Card, Container, Stack, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useFormik } from "formik";
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

interface InitialValue {
    email: string
    password: string
}


export default function LoginForm() {
    const router = useRouter()
    const formik = useFormik<InitialValue>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email(),
            password: Yup.string()
        }),
        onSubmit: async (value) => {
            try {
                const res = await fetch("/api/login", {
                    method: "POST",
                    body: JSON.stringify({
                        email: value.email,
                        password: value.password,
                    }),
                }).then((response) => { return response.json() })
                jsCookie.set("id", res.id)
                jsCookie.set("name", res.name)
                jsCookie.set("email", res.email)
                jsCookie.set("role", res.role)
                jsCookie.set("access", res.access)
                if (res.role === "user") {
                    router.push("/")
                } else {
                    router.push("/list")
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
    const { errors, getFieldProps, touched, handleSubmit, isSubmitting } = formik
    return (
        <>
            <Container sx={{ height: "100vh" }}>
                <Stack alignItems="center" justifyContent="center">
                    <Card variant="outlined" sx={{ width: 500, height: 500 }}>
                        <Typography variant="h4" align="center" sx={{ mt: 3 }}>Login</Typography>
                        <Stack alignItems="center" justifyContent="center" sx={{ height: "40vh" }}>
                            <TextField
                                {...getFieldProps("email")}
                                sx={{ width: 250 }}
                                id="standard-basic"
                                label="Email"
                                variant="standard"
                                type="email"
                                error={Boolean(touched.email && errors.email)}
                                helperText={touched.email && errors.email}
                            />
                            <TextField
                                {...getFieldProps("password")}
                                sx={{ width: 250 }}
                                id="standard-basic"
                                label="Mot de passe"
                                variant="standard"
                                type="password"
                                error={Boolean(touched.password && errors.password)}
                                helperText={touched.password && errors.password}
                            />

                            <LoadingButton onClick={() => handleSubmit()} loading={isSubmitting}>
                                Se connecter
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Stack>
            </Container>
        </>
    )
}