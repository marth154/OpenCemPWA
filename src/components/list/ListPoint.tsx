import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, Table, TableCell, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import Details from '../../@types/details';
import useSession from '../../hook/useSession';
import typeDevice from '../../utils/mock_data/typeDevice';
import PointDetails from '../../utils/PointDetails';
import ProgressSpinner from '../../utils/PrgrossSpiner';
import FormPoint from '../maps/FormPoint';



export default function ListPoint() {
  const [listPoint, setListPoint] = useState<Details[]>()
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [pointSelected, setPointSelected] = useState<Details>()
  const [mode, setMode] = useState<"read" | "update">("read")
  const session = useSession()

  const handleDelete = async (id: string) => {
    try {
      await fetch("/api/point", {
        method: "DELETE",
        body: JSON.stringify({ id: id })
      })
      fetchPoint()
    } catch (error) {
      console.log(error)
    }
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

  if (!listPoint) return <ProgressSpinner />

  return (
    <>
      <Box sx={{ height: "95vh", width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>ID</TableCell>
              <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Name</TableCell>
              <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Date</TableCell>
              <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Type</TableCell>
              {session.access === "EDIT" && <TableCell sx={{fontFamily: "Lancelot", fontSize: "25px"}}>Edit</TableCell>}
            </TableRow>
          </TableHead>
          {listPoint.map((point: Details) => {
            return (
              <>
                <TableRow sx={{ boxShadow: "0px 5px 5px #00000025" }}>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {point._id}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {point.name}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {format(new Date(point.createdAt), "P p")}
                  </TableCell>
                  <TableCell sx={{ fontFamily: "Poppins, sans-serif" }}>
                    {typeDevice.find((t) => { return t.value === point.type })?.label}
                  </TableCell>
                  {session.access == "EDIT" && <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant='contained' sx={{ backgroundColor: "#9B887A" }} onClick={() => { setMode("update"); setPointSelected(point); setOpenDialog(true) }}>Edit</Button>
                      <Button variant='contained' sx={{ backgroundColor: "#0D68A9" }} onClick={() => { setMode("read"); setOpenDialog(true) }}>Details</Button>
                      <IconButton sx={{ backgroundColor: "#710E0E", color: "white", ":hover": {
                        backgroundColor: "#710E0E",
                        boxShadow: "0px 5px 5px #00000050;"
                      } }} onClick={() => handleDelete(point._id)}>
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Stack>
                  </TableCell>}
                </TableRow>
              </>
            )
          })}
        </Table>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{mode === "read" ? "Détails" : "Modifier"}</DialogTitle>
        <DialogContent>
          {mode === "read"
            ? <PointDetails details={pointSelected} fetchPoint={fetchPoint} />
            : <FormPoint mode="update" point={pointSelected} fetchPoint={fetchPoint} coordMarker={{ lat: pointSelected?.lat, lng: pointSelected?.lng }} />
          }
        </DialogContent>
      </Dialog>
    </>
  );
}
