
function sacarData(dog){
    const height = dog.height.metric || dog.height;
    const weight = dog.weight.metric || dog.weight;
    const years = dog.life_span || dog.years;
    const { id, name } = dog
    let arregloT=[]   //arregloT me rompio todo el front
    if(dog.temperament){
        let temp=dog.temperament
        let temps=temp.split(',');
        temps.forEach(t=>arregloT.push(t.trim()))//le quito espacio inicial y final
    }else{  
        if(dog.temperaments)
        dog.temperaments.forEach(t=>arregloT.push(t.name))
    }
      
    const img = 'https://cdn2.thedogapi.com/images/' + dog.reference_image_id + '.jpg' ||
    'https://imagendeperros.com/wp-content/uploads/2016/01/Fotos-de-perritos-con-carita-triste.jpg'

    return {id,name,height,weight,years,arregloT,img}
}

module.exports={
sacarData
}