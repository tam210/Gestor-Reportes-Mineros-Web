
function DarkModeButton() {
    const handleClick = ()=>{
        document.documentElement.classList.toggle('dark')
        const configuracion = JSON.parse(localStorage.getItem('configuracion'));
        if(document.documentElement.classList.contains('dark')){
            if(configuracion.tema === 'white'){
                configuracion.tema = 'dark'
            }
        }else{
            if(configuracion.tema === 'dark'){
                configuracion.tema = 'white'
            }
        }
        localStorage.setItem('configuracion',JSON.stringify(configuracion))
    }
    return (
        <button onClick={handleClick} className='button'>Modo oscuro</button>
    )
}

export default DarkModeButton