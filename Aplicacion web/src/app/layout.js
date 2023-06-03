"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  useEffect(()=>{
    if(localStorage.getItem('configuracion')===null){
      const configuracion = {
        tema: 'white'
      };
      localStorage.setItem('configuracion',JSON.stringify(configuracion));
    }else{
      const configuracion = JSON.parse(localStorage.getItem('configuracion'));
      if(document.documentElement.classList.contains('dark')){
        if(configuracion.tema === 'white'){
          document.documentElement.classList.toggle('dark')
        }
      }else{
        if(configuracion.tema === 'dark'){
          document.documentElement.classList.toggle('dark')
        }
      }
    }
  },[])
  return (
    <html lang="en">
      <body className={inter.className}>
        <div >
          {children}
        </div>
      </body>
    </html>
  )
}
