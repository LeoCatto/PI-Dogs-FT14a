import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./Cards.css";
import Card from "./Card.js";
import { getDogs } from "../Actions/index.js";
import { getTemperaments } from "../Actions/index.js";
import SearchBar from "./SearchBar";

function Cards({ dogs }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getDogs());
  }, []);
  React.useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const filtDogs=useSelector((state)=>state.filtereddogs)


  const url='https://imagendeperros.com/wp-content/uploads/2016/01/Fotos-de-perritos-con-carita-triste.jpg'

  
  

  const data=useSelector((state)=>state.filtereddogs)
  const [render, setRender]=useState([])

  useEffect(()=>{
    setRender(data)
  },[data])

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(8);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(8);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const nombre= 'no se encontro este perro';

if(Array.isArray(dogs)){
  dogs.map((e)=>{
    if(e.id.length>4){
      e.img=url
    }
  })
}

  const indexOfLastItem = currentPage * itemsPerPage; // 8
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;//0
  let currentItems 
   if(Array.isArray(data)){
     currentItems=render.slice(indexOfFirstItem, indexOfLastItem);//0-8
   }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });


 

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const renderData = (dogs) => {

    return (
      <ul>
        {dogs.length>0?
        dogs.map((breed) => {
            return (
          <div className='cajitas'>
              <Card
              key={breed.id}
              name={breed.name}
              temperaments={breed.arregloT.join(", ")}
              image={breed.img?breed.img:url}
              id={breed.id}
            />  
          </div>
          );
        })
        : <div>
          <img 
          alt='Imagen no encontrada' 
          width='300' 
          height='200' 
          src='https://c.tenor.com/XK37GfbV0g8AAAAj/loading-cargando.gif'>
          </img>
        </div>
        }
      </ul>
    );
  };


  return (
    <div>
     { console.log(filtDogs)}
     {console.log(currentItems)}
      {dogs.length > 0 ? (
        <div className="generalBox">
          <SearchBar />
          <div className='conteinerdog'>
            {/* {filtDogs?renderData(filtDogs):renderData(currentItems)} */}
            {filtDogs?renderData(currentItems):null}
          </div>
          
        </div>
      ) :
        <div>
          <SearchBar />
          <h3 className='falla'>We can't find dogs </h3>
          <div className='loading'>
          <img 
          alt='Imagen no encontrada' 
          width='300' 
          height='200' 
          src='https://media.tenor.com/images/ffb0838d6924a88d142cf523fffe3bc6/tenor.gif'>
          </img>
        </div>
        </div>
        
      }
      <ul className="pageNumbers">
        <li>
          <button
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dogs: state.dogs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: (dogs) => {
      dispatch(getDogs(dogs));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
