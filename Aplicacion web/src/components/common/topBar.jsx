import DarkModeButton from '@/components/common/darkModeButton';
import { useRouter } from 'next/navigation';

function TopBar(props) {
  const router = useRouter();
  const logOut=()=>{
    localStorage.removeItem('token');
    router.push('/');
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
            </div> 
        </div>
    </div>
  )
}

export default TopBar