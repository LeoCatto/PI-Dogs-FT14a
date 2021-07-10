const axios = require('axios');
const{ Temperament } = require('../../db.js');
const { API_KEY } = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

async function getTemperaments (req,res){
    let url = `${URL}`
    let resp=await axios.get(url);
    let razasAPI=resp.data;

    // esto debe ser un set!
    let temperamentos=[]

    razasAPI.forEach(raza=>{
        let temp=raza.temperament;
        if(temp && typeof temp!==undefined){
            let temps=temp.split(',');//quitar espacio de cada elemento
            temps.forEach(t=>temperamentos.push(t))
        }
        
    })

    temperamentos.forEach(async t=>{
        await Temperament.findOrCreate({where:{name:t}})
    })

    res.json(temperamentos)



    
        
    
}

module.exports = {
    getTemperaments
}