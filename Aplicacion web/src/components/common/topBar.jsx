import DarkModeButton from '@/components/common/darkModeButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect, useState } from 'react';

const validate = async ()=>{
  const ENDPOINT='http://localhost:3001/auth/rol'
  const body = {
      'token':localStorage.getItem('token')
  }
  const response = await axios.post(ENDPOINT,body)
  return response.data.tipo_usuario ==="Administrador"
}

function TopBar(props) {
  const router = useRouter();
  const [admin,setAdmin] = useState(false);
  const logOut=()=>{
    localStorage.removeItem('token');
    router.push('/auth/login');
  }
  const menu = ()=>{
    router.push('/admin/menu')
  }
  const validAdmin = async ()=>{
    const valid = await validate()
    setAdmin(valid)
  }
  useEffect(()=>{
    validAdmin()
  },[])
  return (
    <div className='bg-black dark:bg-gray-500 w-full h-full'>
        <div className='grid grid-cols-2'>
            <div className='flex px-4'>
                <p className='text-white place-self-center'>{props.message}</p>
            </div>
            <div className='flex flex-row-reverse '>
                <button onClick={logOut} className='button'>Cerrar Sesión</button>
                <DarkModeButton/>
                {
                  admin ?
                  (<button className='button' onClick={menu}>Menu</button>):null
                }
            </div> 
        </div>
    </div>
  )
}

export default TopBar