import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { getOrder, getOrderByWeight, getSource, getTemperaments, filter, getOrderByYears } from '../Actions/index';
import './Filter.css';
function Filter() {
	const dispatch = useDispatch();

	//obtenemos todos los temperamentos
	useEffect(() => {
		dispatch(getTemperaments());
	}, []);
	// los llevamos a una constante
	const temperaments = useSelector((state) => state.temperaments);
	const dogs = useSelector((state) => state.dogs);

	let [selectedTemp, setSelectedTemp] = useState('');

	let [tempToFilterBy, setTempToFilterBy] = useState([]);

	function handleClick() {
		let filtereddogs = [];
		dogs?.forEach((b) => {
			if (b.id.length > 6) {
				b.arregloT.map((t) => (t === selectedTemp ? filtereddogs.push(b) : null));
			} else {
				if (b.arregloT.includes(selectedTemp)) {
					filtereddogs.push(b);
				} else {
					return null;
				}
			}
		});

		dispatch(filter(filtereddogs));
        setSelectedTemp('')
	}

	function handleChangeTemp(e) {
        e.preventDefault();
		setSelectedTemp(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setTempToFilterBy([...tempToFilterBy, selectedTemp]);
		handleClick();
	}

	function handleOrderByYears(e) {
		dispatch(getOrderByYears(e.target.value));
	}
	function handleOrder(e) {
		dispatch(getOrder(e.target.value));
	}
	function handleOrderByWeight(e) {
		dispatch(getOrderByWeight(e.target.value));
	}
	function handleSource(e) {
		dispatch(getSource(e.target.value));
	}

	return (
		<div className='body'>
			<form className='container'>
				<p className='p'>Order by weight</p>
				<select className='input' onChange={handleOrderByWeight}>
					<option value=''>Select</option>
					<option value='MINMAX'>+ to -</option>
					<option value='MAXMIN'>- to +</option>
				</select>
			</form>
			<form className='container'>
				<p className='p'>Order alphabetically</p>
				<select className='input' onChange={handleOrder}>
					<option value=''>Select</option>
					<option value='ASC'>A-Z</option>
					<option value='DESC'>Z-A</option>
				</select>
			</form>
			<form className='container'>
				<p className='p'>By</p>
				<select  className='input' onChange={handleSource}>
					<option value=''>Select</option>
					<option value='DB'>DB</option>
					<option value='API'>API</option>
					<option value='ALL'>ALL</option>
				</select>
			</form>
			<form className='container'>
				<p className='p'>By</p>
				<select  className='input' onChange={handleOrderByYears}>
					<option value=''>Select</option>
					<option value='MAXYEARS'>yEARS</option>
				</select>
			</form>
			<form onSubmit={handleSubmit} className='package'>
				<div className='container'>
						<p className='p'>Filter by temperament</p>
				<select className='input' onChange={handleChangeTemp} name='temperaments' value={selectedTemp}>
					<option>All</option>
					{temperaments.map((e) => (
						<option value={e.name} key={e.id}>
							{e.name}
						</option>
					))}
				</select>
				</div>
			
				<div>
					<button className='btn' type='submit'>Filter</button>
				</div>
			</form>
		</div>
	);
}

const mapStateToProps = (state) => {
    return {
      dogs: state.dogs,
      temperaments:state.temperaments
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getTemperaments: (dogs) => {
        dispatch(getTemperaments(dogs));
      },
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Filter);