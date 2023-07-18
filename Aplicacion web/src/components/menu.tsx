"useclient"
import { useRouter } from "next/navigation"
import DarkModeButton from '@/components/common/darkModeButton';
import ThreeDots from "./common/ThreeDots";
import React, {useEffect, useState} from "react";
import TopBar from "./common/topBar";
import axios from "axios";

const validate = async ()=>{
    const ENDPOINT=''
    const body = {
        'token':localStorage.getItem('token')
    }
    const response = axios
    
}

function Menu() {
    const router=useRouter();
    let token = localStorage.getItem('token');
    const [validUser,setValidUser]= useState(true);
    
    const toReports = () => {
        router.push('/reports');
    }

    const toUsers = () => {
        router.push('/admin/users');
    }

    const toRequest = () => {
        router.push('/admin/request');
    }

    const toFC = () => {
        router.push('/admin/fc');
    }

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/')
    }

    const validToken = async()=>{
        token = localStorage.getItem('token');
        if(token === null){
            router.push('/auth/login');
        } 
        
    }

    useEffect(()=>{
        
    },[])

    return (
        <div className="dark:bg-black">
            {
                token ?
                (
                    <div className="flex h-screen min-w-[350px] min-h-[650px] flex-col items-center">
                        <div className="z-10 w-full max-w-screen-3xl items-center justify-between font-mono text-sm lg:flex">
                            <TopBar message='Menu'/>
                        </div>
                        <div className="sm:mt-36 flex flex-col text-center sm:flex-row lg:text-left">
                            <div className="md:shrink-0 px-10 max-w-[400px] md:max-w-[470px]">
                                <img src="/images/camion.png" className="h-full w-auto object-cover dark:invert"/>
                            </div>
                            <div className="lg:w-[100px] xl:w-[200px]"></div>
                            <div className="grid grid-rows-4 items-center mx-auto p-4 md:p-12"> 
                                <button className="button" onClick={toReports}>Reportes</button>
                                <button className="button" onClick={toUsers}>Usuarios</button>
                                <button className="button" onClick={toRequest}>Solicitudes de acceso</button>
                                <button className="button" onClick={toFC}>Factor de carga</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container grid mx-auto min-h-screen items-center place-items-center">
                        <ThreeDots/>
                    </div> 
                )
            }
        </div>
    )
}

export default Menu