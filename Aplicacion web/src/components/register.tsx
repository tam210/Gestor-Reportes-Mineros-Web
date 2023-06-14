import React, { useState } from 'react'
import TopBar from './common/topBar';

function Register() {
    const [email,setEmail]=useState();
    const [name,setName]=useState();
    const [lastName,setLastName]=useState();
    const [userType,setUserType]=useState();
    const [password,setPassword]=useState();

    const handleEmailChange=(event)=>{
        setEmail(event.target.value);
    }
    const handleNameChange=(event)=>{
        setName(event.target.value);
    }
    const handleLastNameChange=(event)=>{
        setLastName(event.target.value);
    }
    const handleUserTypeChange=(event)=>{
        setUserType(event.target.value);
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value);
    }

    return (
        <div>
            <TopBar message="Solicitud de acceso"/>
            <div>
                <div>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Correo</span>
                        <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Ingrese su correo'/>
                    </label>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Nombre</span>
                        <input type="name" id="name" value={name} onChange={handleNameChange} placeholder='Ingrese su nombre'/>
                    </label>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Apellido</span>
                        <input type="lastName" id="lastName" value={lastName} onChange={handleLastNameChange} placeholder='Ingrese su apellido'/>
                    </label>
                </div>
                <div>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Tipo de usuario</span>
                        {/* agregar un list box para el tipo de usuario */}
                    </label>
                    <label className='block'>
                        <span className='block text-sm font-medium text-black dark:text-white'>Contraseña</span>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña'/>
                    </label>
                    <button className='button'>Enviar Solicitud</button>
                </div>
            </div>
        </div>
    )
}

export default Register