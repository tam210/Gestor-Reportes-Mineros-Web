import { useRouter } from 'next/navigation';
import DarkModeButton from '@/components/common/darkModeButton';
import React, { useState, useEffect } from 'react';

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validUser, setValidUser] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) =>{
    event.preventDefault();
    await checkUser(email);
    await checkPassword(email,password);
  };

  const checkUser = (email)=>{
    //agregar validacion del email
  };

  const checkPassword = (email,password)=>{//modificar validacion de password
    if(password==="t123"){
      setValidPassword(false);
      setValidUser(false);
    }else{
      setValidPassword(true);
      setValidUser(true);
    }
  };

  useEffect(()=>{
    console.log('Email:',email);
    console.log('Password',password);
    console.log("Valid Email:",validEmail);
    console.log("Valid Password",validPassword);
    console.log("Valid User",validUser);
    if (validUser){
      //router.push('/menu');
    }
  },[validEmail,validPassword,validUser]);
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
            <form onSubmit={handleLogin}>
              <label className='block'>
                <span className='block text-sm font-medium text-black dark:text-white'>Correo</span>
                <input type="email" id="email" value={email} onChange={handleEmailChange} placeholder='Ingrese su correo'
                className='loginInput peer'/>
                <p className='mt-2 invisible peer-invalid:visible text-red-600 text-sm'>Ingrese un correo valido</p>
                {!validEmail && <p className='error-message mt-2 invisible text-red-600 text-sm'>El correo no existe</p>}
              </label>
              <label className='block'>
                <span className='block text-sm font-medium text-black dark:text-white'>Contraseña</span>
                <input type="password" id='password' value={password} onChange={handlePasswordChange} placeholder='Ingrese su contraseña'
                className='loginInput'/>
                {!validPassword && <p className='error-message mt-2 text-red-600 text-sm'>La contraseña es incorrecta</p>}
              </label>
              <div className='mt-5 grid lg:grid-cols-2'>
                <button className='button'
                type='submit'>Iniciar sesión</button>
                <button className='button'
                type='submit'>Solicitar acceso</button>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login