import DarkModeButton from '@/components/common/darkModeButton';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const isAdmin = async () =>{
  const ENDPOINT = 'http://localhost:3001/usuario/token';
  const config = { 
    headers:{
      Authorization: 'Bearer '+localStorage.getItem('token')
    }
  };
  const body ={
    'token':localStorage.getItem('token')
  }
  const response = await axios.patch(ENDPOINT, request , token);
  return response.data
}

function TopBar(props) {
  const router = useRouter();
  const admin = true;
  const logOut=()=>{
    localStorage.removeItem('token');
    router.push('/auth/login');
  }
  const menu = ()=>{
    router.push('/admin/menu')
  }
  return (
    <div className='bg-black dark:bg-gray-500 w-full h-auto mb-auto'>
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