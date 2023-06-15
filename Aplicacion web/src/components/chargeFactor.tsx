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
    <div>
        <TopBar message="Factor de carga"/>
        <div>
            <label className="block">
                <span>Flota:</span>
                <select name="fleet" id="">
                    {/* {options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota */}
                </select>
            </label>
            <label className="block">
                <span>Fase:</span>
                <select name="fleet" id="">
                    {/* {options.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))} usar el codigo anterior para recibir un arreglo de flotas llamado options y crear una opcion para cada flota */}
                </select>
            </label>
            <label className="block">
                <span>Fecha de inicio</span>
                <DatePicker selected={startedDate}
                            onChange={handleStartChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"/>
            </label>
            <label className="block">
                <span>Fecha de termino</span>
                <DatePicker selected={endDate}
                            onChange={handleEndChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"/>
            </label>
            <label className="block">
                <span>Factor de carga:</span>
                <input type="number" id='chargeFactor'  value={chargeFactor} onChange={handleChargeFactor} placeholder='Ingrese el nuevo factor de carga'/>
            </label>
        </div>
    </div>
  )
}

export default ChargeFactor