import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import * as React from 'react';
import points from '../../../static/points';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Number', width: 150, sortable: false },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    width: 300,
    editable: false,
    renderCell: (params) => {
      return (format(new Date(params.row.createdAt.split(" ")[0]), "P"))
    }
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 300,
    sortable: false,
    editable: false,
    renderCell: (params) => {
      // params.row.id || params.id
      return (
        <Stack direction="row" spacing={2}>
          <Button variant='contained' color="success">Edit</Button>
          <Button variant='contained' color="info">Details</Button>
          <Button variant='contained' color="error">Delete</Button>
        </Stack>
      )
    }
  }
];
export default function ListPoint() {
  return (
    <Box sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={points}
        disableSelectionOnClick
        columns={columns}
        components={{
          Pagination: () => {
            return (<></>)
          }
        }}
      />
    </Box>
  );
}
