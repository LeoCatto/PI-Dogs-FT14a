import React from "react";
import NavBar from "./NavBar";
import "./About.css";
// import panchin from "../Images/panchin.jpg";
// import panchin2 from "../Images/panchin2.jpg";
// import panchin3 from "../Images/panchin3.jpg";

export default function About() {
  return (
    <div>
      <NavBar />

      <div id="cardContainerA">
        <p id="info">
        Hi! My name is Leonardo Catto, i'm the author of this simple app. Here you can browse dog breeds and create new ones and add them to the list. I built it using PostgreSQL, Sequelize, Node.js, Express, React and Redux. Hope you like it!
        </p>
      </div>
      {/* <div className="pics">
        <img className="panchi" src={panchin} alt="" />
        <img className="panchi" src={panchin2} alt="" />
        <img className="panchi" src={panchin3} alt="" />
      </div> */}
    </div>
  );
}