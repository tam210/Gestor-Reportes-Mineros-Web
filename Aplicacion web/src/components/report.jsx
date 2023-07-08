import React,{ useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from './common/topBar'
import axios from 'axios';

const handleReports = async () => {
    const ENDPOINT = 'http://localhost:3001/reports';
    const data = {};
    const token = {
      headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    };
    const response = await axios.get(ENDPOINT, token)
    return response.data;
  }

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

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
    setSelectedDate(date);
    };

    return (
        <div className='flex flex-col h-screen w-full dark:bg-black'>
            <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                <TopBar message="Reportes"/>
            </div>
            <div>
                <div>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Tipo de reporte</span>
                        <select name='reportType'>
                            <option value="diary">Diario</option>
                            <option value="weeklyIso">Semana ISO</option>
                            <option value="weekly">Semana móvil</option>
                            <option value="monthly">Mensual</option>
                            <option value="annual">Anual</option>
                        </select>
                    </label>
                    <label className="block">
                        <span>Filtro por fecha</span>
                        <DatePicker selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"/>
                    </label>
                    
                </div>
                <div >
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>
    )
}

export default Report