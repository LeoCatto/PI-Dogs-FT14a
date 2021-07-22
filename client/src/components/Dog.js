import React from "react";
import { connect } from "react-redux";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDogDetail } from "../Actions/index";
import { NavLink } from "react-router-dom";
import "./Dog.css";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";

function Dog(props) {

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
		dispatch(getDogDetail(id));
	}, [id]);
  

  function manageWeight() {
    if (props.dogsDetail.weight.metric) {
      return props.dogsDetail?.weight.metric;
    } else {
      return props.dogsDetail?.weight; 
    }
  }
  function manageHeight() {
    if (props.dogsDetail?.height.metric) {
      return props.dogsDetail?.height.metric;
    } else {
      return props.dogsDetail?.height;
    }
  }
  return (
    <div>
      {props.dogsDetail["name"]?
        <div>
        <NavBar />
        <div id="cardContainer">
          <div className="info">
            <NavLink to='/home'>
            <div className="card-title">{props.dogsDetail.name}</div>
            </NavLink>
            <div className="details">
               <div>
                🦴Temperament:{" "}
                {props.dogsDetail.arregloT.join(', ') }
              </div>
              <div>🦴Height: {manageHeight(props.dogsDetail)}cm</div>
              <div>🦴Weight: {manageWeight(props.dogsDetail)}kg</div> 
              <div>🦴Years: {props.dogsDetail?.years}</div>
              <img
                id="image"
                src={props.dogsDetail.img}
                width="300"
                height="200"
                alt=""
              />
            </div>
          </div>
        </div>
        </div>
      : <div className='load'>
          <img 
          alt='Imagen no encontrada' 
          width='300' 
          height='200' 
          src='https://media.tenor.com/images/ffb0838d6924a88d142cf523fffe3bc6/tenor.gif'>
          </img>
        </div>}
    </div>
  );
}

const mapStateToProps=(state)=>{
  return{
    dogsDetail:state.dogsDetail
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getDogDetail:id=>
      dispatch(getDogDetail(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dog);