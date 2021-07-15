const axios = require("axios");
const { Temperament } = require("../../db.js");
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

async function getTemperaments(req, res) {
  let todo = `${URL}`;
  let resp = await axios.get(todo);
  let razasAPI = resp.data;

  let temperamentos = [];

  razasAPI.forEach((raza) => {
    let temp = raza.temperament;
    if (temp && typeof temp !== undefined) {
      let temps = temp.split(","); 
      temps.forEach((t) => temperamentos.push(t.trim()));
    }
  });

  
  temperamentos.forEach(async (t) => {
        await Temperament.findOrCreate({ where: { name: t } });
    });

    let tempFilt = await Temperament.findAll({ attributes:["name"] })

  res.json(tempFilt);
}

module.exports = {
  getTemperaments
};
