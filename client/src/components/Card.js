import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card({ name, image, temperaments, id }) {

  return (
    <div className="card">
      <NavLink to={`/dogs/${id}`}>
        <h5 className="card-title">{name}</h5>
      </NavLink>
      <div className="card-body">
        <div className="image">
          <img
            className="laimagen"
            src={`${image}`}
            width="300"
            height="300"
            alt="no se encontro imagen"
          />
        </div>
        {temperaments && (
          <div className="temperaments">
            <p>
              Temperament:{" "}
              {temperaments}
            </p>
          </div>
        )}{" "}
      
      </div>
    </div>
  );
}