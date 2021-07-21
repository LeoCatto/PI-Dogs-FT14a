import React from "react";
import Cards from "./Cards.jsx";
import NavBar from "./NavBar";
import Filter from "./Filter.js";

export default function Home() {

  return (
    <div>
      <NavBar />
      <div>
        <Filter/>
      </div>
      <div>
        <Cards />
      </div>
    </div>
  );
}
