"use client"; // This is a client component 👈🏽
import React, { useState } from 'react';

function page() {

    const [text, setText] = useState('');

    const handleChange = (event) => {
      setText(event.target.value);
    };
  
    return (
    <div>
        <h1>Inicia Sesión</h1>
        <input type="text" value={text} onChange={handleChange} />
        <p>Texto ingresado: {text}</p>
    </div>
  )
}

export default page