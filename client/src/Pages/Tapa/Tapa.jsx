import style from './Tapa.module.css'
import {Link} from 'react-router-dom'

const Tapa = ()=>{

    return(
        <div className={style.contenedor}>
            <h3 className={style.hi}>Welcome to</h3>
            <div className={style.titulos}>
                <h1 className={style.titulo2} >Gaming Zone</h1>
                <h1 className={style.titulo} >Gaming Zone</h1>
            </div>
            <Link to='/videogames'>
                <button className={style.go}>GO</button>
            </Link>
        </div>
    )
}

export default Tapa;