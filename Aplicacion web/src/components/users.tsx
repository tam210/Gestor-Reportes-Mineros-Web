import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridColDef,
  DataGrid,
  useGridApiRef,
  GridValidRowModel
} from '@mui/x-data-grid';
import TopBar from './common/topBar';
import axios from 'axios';


const initialRows: GridValidRowModel[] = [ //se elimina y remplaza por consulta a la BD
  { id: 1, firstName: 'John', lastName: 'Doe', email: 'Jhonny@gmail.com' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', email:'Jane@gmail.com' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', email:'Bobby@gmail.com' },
];


function Users() {
  const [rows, setRows] = React.useState(initialRows);
  const apiRef = useGridApiRef();
  const handleUsers = async () => {
    const ENDPOINT = 'http://localhost:3001/usuario'
    const data = {
    }
    const response = await axios.post(ENDPOINT, data)
    console.log(response.data)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 150 ,editable: true},
    { field: 'lastName', headerName: 'Last Name', width: 150 ,editable: true},
    { field: 'email', headerName: 'Correo', type: 'email', width: 150 },
  ];

  const handleConfirmButton = ()=>{
    setRows(apiRef.current.getSortedRows())
    console.log(apiRef.current.getSortedRows()); //modificar por un envio a la BD | usar el apiref.current.getSortedRows() para enviar las rows editadas a la BD
  }

  const handleCancelButton = ()=>{
    apiRef.current.setRows(rows)
    console.log(apiRef.current.getSortedRows());
  } 

  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
        <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
          <TopBar message='Usuarios'/>
        </div>
        <div className='flex flex-col mx-2 my-2 sm:mx-6 sm:my-4'>
          <div className='max-h-[450px] w-full sm:max-h-[700px]'>
            <DataGrid columns={columns} rows={rows} apiRef={apiRef}/>
          </div>
          <div className='flex self-center'>
              <button className='button' onClick={handleUsers}>Confirmar</button>
              <button className='button' onClick={handleCancelButton}>Cancelar</button>
          </div>
        </div>
    </div>
  )
}

export default Users

