import React, { useEffect, useState } from 'react'
import TopBar from './common/topBar'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


const handleRequest = async () => {
  const ENDPOINT = 'http://localhost:3001/solicitud';
  const config = { 
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const response = await axios.get(ENDPOINT, config)
/*   let id=0
  data.forEach(element => {
      element["id"]=id
      id++
      element["kpi"]=element["rajoreal"]>element["esperadokpi"]
  }); */
  return response.data;
}

function Request() {
    const columns = [
        { field: 'fecha', headerName: 'Fecha', width: 150 },
        { field: 'idusuario', headerName: 'Usuario', width: 150 },
      ];
      
    const [ rows , setRows ]=useState([])

    useEffect(()=>{
      handleRequest().then((row)=>setRows(row))
    },[])

  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
      <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
        <TopBar message="Solicitudes de acceso"/>
      </div>
      <div className='flex flex-col m-4 sm:m-6'>
        <DataGrid className='bg-gray-400 mb-2' columns={columns} rows={rows} getRowId={(row)=>row.idsolicitud}/>
        <div className='flex flex-row self-center'>
            <button className='button'>Permitir</button>
            <button className='button'>Denegar</button>
        </div>
      </div>
    </div>
  )
}

export default Request