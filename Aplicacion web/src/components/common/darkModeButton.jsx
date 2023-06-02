
function DarkModeButton() {
    const handleClick = ()=>{
        document.documentElement.classList.toggle('dark')
    }
    return (
        <button onClick={handleClick} className='button'>Modo oscuro</button>
    )
}

export default DarkModeButton