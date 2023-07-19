import React, { useState } from 'react'
import TopBar from './common/topBar';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DarkModeButton from './common/darkModeButton';

function Register() {
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [lastName,setLastName]=useState('');
    const [userType,setUserType]=useState('Usuario');
    const [password,setPassword]=useState('');
    const [passwordConfirm,setPasswordConfirm]=useState('');
    const [validPassword,setValidPassword]=useState(true);
    const [validEmail,setValidEmail]=useState(true);
    const [isSendRequest,setIsSendRequest]=useState(false)
    const router = useRouter()

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
    const handlePasswordConfirm=(event)=>{
        setPasswordConfirm(event.target.value);
    }

    const sendRequest = async(e)=>{
        e.preventDefault();
        if(password===passwordConfirm){
            setValidPassword(true);
            const user = {email: email,
                password: password,
                name: name,
                lastName: lastName,
                userType: userType};
            const ENDPOINT = 'http://localhost:3001/auth/register';//agregar la direccion de la api
            const response = await axios.post(ENDPOINT,user);
            if(!response.data.validEmail){
                setValidEmail(false)
            }else{
                setValidEmail(true)
                setIsSendRequest(true)
            }
        }else{
            setValidPassword(false)
        }     
    }

    const toLogin= ()=>{
        router.push('/auth/login')
    }

    return (
        <div className='flex flex-col h-screen w-full items-center dark:bg-black'>
            <div className='flex flex-row-reverse w-full'>
                <DarkModeButton/>
            </div>
            <div className='flex relative flex-col mt-4 items-center sm:mt-10'>
                <div className='max-w-[150px] md:max-w-[250px] dark:invert'>
                    <img src="/images/User.png" className='h-full w-auto'/>
                </div>
                <form className='flex flex-col sm:flex-row mt-2 sm:mt-8' onSubmit={sendRequest}>
                    <div className='sm:mx-2'>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Correo</span>
                            <input className='registerInput peer' type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Ingrese su correo' minLength={3} required/>
                            <p className=' invisible peer-invalid:visible text-red-600 text-sm'>Ingrese un correo valido</p>
                        </label>
                        <label className='block my-1'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Nombre</span>
                            <input className='registerInput' type="name" id="name" value={name} onChange={handleNameChange} minLength={2} required placeholder='Ingrese su nombre'/>
                        </label>
                        <label className='block my-4'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Apellido</span>
                            <input className='registerInput' type="lastName" id="lastName" value={lastName} onChange={handleLastNameChange} minLength={2} required placeholder='Ingrese su apellido'/>
                        </label>
                    </div>
                    <div className='sm:mx-2'>
                        <label className='block my-2'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Tipo de usuario</span>
                            <select className='w-full h-8 px-3 my-1' onChange={handleUserTypeChange} value={userType}>
                                <option value="Usuario">Usuario</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </label>
                        <label className='block mt-5 mb-4'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Contraseña</span>
                            <input className='registerInput' type="password" id="password" value={password} onChange={handlePasswordChange} required placeholder='Ingrese su contraseña'/>
                        </label>
                        <label className='block mt-5'>
                            <span className='block text-sm font-medium text-black dark:text-white'>Confirmar contraseña</span>
                            <input className='registerInput' type="password" id="passwordConfirm" value={passwordConfirm} onChange={handlePasswordConfirm} required placeholder='Ingrese su contraseña'/>
                            {!validPassword && <p className='error-message mt-2 text-red-600 text-sm'>Las contraseñas no coinciden</p>}{!validEmail && <p className='error-message mt-2 text-red-600 text-sm'>El correo ingresado ya existe</p>}
                        </label>
                        <button className='button' type='submit'>Enviar Solicitud</button>
                    </div>
                </form>
                {isSendRequest && <div className="absolute z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className='bg-slate-300 border border-slate-500 shadow-gray-500 p-4 rounded shadow-lg dark:bg-gray-700 dark:border-slate-500 dark:text-white'>
                    <h2 className='text-lg font-bold'>Petición enviada</h2>
                    <p>Tu solicitud de acceso se ha enviado, por favor espera la aprobación de un administrador</p>
                    <button className='buttonPop-up my-1' onClick={toLogin}>Aceptar</button>
                  </div>
              </div>}
            </div>
        </div>
    )
}

export default Register