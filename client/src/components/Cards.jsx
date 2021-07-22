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
          <div>
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

// let dog = useSelector((state) => state.dogs);
// let temperament = useSelector((state) => state.temperaments);
// const [order, setOrder] = useState(dog);
// const [input, setInput] = useState("");
// const [inputTemp, setInputTemp] = useState("");
// const [pageNumber, setPageNumber] = useState(0);
// const dogsPerPage = 8;
// const pagesVisited = pageNumber * dogsPerPage;
// const [fDogs, setFDogs] = useState([]);
// const [selectedTemp, setSelectedTemp] = useState([]);

// useEffect(() => {
//   setFDogs([...dog]);
// }, [dog]);

// const handleChangeTemp = (e) => {
//   e.preventDefault();
//   setSelectedTemp(e.target.value);
//   filter(e.target.value);
// };

// function filter(w) {
//   let filtered = dog.filter((d) => {
//     if (d.temperaments) {
//       let names = d.temperaments.map((t) => t.name);
//       return names.includes(w);
//     } else if (d.temperament !== undefined) {
//       return d.temperament.includes(w);
//     }
//   });
//   setFDogs([...filtered]);
// }

// /*    ------------------------------
//           Breed filter */
// const handleChange = (e) => {
//   e.preventDefault();
//   setInput(e.target.value);
//   control(e.target.value);
// };

// function control(w) {
//   if (w.length !== 0) {
//     let filtered = dog.filter((d) => {
//       return d.name.toLowerCase().includes(w.toLowerCase());
//     });
//     setFDogs([...filtered]);
//   } else {
//     setFDogs([...dog]);
//   }
// }

// /*    ------------------------------
//          my dogs vs api dogs*/

// function myDogs() {
//   let filtered = [];
//   filtered = dog.filter((d) => typeof d.id !== "number");
//   setFDogs([...filtered]);
// }

// function showAll() {
//   setFDogs([...dog]);
// }

// function apiDogs() {
//   let filtered = [];
//   filtered = dog.filter((d) => typeof d.id === "number");
//   setFDogs([...filtered]);
// }

// /*    ------------------------------
//         metric control */

// function manageWeight(a, b) {
//   if (b) {
//     if (b.weight.metric) {
//       return b.weight.metric;
//     } else {
//       return b.weight;
//     }
//   } else {
//     if (a.weight.metric) {
//       return a.weight.metric;
//     } else {
//       return a.weight;
//     }
//   }
// }

// /*    ------------------------------
//           Pagination and dog display*/
// const displayDogs = fDogs
//   .slice(pagesVisited, pagesVisited + dogsPerPage)
//   .map((d) => (
//     <Card
//       key={d.id}
//       name={d.name}
//       temperaments={
//         typeof d.temperament == "string" ? d.temperament : d.temperaments
//       }
//       image={d.img}
//       id={d.id}
//     />
//   ));
// const pageCount = Math.ceil(dog.length / dogsPerPage);
// const changePage = ({ selected }) => {
//   setPageNumber(selected);
// };

// return (
//   <div className="allDivs">
//     <div id="myVsApi">
//       <button className="sorting" onClick={myDogs}>
//         Show my dogs
//       </button>
//       <button className="sorting" onClick={apiDogs}>
//         Show api dogs
//       </button>
//       <button className="sorting" onClick={showAll}>
//         Show all dogs
//       </button>
//     </div>

//     <form id="searchbar" action="">
//       <input
//         className="barra"
//         type="search"
//         value={input}
//         onChange={handleChange}
//       />
//       <i class="fa fa-search"></i>
//     </form>

//     <div className="all">
//       <div>
//         <select
//           className="temperamentsfil"
//           name="temperaments"
//           id="temperaments"
//           onChange={handleChangeTemp}
//         >
//           <option className="labels">Select temperaments</option>
//           {temperament.map((x) => (
//             <option value={x.name} key={x.id}>
//               {x.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {fDogs.length > 0 && (
//         <div className="cards" timeout={5000}>
//           {" "}
//           {displayDogs}
//         </div>
//       )}

//       {/*  ------------------------------
//           Sorting alphabetically  */}
//       <div id="buttons">
//         <span id="sortby"> Sort by</span>

//         <button
//           className="sorting"
//           onClick={() => {
//             fDogs.sort((a, b) => a.name.localeCompare(b.name));
//             setOrder([...fDogs]);
//           }}
//         >
//           A-Z
//         </button>
//         <button
//           className="sorting"
//           onClick={() => {
//             fDogs.sort((a, b) => a.name.localeCompare(b.name)).reverse();
//             setOrder([...fDogs]);
//           }}
//         >
//           Z-A
//         </button>

//         {/*  ------------------------------
//           Sorting by weight  */}
//         <button
//           className="sorting"
//           onClick={() => {
//             fDogs.sort(
//               (a, b) =>
//                 parseFloat(manageWeight(b)) - parseFloat(manageWeight(a))
//             );
//             setOrder([...fDogs]);
//           }}
//         >
//           Descending weight
//         </button>
//         <button
//           className="sorting"
//           onClick={() => {
//             fDogs.sort(
//               (a, b) =>
//                 parseFloat(manageWeight(a)) - parseFloat(manageWeight(b))
//             );
//             setOrder([...fDogs]);
//           }}
//         >
//           Ascending weight
//         </button>
//       </div>
//     </div>

//     {/*  ------------------------------
//               CSS pagination  */}

//     <ReactPaginate
//       previousLabel={"Previous"}
//       nextLabel={"Next"}
//       pageCount={pageCount}
//       onPageChange={changePage}
//       containerClassName={"paginationButtons"}
//       previousLinkClassName={"previousLink"}
//       nextLinkClassName={"nextLink"}
//       disabledClassName={"paginationDisabled"}
//       activeClassName={"paginationActive"}
//     />
//   </div>
// );
// }
