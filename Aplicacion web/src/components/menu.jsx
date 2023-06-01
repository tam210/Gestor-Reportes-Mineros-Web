import { useRouter } from "next/navigation"
import DarkModeButton from '@/components/common/darkModeButton';
import ThreeDots from "./common/ThreeDots";


function Menu() {
    const router=useRouter();
    const token ={'id':'algo','rol':'admin'};
    //const token = null;
    if(token === null){
        router.push('/');
    }
    
    const toReports = () => {
        router.push('/reports');
    }

    const toUsers = () => {
        if(token.rol === 'admin'){
            router.push('/admin/users');
        };
    }

    const toRequest = () => {
        if(token.rol === 'admin'){
            router.push('/admin/request');
        };
    }

    const toFC = () => {
        if(token.rol==='admin'){
            router.push('/admin/fc');
        };
    }

    const logout = () => {
        localStorage.removeItem('token');
        router.push('/')
    }

    return (
        <div>
            {
                token ?
                (
                    <div className="dark:bg-black container mx-auto min-h-screen text-center">
                        <div className="">
                            <DarkModeButton/>
                            <button className="button" onClick={toReports}>Reportes</button>
                            <button className="button" onClick={toUsers}>Usuarios</button>
                            <button className="button" onClick={toRequest}>Solicitudes de acceso</button>
                            <button className="button" onClick={toFC}>Factor de carga</button>
                        </div>
                    </div>
                ) : (
                    <ThreeDots/>
                )
            }
        </div>
    )
}

export default Menu