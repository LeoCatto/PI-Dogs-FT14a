const axios = require("axios").default;
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../../db.js");
const { sacarData } = require('./sacarData.js')

// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

// Obtener un listado de las primeras 8 razas de perro que contengan la palabra ingresada
// como query parameter Si no existe ninguna raza de perro mostrar un mensaje adecuado/

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
const URL2 = `https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}`

async function getDogs(req, res ) {
  //CREO Y DEVUELVO LOS DOGS POR PRIMERA VEZ
  const {name} = req.query;
  let todo;
  let razasDB;

  if (!name) {
    todo = `${URL}`;
    razasDB = await Dog.findAll({ include: Temperament });
  } else {
    todo = `${URL2}&name=${name}`;
    razasDB = await Dog.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      include: Temperament,
    });
  }

  let resp = await axios.get(todo);
  let razasAPI = resp.data.splice(0, 8);
  let allRazas = razasDB.concat(razasAPI);
  let resultadoFinal = [];

  allRazas.forEach((raza) => {
    resultadoFinal.push(sacarData(raza));
  });

  if (name && resultadoFinal.length == 0) {
    return res.status(404).json({
      message: `No se encontraron resultados para la búsqueda '${name}'`,
    });
  }
  return res.json(resultadoFinal);
}

// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados/
async function getDogParam(req, res) {
  let idE = req.params.id;
  let razaE;

  if (idE / 1) {
    let todo = `${URL}`;
    const resp = await axios.get(todo);
    razaE = resp.data.find((raza) => raza.id == idE);
  } else {
    razaE = await Dog.findByPk(idE, { include: Temperament });
  }

  if (razaE) {
    const razaDetail = sacarData(razaE);
    return res.json(razaDetail);
  } else {
    return res.status(400).json({
      message: `No hay razas con id: ${idE}`,
    });
  }
}

async function postDog(req, res) {
  const { name, height, weight, years, temperament } = req.body;
  const raza = await Dog.create({ name, height, weight, years });

  temperament.forEach(async (temp) => {
    const temperamento = await Temperament.findOrCreate({
      where: { name: temp },
    });
    await raza.addTemperament(temperamento[0]);
  });

  res.json({
    ok: true,
  });
}

module.exports = {
  getDogs,
  getDogParam,
  postDog,
};
