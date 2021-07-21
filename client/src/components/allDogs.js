import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getDogs } from "../Actions/index.js";


function AllDogs() {

  const dispatch = useDispatch();

  let dog = useSelector((state) => state.dogs);
  let temperament = useSelector((state) => state.temperaments);

  const [fDogs, setFDogs] = useState([]);

  useEffect(() => {
    setFDogs([...dog]);
  }, [dog]);

  function filter(w) {
    let filtered = dog.filter((d) => {
      if (d.temperaments) {
        let names = d.temperaments.map((t) => t.name);
        return names.includes(w);
      } else if (d.temperament !== undefined) {
        return d.temperament.includes(w);
      }
    });
    setFDogs([...filtered]);
  }

  function myDogs() {
    let filtered = [];
    filtered = dog.filter((d) => typeof d.id !== "string");
    setFDogs([...filtered]);
  }

  function showAll() {
    setFDogs([...dog]);
  }

  function apiDogs() {
    let filtered = [];
    filtered = dog.filter((d) => typeof d.id === "string");
    setFDogs([...filtered]);
  }

  return (
    <div>
      <div id="myVsApi">
        <button className="sorting" onClick={myDogs}>
          DB dogs
        </button>
        <button className="sorting" onClick={apiDogs}>
          Api dogs
        </button>
        <button className="sorting" onClick={showAll}>
          All dogs
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    dog: state.dogs,
    temperament: state.temperaments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDogs: (dogs) => {
      dispatch(getDogs(dogs));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDogs);
