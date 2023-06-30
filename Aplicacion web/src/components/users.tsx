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

const handleUsers = async () => {
  const ENDPOINT = 'http://localhost:3001/usuario';
  const data = {};
  const token = {
    headers:{
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3JyZW8iOiJ2aXNpQGdtLmNsIiwiaWF0IjoxNjg3NDAyODI4LCJleHAiOjE2ODc0ODkyMjh9.8ZZn7t_Hgx5amejRptI19OH9b3wG29aTYqUKibNREm0'
    }
  };
  const response = await axios.get(ENDPOINT, token)
  return response.data;
}

function Users() {
  const [rows, setRows] = React.useState<GridValidRowModel[]>([]);
  const apiRef = useGridApiRef();

  const columns: GridColDef[] = [
    { field: 'idusuario', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'First Name', width: 150 ,editable: true},
    { field: 'apellido', headerName: 'Last Name', width: 150 ,editable: true},
    { field: 'correo', headerName: 'Correo', type: 'email', width: 150 },
    { field: 'tipousuario', headerName: 'Tipo de usuario', type: 'email', width: 150 },
    { field: 'estado', headerName: 'Estado', type: 'email', width: 150 },
  ];

  const handleConfirmButton = ()=>{
    setRows(apiRef.current.getSortedRows())
    console.log(apiRef.current.getSortedRows()); //modificar por un envio a la BD | usar el apiref.current.getSortedRows() para enviar las rows editadas a la BD
  }

  const handleCancelButton = ()=>{
    apiRef.current.setRows(rows)
    console.log(apiRef.current.getSortedRows());
  } 

  React.useEffect(()=>{
    const fetchData = async ()=>{
      const users = await handleUsers();
      console.log(users)
      const transformedUsers = users.map((user) => ({
        ...user,
        id: user.idusuario,
      }));
      
      apiRef.current.setRows(transformedUsers);
    }
    fetchData();
  },[])

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
              <button className='button' onClick={handleConfirmButton}>Confirmar</button>
              <button className='button' onClick={handleCancelButton}>Cancelar</button>
          </div>
        </div>
    </div>
  )
}

export default Users

