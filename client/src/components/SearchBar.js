import React, { useEffect } from "react";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../Actions";
import './SearchBar.css';

export default function SearchBar() {


    const [input, setInput] = useState('');

    const dispatch = useDispatch();

    function sacarDog(e){
      if(e.target.value)
        setInput(e.target.value)
    }
    
    function onClickHandle(){
        dispatch(getDogs(input))
        setInput('')
    }

    function onClickRefresh(){
        dispatch(getDogs())
    }


  return (
    <div id='searchbar'>
      <input className='busqueda'
        type="text"
        value={input}
        placeholder="Type the dog"
        onChange={(e)=>sacarDog(e)}
      />
      <button className='boton' type='button' onClick={onClickHandle}>Search</button>
      <button className='boton' type='button' onClick={onClickRefresh}>Refresh</button>

    </div>
  );
}
