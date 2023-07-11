import * as React from 'react';
import TopBar from './common/topBar';
import axios from 'axios';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const handleUsers = async () => {
  const ENDPOINT = 'http://localhost:3001/usuario';
  const token = {
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const response = await axios.get(ENDPOINT, token);
  return response.data;
}

const sendUpdate = async (user) => {
  const ENDPOINT = 'http://localhost:3001/usuario/';
  const token = {
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const response = await axios.patch(ENDPOINT,user, token);
  return response.data;
}

function Users() {
  const [rows, setRows] = React.useState([]);
  const [rowSelect,setRowSelect]= React.useState(null);
  const apiRef = useGridApiRef();
  let changes = [];

  const columns = [
    { field: 'nombre', headerName: 'First Name', width: 250 ,editable: true},
    { field: 'apellido', headerName: 'Last Name', width: 250 ,editable: true},
    { field: 'correo', headerName: 'Correo',type: 'email', width: 250 },
    { field: 'tipousuario', headerName: 'Tipo de usuario', width: 250 },
    { field: 'estado', headerName: 'Estado', width: 250 },
  ];

  const handleConfirmButton = async ()=>{
    setRows(apiRef.current.getSortedRows())
    const update = apiRef.current.getSortedRows()
    for (let index = 0; index < update.length; index++) {
      let user = update[index]
      if (changes.includes(user['correo'])){
        sendUpdate(user)
      }
    }
    changes=[]
  }

  const blockUser = async ()=>{
    await sendUpdate({"id":rowSelect.id,"estadoText":"Bloqueado"})
    handleUsers().then(rowData=>setRows(rowData))
  }

  const unBlockUser = async ()=>{
    await sendUpdate({"id":rowSelect.id,"estadoText":"Aprobado"})
    handleUsers().then(rowData=>setRows(rowData))
  }

  const changeRowSelect = (event)=>{
    setRowSelect(event.row)
  }


  const handleCancelButton = ()=>{
    apiRef.current.setRows(rows)
  } 

  const updateRow = (params)=>{
    changes.push(params.row.correo)
  }

  React.useEffect(()=>{
    handleUsers().then(rowData=>setRows(rowData))
  },[])

  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
        <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
          <TopBar message='Usuarios'/>
        </div>
        <div className='flex flex-col mx-2 my-2 sm:mx-6 sm:my-4'>
          <div className="flex w-full dark:bg-gray-400 ">
            <DataGrid rows={rows} columns={columns} apiRef={apiRef} onRowClick={changeRowSelect} onCellEditStop={updateRow}/>
          </div>
          <div className='flex self-center'>
              <button className='button' onClick={handleConfirmButton}>Guardar</button>
              <button className='button' onClick={handleCancelButton}>Cancelar</button>
              <button className='button' onClick={blockUser}>Bloquear</button>
              <button className='button' onClick={unBlockUser}>Desbloquear</button>
          </div>
        </div>
    </div>
  )
}

export default Users

