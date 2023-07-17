import * as React from 'react';
import TopBar from './common/topBar';
import axios from 'axios';
import { useRouter } from "next/navigation"
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import ThreeDots from "./common/ThreeDots";
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
  const router=useRouter();
  let changes = [];
  let token = localStorage.getItem('token');

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

  const validToken =( async ()=>{
    token = localStorage.getItem('token');
    console.log(token)
    if(token === null){
        router.push('/auth/login');
    } 
    try {
        await handleUsers().then(rowData=>setRows(rowData))
    } catch (error) {
        localStorage.removeItem('token');
        router.push('/auth/login');
    }
})

  React.useEffect(()=>{
    validToken()
  },[])

  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
      {
        token ?
        (
          <div>
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
        ) : (
          <div className="container grid mx-auto min-h-screen items-center place-items-center">
              <ThreeDots/>
          </div> 
       )
      }    
    </div>
  )
}

export default Users

