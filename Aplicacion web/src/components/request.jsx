import React from 'react'
import TopBar from './common/topBar'
import { DataGrid } from '@mui/x-data-grid';

function Request() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'age', headerName: 'Age', type: 'number', width: 90 },
      ];
      
    const rows = [
        { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
        { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32 },
        { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45 },
    ];
  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
      <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
        <TopBar message="Solicitudes de acceso"/>
      </div>
      <div className='flex flex-col m-4 sm:m-6'>
        <DataGrid className='bg-gray-400 mb-2' columns={columns} rows={rows}/>
        <div className='flex flex-row self-center'>
            <button className='button'>Permitir</button>
            <button className='button'>Denegar</button>
        </div>
      </div>
    </div>
  )
}

export default Request