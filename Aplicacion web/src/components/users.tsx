import React from 'react'
import TopBar from './common/topBar'
import { DataGrid } from '@mui/x-data-grid';


function Users() {
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
    <div>
        <TopBar/>
        <div>
            <DataGrid columns={columns} rows={rows}/>
            <div>
                <button className='button'>Confirmar</button>
                <button className='button'>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default Users