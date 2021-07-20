import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Dog from "./components/Dog";
import CreateDog from "./components/CreateDog";
import About from './components/About'

function App() {


  return (
     <React.Fragment>
          
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path= '/createDog' component={CreateDog}/>
          <Route exact path="/dogs/:id" render={(match) => <Dog match= {match}/>} />
          <Route exact path= "/about" component={About}/>

      </React.Fragment> 

  )
}

export default App;
