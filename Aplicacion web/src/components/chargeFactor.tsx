import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TopBar from './common/topBar'

function ChargeFactor() {
    const [startedDate, setStartedDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [chargeFactor, setChargeFactor] = useState(null);

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
    }
        
    
  return (
    <div className='flex flex-col h-screen w-full items-center dark:bg-black'>
        <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
            <TopBar message="Factor de carga"/>
        </div>  
        <div className='flex flex-col mt-8 mx-6'>
            <div className='max-w-[200px] sm:max-w-[300px] self-center'>
                <img className='w-full h-auto dark:invert' src="/images/camion.png"/>
            </div>
            <div className='flex dark:text-white flex-col sm:flex-row'>
                <div className='sm:mx-4'>
                    <label className="flex my-3">
                        <span>Flota:</span>
                        <select className='mx-3 w-full' name="fleet" id="">
                            {/* {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota */}
                        </select>
                    </label>
                    <label className="flex my-3">
                        <span>Fase:</span>
                        <select className='mx-3 w-full' name="fleet" id="">
                            {/* {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                {option.label}
                                </option>
                            ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota */}
                        </select>
                    </label>
                </div>
                <div className='sm:ml-4'>
                    <label className="block my-3">
                        <span>Fecha de inicio:</span>
                        <DatePicker className='mx-3' selected={startedDate}
                                    onChange={handleStartChange}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecciona una fecha"/>
                    </label>
                    <label className="block my-3">
                        <span>Fecha de termino:</span>
                        <DatePicker className='mx-3' selected={endDate}
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
                        <input className='mx-3' type="number" id='chargeFactor'  value={chargeFactor} onChange={handleChargeFactor} placeholder='Ingrese el factor de carga'/>
                    </label>
                </div>
                <div className='self-center'>
                  <button className='button w-36'>Confirmar</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChargeFactor