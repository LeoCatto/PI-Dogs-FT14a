import React from "react";
import {useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../Actions";

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
    <div>
      <input
        type="text"
        value={input}
        placeholder="Type the dog"
        onChange={(e)=>sacarDog(e)}
      />
      <button type='button' onClick={onClickHandle}>Search</button>
      <button type='button' onClick={onClickRefresh}>Refresh</button>

    </div>
  );
}
