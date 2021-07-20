import React from "react";
import Cards from "./Cards.jsx";
import NavBar from "./NavBar";

export default function Home() {

  return (
    <div>
      <NavBar />
      <div>
        <Cards />
      </div>
    </div>
  );
}
