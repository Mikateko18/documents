import React, {useContext, useState, useEffect} from "react";
import './searchModel.css'
import { useParams } from 'react-router-dom';
import {Link} from 'react-router-dom';
import ModelList from "../../../models/components/ModelItem";
import { useHttpClient } from "../../hooks/http-hook";


const modelType =({models = []}) => {
  
  const [LoadedModels, setLoadedModels] = useState();
 



    return (    
      <div className="searchModel">
          <div className="box1">
              <ul className="models-list" >
          <div className="place-model">
          <div className="place-model__content">
          
        {models &&
          models.map(({ objectID,_id, title, image, creator}) => (
            title && 
            <Link to={`/${_id}/models`}>
            <div  key={objectID}>
               
              <h3 className ="title">{title}</h3>
             
              <img className='image'  src={`http://localhost:5000/${image}` }/>

              
               
              
            </div> 
            </Link>                       
          ))}
          
          </div>
          </div>
          </ul>
      </div>
      </div>
    );
  };
  
  export default modelType;