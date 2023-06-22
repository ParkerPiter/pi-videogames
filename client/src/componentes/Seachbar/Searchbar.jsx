import { useState } from 'react';
import style from './Searchbar.module.css';

const Searchbar = ()=>{

    const [showOptions, setShowOptions] = useState(false);
    const options = ['A-Z', '2000-2016', '2016-2023'];
    

    const handleSortClick = () => {
        setShowOptions(!showOptions);
    };
    

    return(
        <div className={style.contenedor}>
            <div className={style.search}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${style.icon} w-6 h-6`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input className={style.barra}  type='search' />
                <button className={style.boton}>Buscar</button>
            </div>
            <div className={style.container}>
                    <button className={style.opciones}>Crear juego</button>
                    <button className={style.opciones}>Filtrar por genero</button>
                    <button className={style.opciones} onClick={handleSortClick}>Ordenar por:</button>
                    {showOptions && (
                        <ul className={style.options_list}>
                            {options.map((option) => (
                                <p key={option} className={style.option}>{option}</p>
                            ))}
                        </ul>
                    )}
            </div>
        </div>
    )
}

export default Searchbar;