import style from './Home.module.css';

import { Link } from 'react-router-dom';

import Searchbar from '../../componentes/Seachbar/Searchbar';
import Card from '../../componentes/Card/Card';

const Home = () =>{
    return(
        <main>
            <header className={style.head}>
                <div className={style.titulos}>
                    <h1 className={style.titulo} > <span>Gaming</span> <span>Zone</span></h1>
                    <h1 className={style.titulo2} > <span>Gaming</span> <span>Zone</span></h1>
                    <Link to='/videogames'>
                        <button className={style.boton}>About</button>
                    </Link>
                </div>
                
                <Searchbar></Searchbar>
            </header>
            <h3 className={style.sub}>Choose your favorite game</h3>
            <br />
            <div className={style.container}>
                <p className={style.subt}>Game Available</p>
                <p className={style.linea}></p>
                <Card></Card>
            </div>
            
        </main>
    )
}
export default Home;