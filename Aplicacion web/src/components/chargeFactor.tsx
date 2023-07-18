import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from './common/topBar'
import { useRouter } from 'next/navigation';
import ThreeDots from './common/ThreeDots';
import ExpireSession from './common/expireSession';
import axios from 'axios';

const handleFlota = async ()=>{
    const ENDPOINT = 'http://localhost:3001/flota'
    const config = {
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }
    const response = await axios.get(ENDPOINT,config)
    return response.data
}

const handleZona = async ()=>{
    const ENDPOINT = 'http://localhost:3001/zona'
    const config = {
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }
    const response = await axios.get(ENDPOINT,config)
    return response.data
}

const sendRequest = async (request)=>{
    const ENDPOINT = 'http://localhost:3001/viaje'
    const config = {
        headers:{
            Authorization: 'Bearer '+localStorage.getItem('token')
        }
    }
    const response = await axios.patch(ENDPOINT,request,config)
    console.log(response.data)
    return response.data
}

function ChargeFactor() {
    const [startedDate, setStartedDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chargeFactor, setChargeFactor] = useState('');
    const [flota, setFlota]=useState([])
    const [selectFlota, setSelectFlota]=useState('')
    const [zona, setZona]=useState([])
    const [selectZona, setSelectZona]=useState('')
    const [validUser,setValidUser]= useState(true);
    const [validRequest,setValidRequest]=useState(true)
    const router = useRouter()
    let token = localStorage.getItem('token')
    const handleStartChange = (date) => {
        setStartedDate(date);
    };
    const handleEndChange = (date) => {
        setEndDate(date);
    };
    const handleChargeFactor = (event)=>{
        const value = event.target.value;
        if(value===''||/^\d+$/.test(value)){
            setChargeFactor(event.target.value);
        }
        if(selectFlota===''){
            setSelectFlota(flota.find(item=>item.idflota===0).nombre)
        }
        if(selectZona===''){
            setSelectZona(zona.find(item=>item.idzona===0).nombre)
        }
    }

    const obtenerFechaFormateada = fecha => {
        const options = { year: 'numeric' , month: '2-digit', day: '2-digit'};
        return fecha.toLocaleDateString('en-US', options);
      };
        
    const validToken =( async ()=>{
        token = localStorage.getItem('token');
        if(token === null){
            router.push('/auth/login');
        } 
        try {
            await handleFlota().then((row)=>setFlota(row))
            await handleZona().then((row)=>setZona(row))
        } catch (error) {
            localStorage.removeItem('token');
            setValidUser(false)
        }
    })

    const changeFlota = (event)=>{
        setSelectFlota(event.target.value)
    }

    const changeZona = (event)=>{
        setSelectZona(event.target.value)
    }

    const confirm = async()=>{
        try {
            if(chargeFactor!==''){
                const request={
                    'idflota':(flota.find(item=>item.nombre===selectFlota)).idflota,
                    'idzona':(zona.find(item=>item.nombre===selectZona)).idzona,
                    'fechaInicio':obtenerFechaFormateada(startedDate),
                    'fechaFin':obtenerFechaFormateada(endDate),
                    'tonelaje':chargeFactor
                }
                setValidRequest(true)
                await sendRequest(request)
            }else{
                setValidRequest(false)
            }
        } catch (error) {
            setValidRequest(false)
        }
        
    }

    useEffect(()=>{
        validToken()
    },[])
    
  return (
    <div className='flex flex-col h-screen w-full dark:bg-black'>
        {validUser ? 
        (
            <div className='dark:bg-black'>
                {token ? 
                (
                    <div className='dark:bg-black'>
                        <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                            <TopBar message="Factor de carga"/>
                        </div>  
                        <div className='flex flex-col mt-8 mx-6'>
                            <div className='max-w-[200px] sm:max-w-[300px] self-center'>
                                <img className='w-full h-auto dark:invert' src="/images/camion.png"/>
                            </div>
                            <div className='flex dark:text-white flex-col place-content-center sm:flex-row'>
                                <div className='sm:mx-4'>
                                    <label className="flex my-3">
                                        <span>Flota:</span>
                                        <select className='mx-3 w-full text-black' name="flota" onChange={changeFlota}>
                                            {flota.map((option) => (
                                                <option key={option.idflota} value={option.nombre}>
                                                {option.nombre}
                                                </option>
                                            ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota
                                        </select>
                                    </label>
                                    <label className="flex my-3">
                                        <span>Fase:</span>
                                        <select className='mx-3 w-full text-black' name="zona" onChange={changeZona}>
                                            {zona.map((option) => (
                                                <option key={option.idzona} value={option.nombre}>
                                                {option.nombre}
                                                </option>
                                            ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota
                                        </select>
                                    </label>
                                </div>
                                <div className='sm:ml-4'>
                                    <label className="block my-3">
                                        <span>Fecha de inicio:</span>
                                        <DatePicker className='mx-3 text-black' selected={startedDate}
                                                    onChange={handleStartChange}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Selecciona una fecha"/>
                                    </label>
                                    <label className="block my-3">
                                        <span>Fecha de termino:</span>
                                        <DatePicker className='mx-3 text-black' selected={endDate}
                                                    onChange={handleEndChange}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Selecciona una fecha"/>
                                    </label>
                                </div>
                            </div>
                            <div className='flex dark:text-white flex-col sm:self-center'>
                                <div>
                                    <label className="block my-3">
                                        <span>Factor de carga:</span>
                                        <input className='mx-3 text-black' type="number" id='chargeFactor'  value={chargeFactor} onChange={handleChargeFactor} placeholder='Ingrese el factor de carga'/>
                                    </label>
                                </div>
                                <div className='self-center'>
                                <button className='button w-36' onClick={confirm}>Confirmar</button>
                                {!validRequest && <p className='text-red-600'>Error en los campos ingresados</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                ):
                (
                    <ThreeDots/>
                )}
            </div>
        ):(
            <ExpireSession/>
        )}
    </div>
  )
}

export default ChargeFactor