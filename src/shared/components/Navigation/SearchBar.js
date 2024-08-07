import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const SearchBar = ({keyword, onChange}) => {
    const BarStyle = {width:"30rem",
    background:"#F0F0F0", 
    border: "2px solid rgba(40,57,101,.9)",
    padding:"0.5rem",
    position: "relative",
    bottom:"1870px",
    left:"550px",
    color:"rgba(40,57,101,.9);",

 };
    return (
        
      <input 
      style={BarStyle}
       key="search-bar"
       value={keyword}
       placeholder={"search model"}
       onChange={(e) => onChange(e.target.value)}
      />

     
    );
  }
  
  export default SearchBar;