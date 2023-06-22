const { DataTypes } = require('sequelize');
module.exports = (sequelize)=>{
  const Genres = sequelize.define('Genres',{
      id:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      nombre:DataTypes.STRING,
      generos:DataTypes.STRING,
  });
  return Genres;
}