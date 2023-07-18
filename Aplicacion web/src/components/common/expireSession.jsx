import { useRouter } from 'next/navigation';


function ExpireSession(props) {
  const router = useRouter();
  const logOut=()=>{
    localStorage.removeItem('token');
    router.push('/auth/login');
  }
  return (
    <div className='z-10 top-0 left-0 right-0 bottom-0 flex absolute items-center justify-center place'>
        <div className='bg-slate-300 border border-slate-500 shadow-gray-500 p-4 rounded shadow-lg dark:bg-gray-700 dark:border-slate-500 dark:text-white flex flex-col'>
            <h2 className='text-lg font-bold mx-auto'>Sesión expirada</h2>
                <p>La sesión actual ha terminado</p>
                <button className='buttonPop-up my-1 mx-auto' onClick={logOut}>Aceptar</button>
        </div>
    </div>
  )
}

export default ExpireSession