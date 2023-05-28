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
    const userExists = await checkUser(email);
    const isPasswordCorrect = await checkPassword(email,password);
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
    <div>
      <img src="/images/logo.png" alt="Logo de la aplicación web" />
        <h1>Inicia Sesión</h1>
        <div>
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} required/>
          {!validEmail && <p className='error-message'>El correo no existe</p>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id='password' value={password} onChange={handlePasswordChange} required/>
          {!validPassword && <p className='error-message'>La contraseña es incorrecta</p>}
        </div>
        <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}

export default Page