// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const axios = require('axios');
const { Op } = require('sequelize');
const { Videogames, Genres } = require('../db');


// Inicio
const app = express();
const PORT = process.env.PORT || 3000;
const router = Router();


//Llenado de la DB con la información de la API
async function getData() {
  const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data.results;

    for (const game of data) {
      const platforms = [];
      for (const platform of game.platforms) {
        platforms.push(platform.platform.name);
      }
      await Videogames.create({
        nombre: game.name,
        descripcion: game.description,
        image: game.background_image,
        plataformas: platforms,
        fechaLanzamiento: game.released,
        rating: game.rating
      });
    }
      for (const game of data) {
        const genreNames = game.genres.map(genre => genre.name);
        await Genres.create({
          //id: game.id,
          nombre: game.name,
          generos: genreNames.join(", "), 
        });
      }
    //La data se importa correctamente a la DB
  } catch (error) {
    console.error(error);
  }
}

getData();

// METODOS HTTP

// GET /api/videogames
// router.get('/videogames', async(req,res)=>{
//   //con la siguiente linea me recupera el registro de la db
//   const videogames = await Videogames.findAll();
//   res.json(videogames);
// });

router.get('/videogames', async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//La siguiente ruta nos trae el juego segun la id
router.get('/videogames/:idVideogame', async (req, res) => {
  try {
    const id = req.params.idVideogame;
    const videogame = await Videogames.findByPk(id);
    if (videogame) {
      res.json(videogame);
    } 
    else {
      res.status(404).json({ error: 'Videogame not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Aqui falta la ruta por nombre
router.get('/videogames/name?=', async (req, res) => {
  const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`;
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ message: 'Missing name query parameter' });
    }
    // Buscar videojuegos en la base de datos
    const dbVideogames = await Videogames.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${name}%`
        }
      },
      limit: 15
    });
    // Buscar videojuegos en la API
    const response = await axios.get(`${url}&seach=${name}`); //se agrega el &search para evitar conflictos en la busqueda
    const apiVideogames = response.data.results.slice(0, 15);
    // Combinar los resultados
    const videogames = [...dbVideogames, ...apiVideogames];
    // Enviar los videojuegos como respuesta
    res.json(videogames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


router.get('/genres', async (req, res) => {
  try {
    // Verificar si hay géneros en la base de datos
    let genres = await Genres.findAll();
    if (genres.length === 0) {
      // Si no hay géneros en la base de datos, obtenerlos de la API
      const response = await axios.get(url);
      const apiGenres = response.data.results;
      // Guardar los géneros en la base de datos
      for (const genre of apiGenres) {
        await Genres.create({ generos: genre.name });
      }
      // Obtener los géneros guardados en la base de datos
      genres = await Genres.findAll();
    }
    // Enviar los géneros como respuesta
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

//POST
//Para crear/agregar juegos a la db
router.post('/create', async (req,res)=>{
  const videogame = await Videogames.create(req.body);
  res.json(videogame);
});


module.exports = router;