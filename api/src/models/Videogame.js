const { DataTypes } = require('sequelize');
module.exports = (sequelize)=>{
  const Videogames = sequelize.define('videogames',{
      id:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      nombre:DataTypes.STRING,
      image:DataTypes.STRING,
      descripcion:DataTypes.STRING,
      plataformas:DataTypes.ARRAY(DataTypes.STRING),
      fechaLanzamiento:DataTypes.DATEONLY,
      rating:DataTypes.FLOAT,
  });
  return Videogames;
}