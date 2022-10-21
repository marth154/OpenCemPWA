import { Button, Dialog, DialogContent, DialogTitle, Stack, Table, TableCell, TableHead, TableRow } from '@mui/material';
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
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              {session.access === "EDIT" && <TableCell>Edit</TableCell>}
            </TableRow>
          </TableHead>
          {listPoint.map((point: Details) => {
            return (
              <>
                <TableRow>
                  <TableCell>
                    {point._id}
                  </TableCell>
                  <TableCell>
                    {point.name}
                  </TableCell>
                  <TableCell>
                    {format(new Date(point.createdAt), "P p")}
                  </TableCell>
                  <TableCell>
                    {typeDevice.find((t) => { return t.value === point.type })?.label}
                  </TableCell>
                  {session.access == "EDIT" && <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button variant='contained' color="success" onClick={() => { setMode("update"); setPointSelected(point); setOpenDialog(true) }}>Edit</Button>
                      <Button variant='contained' color="info" onClick={() => { setMode("read"); setOpenDialog(true) }}>Details</Button>
                      <Button variant='contained' color="error" onClick={() => handleDelete(point._id)}>Delete</Button>
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
