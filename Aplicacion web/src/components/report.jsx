import React,{ useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from './common/topBar'
import axios from 'axios';
import { startOfWeek, endOfWeek } from 'date-fns';


const handleReports = async (date,type) => {
    const ENDPOINT = 'http://localhost:3001/reports';
    const data = {'fecha':date};
    const token = {
      headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    };
    //const response = await axios.get(ENDPOINT, token)
    //return response.data;
    console.log(date,type)
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

    const [type,setType] =useState('diary');
    const [selectedDate, setSelectedDate] = useState(new Date());

    function obtenerInicioFinSemanaIso(fecha) {
        const inicioSemana = startOfWeek(fecha, { weekStartsOn: 1 });
        const finSemana = endOfWeek(fecha, { weekStartsOn: 1 });
        return { inicio: inicioSemana, fin: finSemana };
      }

    function obtenerInicioFinMes(fecha,tipo) {
        const year = fecha.getFullYear();
        const month = fecha.getMonth();
        
        let inicio;
        let fin;

        console.log(tipo)
        if(tipo==="monthly"){  
            inicio = new Date(year, month, 1);
            fin = new Date(year, month + 1, 0);
        }if(tipo==="annual"){   
            inicio = new Date(year,0,1)
            fin = new Date(year+1,0,0)
        }

        return {
          inicio: inicio,
          fin: fin
        };
    } 

    function obtenerInicioFinSemana() {
        const hoy = new Date();
        const inicioSemana = new Date(hoy);
        inicioSemana.setDate(hoy.getDate() - 6);
        return { inicio: inicioSemana, fin: hoy };
      }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const findReport = () => {
        if(type==="diary"){
            handleReports(selectedDate,type)
        }if(type==="weeklyIso"){
            handleReports(obtenerInicioFinSemanaIso(selectedDate),type)
        }if(type==="weekly"){
            handleReports(obtenerInicioFinSemana(),type)
        }if(type==="monthly"){
            handleReports(obtenerInicioFinMes(selectedDate,type),type)
        }if(type==="annual"){
            handleReports(obtenerInicioFinMes(selectedDate,type),type)
        }
    }

    return (
        <div className='flex flex-col h-screen w-full dark:bg-black'>
            <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                <TopBar message="Reportes"/>
            </div>
            <div className='flex flex-col m-2 sm:mx-6 sm:my-4'>
                <div className='flex flex-col md:flex-row sm:self-center mb-4 mt-2 sm:mt-4 sm:mb-6 items-center'>
                    <div className='flex flex-col sm:flex-row '>
                        <label className='flex mb-4 sm:mb-0'>
                            <span className='block font-medium mx-2 text-black dark:text-white'>Tipo de reporte</span>
                            <select name='reportType' value={type} onChange={handleTypeChange} className='w-36'>
                                <option value="diary">Diario</option>
                                <option value="weeklyIso">Semana ISO</option>
                                <option value="weekly">Semana móvil</option>
                                <option value="monthly">Mensual</option>
                                <option value="annual">Anual</option>
                            </select>
                        </label>
                        <label className="flex md:mx-2 lg:mx-10">
                            <span className='dark:text-white mx-2'>Filtro por fecha</span>
                            <DatePicker selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Fecha inicio"
                                className='w-36'/>
                        </label>
                    </div>
                    <button className='button flex' onClick={findReport}>Buscar</button>
                    <button className='button flex'>ExportarCSV</button>
                </div>
                <div className='dark: bg-gray-400'>
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>
    )
}

export default Report