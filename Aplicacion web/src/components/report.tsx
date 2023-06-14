import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import TopBar from './common/topBar'

function Report() {
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
            <TopBar message="Reportes"/>
            <div>
                <div>Opciones y filtros</div>
                <div>
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>
    )
}

export default Report