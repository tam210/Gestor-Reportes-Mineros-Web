"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
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
      router.push('/menu');
    }
  },[validEmail,validPassword,validUser]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <img src="/images/logo.png" alt="Logo de la aplicación web" />
        <h1>Iniciar Sesión</h1>
        <form onSubmit={handleLogin}>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>Correo</span>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required placeholder='Ingrese su correo'
            className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm 
            placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500'/>
            <p className='error-message mt-2 text-red-600 text-sm'>El correo no existe</p>
            {!validEmail && <p className='mt-2 invisible peer-invalid:visible text-red-600 text-sm'>Ingrese un correo valido</p>}
          </label>
          <label className='block'>
            <span className='block text-sm font-medium text-slate-700'>Contraseña</span>
            <input type="password" id='password' value={password} onChange={handlePasswordChange} required placeholder='Ingrese su contraseña'
            className='mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm 
            placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500 focus:invalid:ring-red-500'/>
            {!validPassword && <p className='error-message mt-2 text-red-600 text-sm'>La contraseña es incorrecta</p>}
          </label>
          <div className='mt-5 grid lg:grid-cols-2'>
            <button className='m-2 px-2 py-2 bg-sky-400 hover:bg-sky-600 active:bg-sky-800 border border-slate-900 rounded-md'
            type='submit'>Iniciar sesión</button>
            <button className='m-2 px-2 py-2 bg-sky-400 hover:bg-sky-600 active:bg-sky-800 border border-slate-900 rounded-md'
            type='submit'>Solicitar acceso</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Page