import { useRouter } from 'next/navigation';
import DarkModeButton from '@/components/common/darkModeButton';
import React, { useState } from 'react';
import axios from 'axios';
import { LoginResponse, UserLoginResponse } from '@/config/interfaces';

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) =>{
    const ENDPOINT = 'http://localhost:3001/auth/login';//agregar la direccion de la api
    const data = {
      email: email,
      password: password
    };
    const response = await axios.post(ENDPOINT,data);
    const dataResponse: LoginResponse = response.data;
    const userResponse: UserLoginResponse = dataResponse.user;

    if(userResponse.validEmail === true){
      setValidEmail(true);

      if(userResponse.validPassword === true){
        setValidPassword(true);

        const {token} = dataResponse;
        localStorage.setItem('token',token);
        if(userResponse.userType === 0){
          router.push('/admin/menu')
        }
        if(userResponse.userType === 1){
          router.push('/reports')
        }

      }else{
        setValidPassword(false);
      }

    }else{
      setValidEmail(false);
    }
  };

  const handleAccessRequest = ()=>{
    router.push('/auth/register')
  }

  return (
    <div className="container mx-auto min-h-screen text-center">
        <div className='grid items-center grid-rows-6 min-h-screen'>
          <div className='flex flex-row-reverse row-span-1'>
            <DarkModeButton/>
          </div>       
          <div className='flex flex-col items-center bg-gradient-radial row-span-4 from-sky-600 via-white rounded-full dark:via-black'>
            <div className='flex flex-col'>
              <img src="/images/logo.png" className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]" alt="Logo de la aplicación web" />
              <h1 className='block text-center dark:text-white'>Iniciar Sesión</h1>
            </div>
            <div>
              <label className='block'>
                <span className='block text-sm font-medium text-black dark:text-white'>Correo</span>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Ingrese su correo'
                className='loginInput peer'/>
                {!validEmail && <p className='error-message text-red-600 text-sm'>El correo no existe</p>}
                <p className='mt-2 invisible peer-invalid:visible text-red-600 text-sm'>Ingrese un correo valido</p>
              </label>
              <label className='block'>
                <span className='block text-sm font-medium text-black dark:text-white'>Contraseña</span>
                <input type="password" id='password' value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña'
                className='loginInput'/>
                {!validPassword && <p className='error-message mt-2 text-red-600 text-sm'>La contraseña es incorrecta</p>}
              </label>
              <div className='mt-5 grid lg:grid-cols-2'>
                <button className='button'
                onClick={handleLogin}>Iniciar sesión</button>
                <button className='button'
                onClick={handleAccessRequest}>Solicitar acceso</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Login