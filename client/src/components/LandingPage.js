import React from "react";
import { NavLink } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return (
        <div className= 'background'> 
            <div className= 'flex'> 
            <h1>Welcome to Dogs</h1>
              <button className= 'enter'>
                <NavLink to ='/home'>
                   <span id='text'>Let's go to the Dogs</span>
                </NavLink> </button>
            </div>
        
            <h2>Individual Proyect - Catto Leonardo</h2>
    
 </div>
    )
}