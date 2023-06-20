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
        <div className='flex flex-col h-screen w-full items-center dark:bg-black'>
            <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                <TopBar message="Solicitud de acceso"/>
            </div>
            <div className='flex flex-col mt-4 items-center sm:mt-10'>
                <div className='max-w-[150px] md:max-w-[250px] dark:invert'>
                    <img src="/images/User.png" className='h-full w-auto'/>
                </div>
                <div className='flex flex-col sm:flex-row mt-2 sm:mt-8'>
                    <div className='sm:mx-2'>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Correo</span>
                            <input className='registerInput' type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Ingrese su correo'/>
                        </label>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Nombre</span>
                            <input className='registerInput' type="name" id="name" value={name} onChange={handleNameChange} placeholder='Ingrese su nombre'/>
                        </label>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Apellido</span>
                            <input className='registerInput' type="lastName" id="lastName" value={lastName} onChange={handleLastNameChange} placeholder='Ingrese su apellido'/>
                        </label>
                    </div>
                    <div className='sm:mx-2'>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Tipo de usuario</span>
                            <select className='w-full h-8 px-3 my-1'>
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                        </label>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Contraseña</span>
                            <input className='registerInput' type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña'/>
                        </label>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Confirmar contraseña</span>
                            <input className='registerInput' type="password" id="password" value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña'/>
                        </label>
                        <button className='button'>Enviar Solicitud</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register