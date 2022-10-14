import { Avatar, Button } from "@mui/material";
import { signIn } from "next-auth/react";


export default function LoginForm() {
    return (
        <Button startIcon={<Avatar src="/icons-google.svg" />} onClick={() => { signIn("google-auth") }}>
            Sign In Google
        </Button>
    );
}