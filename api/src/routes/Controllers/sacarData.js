function sacarData(dog){
    const height = dog.height.metric || dog.height;
    const weight = dog.weight.metric || dog.weight;
    const years = dog.life_span || dog.years;
    const { id, name } = dog
    let arregloT=[]
    if(dog.arregloT){
        let temp=dog.arregloT
        let temps=temp.split(',');
        temps.forEach(t=>arregloT.push(t.trim()))//le quito espacio inicial y final
    }else{  
        if(dog.temperaments)
        dog.temperaments.forEach(t=>arregloT.push(t.name))
    }        
    const img = dog.image ? dog.image.url : 'No especificado'

    return {id,name,height,weight,years,arregloT,img}
}

module.exports={
sacarData
}