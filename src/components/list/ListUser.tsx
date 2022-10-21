
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Table, TableCell, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import User from '../../@types/user';
import FormUser from '../../utils/FormUser';
import ProgressSpinner from '../../utils/PrgrossSpiner';
export default function ListUser() {
    const [listUser, setListUser] = useState<User[]>()
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [userSelected, setUserSelected] = useState<User>()
    const [openDialogAdd, setOpenDialogAdd] = useState<boolean>(false)
    const [mode, setMode] = useState<"read" | "update">("read")

    const handleDelete = async (id: string) => {
        try {
            await fetch("/api/user", {
                method: "DELETE",
                body: JSON.stringify({ id: id })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchUser = async () => {
        const res = await fetch("/api/user", {
            method: "GET",
        }).then((res) => { return res.json() })
        setListUser(res.data)
    }

    useEffect(() => {
        fetchUser();
    }, [])
    if (!listUser) return <ProgressSpinner />

    return (
        <>
            <Button variant="contained" onClick={() => setOpenDialogAdd(true)}>Add user</Button>
            <Box sx={{ height: "95vh", width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>ID</TableCell>
                            <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Name</TableCell>
                            <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Email</TableCell>
                            <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Accès</TableCell>
                            <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    {listUser.map((user: User) => {
                        return (
                            <>
                                <TableRow sx={{ boxShadow: "0px 5px 5px #00000025" }}>
                                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                                        {user._id}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                                        {user.name}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                                        {user.email}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                                        {user.access === "READ_ONLY" ? "Read Only" : "Edit"}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant='contained' sx={{ backgroundColor: "#9B887A", color: "white" }} onClick={() => { setMode("update"); setUserSelected(user); setOpenDialog(true); }}>Edit</Button>
                                            <IconButton sx={{
                                                backgroundColor: "#710E0E", color: "white", ":hover": {
                                                    backgroundColor: "#710E0E",
                                                    boxShadow: "0px 5px 5px #00000050;"
                                                }
                                            }} onClick={() => handleDelete(user._id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                                        <DialogTitle>{mode === "read" ? "Détails" : "Modifier"}</DialogTitle>
                                        <DialogContent>
                                            <FormUser fetchUser={fetchUser} setOpenDialog={(value: boolean) => setOpenDialog(value)} user={userSelected} mode={mode} />
                                        </DialogContent>
                                    </Dialog>
                                </TableRow>
                            </>
                        )
                    })}
                </Table>
            </Box>
            <Dialog open={openDialogAdd}>
                <DialogTitle>Ajouter un utilisateur</DialogTitle>
                <DialogContent>
                    <FormUser fetchUser={fetchUser} setOpenDialog={(value: boolean) => setOpenDialogAdd(value)} />
                </DialogContent>
            </Dialog>
        </>
    )
}