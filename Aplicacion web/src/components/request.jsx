import React, { useEffect, useState } from 'react'
import TopBar from './common/topBar'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from "next/navigation"
import ThreeDots from "./common/ThreeDots";
import ExpireSession from './common/expireSession';


const handleRequest = async () => {
  const ENDPOINT = 'http://localhost:3001/solicitud';
  const config = { 
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const response = await axios.get(ENDPOINT, config)
  console.log(response.data)
  const request = response.data.map(item=>({
    id: item.idsolicitud,
    idusuario: item.idusuario,
    fecha: item.fecha,
    correo: item.usuario.correo,
    nombre: item.usuario.nombre,
    apellido: item.usuario.apellido,
    tipo: item.usuario.tipousuario 
  }))
  return request;
}

const sendRequest = async (row, decision) =>{
  const ENDPOINT = 'http://localhost:3001/usuario/solicitudes';
  const config = { 
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const request = {
    id: row.idusuario,
    decision: decision
  }
  const response = await axios.patch(ENDPOINT, request , config);
  return response.data; 
}

function Request() {
  const columns = [
      { field: 'fecha', headerName: 'Fecha', width: 150 },
      { field: 'correo', headerName: 'Correo', width: 150 },
      { field: 'nombre', headerName: 'Nombre', width: 150 },
      { field: 'apellido', headerName: 'Apellido', width: 150 },
      { field: 'tipo', headerName: 'Tipo', width: 150 },
    ];
  
  const [ rows , setRows ]=useState([])
  const [rowSelect,setRowSelect]= useState(null);
  const router=useRouter();
  const [validUser,setValidUser]= useState(true);
  let token = localStorage.getItem('token');

  const validToken = async ()=>{
    token = localStorage.getItem('token');
    if(token === null){
        router.push('/auth/login');
    } 
    try {
        await handleRequest().then((row)=>setRows(row))
    } catch (error) {
      console.log('Error')
        localStorage.removeItem('token');
        setValidUser(false)
    }
  }

  const changeRowSelect = (event)=>{
    setRowSelect(event.row)
  }

  const approve = async () => {
    if(rowSelect!==null){
      await sendRequest(rowSelect,true)
    }
    handleRequest().then((row)=>setRows(row))
  }

  const deny = async () => {
    if(rowSelect!==null){
      await sendRequest(rowSelect,false)
    }
    handleRequest().then((row)=>setRows(row))
  }

  useEffect( ()=>{
    validToken()
  },[])

  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
      {
        validUser ? (
          <div className='dark:bg-black'>
            {
              token ?
              (
                <div className='dark:bg-black'>
                  <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                    <TopBar message="Solicitudes de acceso"/>
                  </div>
                  <div className='flex relative flex-col m-4 sm:m-6'>
                    <DataGrid className='dark:bg-gray-400 mb-2 lg:mx-auto' columns={columns} rows={rows} onRowClick={changeRowSelect} getRowId={(row)=>row.id}/>
                    <div className='flex flex-row self-center'>
                        <button className='button' onClick={approve}>Permitir</button>
                        <button className='button' onClick={deny}>Denegar</button>
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
        ):(<ExpireSession/>)
      }
    </div>
  )
}

export default Request