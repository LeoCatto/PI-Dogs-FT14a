import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Dog from "./components/Dog";
import {addDog, getDogs, getTemperaments} from  "./Actions"
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "./components/NavBar";
import CreateDog from "./components/CreateDog";
import About from './components/About'

function App() {
  const dispatch = useDispatch()
  React.useEffect(() => {
   dispatch(getDogs())
  }, []);
  React.useEffect(() => {
   dispatch(getTemperaments())
  }, []); 

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
