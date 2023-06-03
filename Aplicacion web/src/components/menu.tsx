"useclient"
import { useRouter } from "next/navigation"
import DarkModeButton from '@/components/common/darkModeButton';
import ThreeDots from "./common/ThreeDots";
import React, {useEffect} from "react";
import TopBar from "./common/topBar";

function Menu() {
    const router=useRouter();
    let token ='algo';
    const token1={'rol':'admin'}
    
    const toReports = () => {
        router.push('/reports');
    }

    const toUsers = () => {
        if(token1.rol === 'admin'){
            router.push('/admin/users');
        };
    }

    const toRequest = () => {
        if(token1.rol === 'admin'){
            router.push('/admin/request');
        };
    }

    const toFC = () => {
        if(token1.rol==='admin'){
            router.push('/admin/fc');
        };
    }

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/')
    }

    useEffect(()=>{
        token = localStorage.getItem('token');
        /* if(token === null){
            router.push('/');
        } 
        
        */
    },[])

    return (
        <div className="dark:bg-black">
            {
                token ?
                (
                    <div className="mx-auto min-h-screen text-center">
                        <div className="grid items-center grid-rows-6 min-h-screen">
                            <TopBar message='Menu'/>
                            <div className="flex flex-col row-span-4 max-w-md mx-auto bg-gray-150 shadow-slate-600 rounded-xl shadow-md overflow-hidden md:w-5/6 md:max-w-2xl dark:bg-gray-500 dark:shadow-sky-400 dark:shadow-lg">
                                <div className="grid grid-cols-2 md:flex">
                                    <div className="md:shrink-0">
                                        <img src="/images/minera.jpg" className="h-full w-full object-cover md:w-64"/>
                                    </div>
                                    <div className="grid grid-rows-4 items-center mx-auto p-8"> 
                                        <button className="button" onClick={toReports}>Reportes</button>
                                        <button className="button" onClick={toUsers}>Usuarios</button>
                                        <button className="button" onClick={toRequest}>Solicitudes de acceso</button>
                                        <button className="button" onClick={toFC}>Factor de carga</button>
                                    </div>
                                </div>
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