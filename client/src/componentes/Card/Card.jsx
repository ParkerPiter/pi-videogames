import { useState } from "react";
import { useEffect } from "react";

import style from './Card.module.css'

const Card = () =>{

     const [game, setGame] = useState([]);

     useEffect(() => {
     const fetchData = async () => {
         const response = await fetch('http://localhost:3001/videogames');
         const data = await response.json();
         const info_game = data.results.map(item => ({
             name: item.name,
             released: item.released,
             background_image: item.background_image,
             rating: item.rating,
             platforms: item.platforms
         }));
         setGame(info_game);
     };
     fetchData();
     }, []);

    return(
        <div className={style.contenedor}>
            {game.map(games => (
                <div key={games.id} className={style.carta}>
                    <div className={style.ventana}>
                        <div className={style.contenedor_icon}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${style.icon} w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${style.icon} w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${style.icon} w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                            </svg>
                        </div> 
                        <img src={games.background_image} alt="" className={style.image} />
                    </div>
                    <h2 className={style.info}>{games.name}</h2>
                </div>
                ))} 
        </div>
    )

}

export default Card;