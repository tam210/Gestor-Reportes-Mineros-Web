import React,{ useEffect, useState } from 'react'
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ThreeDots from "./common/ThreeDots";
import TopBar from './common/topBar'
import axios from 'axios';
import { useRouter } from "next/navigation"
import { startOfWeek, endOfWeek } from 'date-fns';
import ExpireSession from './common/expireSession';
import clsx from 'clsx';
import Box from '@mui/material/Box';
import { parse } from 'json2csv';

const handleReports = async (params) => {
    const ENDPOINT = 'http://localhost:3001/reporte/';
    const config = {
      params: params,  
      headers:{
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    };
    console.log(params)
    const response = await axios.get(ENDPOINT, config)
    const data=response.data
    let id=0
    data.forEach(element => {
        element["id"]=id
        id++
        element["kpi"]=parseInt(parseInt(element["rajoreal"])/parseInt(element["esperadokpi"])*100)
        
    });
    return response.data;
  }

function Report() {
    const columns = [
        { field: 'rajonombre', headerName: 'Nombre del rajo', minWidth: 200 },
        { field: 'fecha', headerName: 'Fecha', minWidth: 200 },
        { field: 'rajoreal', headerName: 'Tonelaje real', minWidth: 200 },
        { field: 'esperadokpi', headerName: 'Tonelaje esperado', minWidth: 200 },
        { field: 'kpi', headerName: 'KPI(%)',cellClassName: (params)=>{ 
            return clsx('super-app',{ excelente:params.value>=110, bueno: params.value<110, insuficiente: params.value<97, malo: params.value<95})},width:80}
      ];
      
    const [rows,setRows] = useState([])
    const router=useRouter();
    const [type,setType] =useState('diary');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [validUser,setValidUser]= useState(true);
    const { parse } = require('json2csv');
    let params = {}
    let token = localStorage.getItem('token');

    const obtenerFechaFormateada = fecha => {
        const options = { year: 'numeric' , month: '2-digit', day: '2-digit'};
        return fecha.toLocaleDateString('en-US', options);
      };

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

    const findReport = async() => {
        if(type==="diary"){
            params['fechaInicio']=obtenerFechaFormateada(selectedDate)
            params['fechaFin']=obtenerFechaFormateada(selectedDate)
        }if(type==="weeklyIso"){
            const fechas = obtenerInicioFinSemanaIso(selectedDate)
            params['fechaInicio']=obtenerFechaFormateada(fechas.inicio)
            params['fechaFin']=obtenerFechaFormateada(fechas.fin)
        }if(type==="weekly"){
            const fechas = obtenerInicioFinSemana()
            params['fechaInicio']=obtenerFechaFormateada(fechas.inicio)
            params['fechaFin']=obtenerFechaFormateada(fechas.fin)
            console.log(params)
        }if(type==="monthly"){
            const fechas = obtenerInicioFinMes(selectedDate,type)
            params['fechaInicio']=obtenerFechaFormateada(fechas.inicio)
            params['fechaFin']=obtenerFechaFormateada(fechas.fin)
        }if(type==="annual"){
            const fechas = obtenerInicioFinMes(selectedDate,type)
            params['fechaInicio']=obtenerFechaFormateada(fechas.inicio)
            params['fechaFin']=obtenerFechaFormateada(fechas.fin)
        }
        await handleReports(params).then(rowData=>setRows(rowData))
    }

    const validToken =( async ()=>{
        token = localStorage.getItem('token');
        if(token === null){
            router.push('/auth/login');
        } 
        try {
            await handleReports().then(rowData=>setRows(rowData))
        } catch (error) {
            localStorage.removeItem('token');
            setValidUser(false)
        }
    })

    const toCSV = ()=>{
        const csv = parse(rows);
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, 'export.csv');
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", 'export.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    useEffect(()=>{
        validToken()
    },[])

    return (
        <div className='flex flex-col h-screen w-full dark:bg-black'>
        { validUser ? 
            (
                <div className='dark:bg-black'>
                    {
                    token ?
                    (
                    <div className='dark:bg-black'>
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
                                    {type!=='weekly'&&<label className="flex md:mx-2 lg:mx-10">
                                        <span className='dark:text-white mx-2'>Filtro por fecha</span>
                                        <DatePicker selected={selectedDate}
                                            onChange={handleDateChange}
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Fecha inicio"
                                            className='w-36'/>
                                    </label>}
                                </div>
                                <button className='button flex' onClick={findReport}>Buscar</button>
                                <button className='button flex' onClick={toCSV}>ExportarCSV</button>
                            </div>
                            <div className='flex lg:mx-auto dark:bg-gray-400'>
                            <Box
                                sx={{
                                    width: '100%',
                                    '& .super-app-theme--cell': {
                                    backgroundColor: 'rgba(224, 183, 60, 0.55)',
                                    color: '#1a3e72',
                                    fontWeight: '600',
                                    },
                                    '& .super-app.negative': {
                                    backgroundColor: 'rgba(157, 255, 118, 0.49)',
                                    color: '#1a3e72',
                                    fontWeight: '600',
                                    },
                                    '& .super-app.positive': {
                                    backgroundColor: '#d47483',
                                    color: '#1a3e72',
                                    fontWeight: '600',
                                    },
                                }}
                                >
                                <DataGrid className='flex' columns={columns} rows={rows} />
                                </Box>
                                
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

export default Report