const axios = require("axios").default;
const { API_KEY } = process.env;
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../../db.js");
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

// Obtener un listado de las primeras 8 razas de perro que contengan la palabra ingresada
// como query parameter Si no existe ninguna raza de perro mostrar un mensaje adecuado/

async function getDogs(_req, res) {
  //CREO Y DEVUELVO LOS DOGS POR PRIMERA VEZ
  const { name } = req.query;
    let url;
    let razasDB;

    if (!name) {
        url = `${URL}`
        razasDB = await Dog.findAll({
            include:{
                model:Temperament
            }
        });
    } else {
        url = `https://api.thedogapi.com/v1/breeds/search?api_key=${process.env.API_KEY}&name=${name}`
        //Debo incluir el/los temperamentos de la raza!!
        razasDB = await Dog.findAll({
            where: {name: { [Op.like]: `%${name}%`}},
            include:{
                model:Temperament
            }
        });
    }

    let resp = await axios.get(url)
    let razasAPI = resp.data.splice(0, 8);
    let allRazas = razasDB.concat(razasAPI);
    let resultadoFinal = [];

    allRazas.forEach(raza => {
        const height = raza.height.metric || raza.height;
        const weight = raza.weight.metric || raza.weight;
        const years = raza.life_span || raza.years;
        const { id, name } = raza
        let temperament; 
        if(raza.temperament){
            temperament=raza.temperament.replace(/ /g, '');
        }else{
            let temps=''
            raza.temperaments.forEach(temp=>temps+=`${temp.name},`)
            temperament=temps;
        }
        
        const img = raza.image ? raza.image.url : 'No especificado'
        resultadoFinal.push({ id, name, height, weight, years, temperament, img })
    })

    if (name && resultadoFinal.length == 0) {
        return res.status(404).json({
            message: `No se encontraron resultados para la búsqueda '${name}'`
        })
    }
    //sustituir por resultadoFinal
    return res.json(resultadoFinal)
}

// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados/
async function getDogParam(req, res) {
    const  idFind  = req.params.id;
    let razaFound;

    if (idFind / 1) {
        let url = `${URL}`
        const resp =await axios.get(url);
        let raza=resp.data.find(raza => raza.id == idFind)
        const height = raza.height.metric
        const weight = raza.weight.metric
        const years = raza.life_span
        const { id, name } = raza
        const temperament = raza.temperament
        const img =raza.image.url;
        razaFound={id,name,height,weight,years,temperament,img}
    }else{
        razaFound=await Dog.findByPk(idFind)
    }
    return res.json(razaFound)
}


 async function postDog(req, res) {
    const {name,height,weight,years,temperament}=req.body;
    const raza=await Dog.create({name,height,weight,years})

    temperament.forEach(async temp=>{
        const temperamento=await Temperament.findOrCreate({
            where:{name:temp}
        })
        await raza.addTemperament(temperamento[0])        
    })
    
    res.json({
        ok:true
    })
    
}

module.exports = {
  getDogs,
  getDogParam,
  postDog
};
