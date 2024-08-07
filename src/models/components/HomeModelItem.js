import React, {useState, useContext} from "react";
import './HomeModelItem.css'
import Card from "../../shared/components/UIComponents/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIComponents/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import axios from 'axios'
import fileDownload from 'js-file-download'
import {Link} from 'react-router-dom';
import { NavLink } from "react-router-dom";

const ModelItem = props => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext)

    const [showConfirmModal, setConfirmModal] = useState(false)

    const showDeletewarningHandler = () =>{
        setConfirmModal(true)
    }
    const cancelDeleteHandler = () =>{
        setConfirmModal(false)
    }
   
    const confirmDeleteHandler = async () =>{
        setConfirmModal(false)
        try{
           
            await sendRequest(`http://localhost:5000/api/models/${props.id}`, 'DELETE');
            props.onDelete(props.id)
            
        }
        
        catch(err){
        
        }
        
    }

    const handleDownload = (url, filename) => {
        axios.get(url, {
          responseType: 'blob',
        })
        .then((res) => {
          fileDownload(res.data, filename)
        })
      }

    return(
        <React.Fragment>
         <div className="box">  
        <li className="place-item">
        <NavLink to="/models">
            <div className="place-item__content">
            {isLoading && <LoadingSpinner asOverlay />}
                <div className="place-item__image">
                   <img src={`http://localhost:5000/${props.image}`}  alt={props.title}/>
                </div>
                <div className="place-item__title">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
    
                </div>
               
            </div>
              
           
            </NavLink>
        </li>
        </div>
        </React.Fragment>
    )

};

export default ModelItem;