import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import "./CreateDog.css";
import NavBar from "./NavBar";
import { getTemperaments } from "../Actions/index";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "You must type a name";
  } else {
    errors.name = "";
  }
  if (!input.weight) {
    errors.weight = "You must type a weight range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.weight)) {
    errors.weight = "Weight must be a range. Example: '10-15'";
  } else {
    errors.weight = "";
  }

  if (!input.height) {
    errors.height = "You must type a height range";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
    errors.height = "Height must be a range. Example: '10-15'";
  } else {
    errors.height = "";
  }
  if (!input.years) {
    errors.years = "You must type a Years";
  } else if (!/\d{1,2}-\d{1,2}/g.test(input.years)) {
    errors.years = "Years must be a range. Example: '10-15'";
  } else {
    errors.years = "";
  }
  return errors;
}

function CreateDog(props) {
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    years: "",
    temperament: [],
  });

  // const dispatch = useDispatch();

  useEffect(() => {
    getTemperaments();
  },[]);

  const temperaments = useSelector((input) => input.temperaments);

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
		if (input.temperament.length >= 3) {
			alert('You can select up to 3 temperaments.');
		} else {
			setInput((prev) => ({ ...prev, temperament: [...prev.temperament, e.target.value] }));
		}
	}

  async function handleSubmit(e){
    e.preventDefault();
    try{
          let res=
            await fetch('http://localhost:3001/dogs',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(input),
        })
        alert('Breed created successfully!');
    } catch(err){
        console.log(err.message)
        alert('We could not create breed. Please try again.');
    }
    setInput({
      name: "",
      height: "",
      weight: "",
      years: "",
      temperament: [],
    })
  }


  function deleteTemp(e, t) {
    setInput((p) => ({
      ...p,
      temperament: p.temperament.filter((temp) => temp !== t ),
    }));
  }

  function getNames(arr) {
    let names = [];
    temperaments.forEach((t) => {
      arr.forEach((name) => {
        if (name === t.name) {
          names.push(t.name);
        }
      });
    });
    return names;
  }


  return (
    <div className="allCreate">
      <NavBar />
      <form className="allLabels" onSubmit={(e) => handleSubmit(e)}>
        <label className="labels" for="name">
          Name
        </label>
        <input
          className="allInputs"
          type="text"
          name="name"
          placeholder="name here"
          required="required"
          value={input.name}
          onChange={handleInput}
        />
        {errors.name && <p className="danger">{errors.name}</p>}

        <label className="labels" for="height">
          Height
        </label>
        <input
          className="allInputs"
          type="text"
          name="height"
          placeholder="heigth"
          required="required"
          onChange={handleInput}
          value={input.height}
        />

        {errors.height && <p className="danger">{errors.height}</p>}
        <label className="labels" for="weight">
          Weight
        </label>
        <input
          className="allInputs"
          type="text"
          name="weight"
          placeholder="weigth"
          required="required"
          onChange={handleInput}
          value={input.weight}
        />
        {errors.weight && <p className="danger">{errors.weight}</p>}
        <label className="labels" for="life_span">
          Years
        </label>
        <input
          className="allInputs"
          type="text"
          name="years"
          placeholder="years"
          required="require"
          value={input.years}
          onChange={handleInput}
        />
        {errors.years && <p className="danger">{errors.years}</p>}
        <div>
          <p className="style">Temperaments</p>
          <select
            name="temperaments"
            onChange={(e) => handleSelect(e)}
            required
            value={input.temperament}
            className="bt_chosen"
          >
            <option>Select</option>
            {temperaments.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {input.temperament.map((t) => (
            <p id={t} className="tipaso">
              {getNames([t])}{" "}
              <button type="button" onClick={(e) => deleteTemp(e, t)}>
                {t.name}-x-
              </button>
            </p>
          ))}
        </div>

        <button className='facha' type="submit">Submit</button>
      </form>
    </div>
  );
}

function mapStateToProps(state) {
  return {
      temperaments: state.temperaments
  }
  }

function mapDispatchToProps(dispatch){
  return{
      getTemperaments: dogs => dispatch (getTemperaments(dogs))
  }
}


export default connect ( mapStateToProps , mapDispatchToProps)(CreateDog)


// import React from 'react';
// import { connect } from 'react-redux';
// import { getMovieDetail } from '../../actions/index';

// import './Movie.css';

// class Movie extends React.Component {

//     componentDidMount(){// permite hacer el match guarda el id de la peli
//         const movieId = this.props.match.params.id;
//             this.props.getMovieDetail(movieId)

//     }

//     render() {
//         return (
//             <div className="movie-detail">

//                 <h2>{this.props.movie.Title}</h2>
//                 <h4>{this.props.movie.Year}</h4>
//                 <h4>{this.props.movie.Plot}</h4>
//             </div>
//         );
//         }
// }

// function mapStateToProps(state){
//     return {
//         movie: state.movieDetail
//     };
// }

// function mapDispatchToProps(dispatch){
//     return {
//         getMovieDetail: idMovie => dispatch(getMovieDetail(idMovie))

//     };
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Movie);
