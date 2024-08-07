import React, {useState, useContext, StrictMode} from "react";
import './ModelItem.css'
import Card from "../../shared/components/UIComponents/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIComponents/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import axios from 'axios'
import fileDownload from 'js-file-download'

import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import { createRoot } from 'react-dom/client';
import PlayerComponent from "../pages/AR";
import Sidebar3 from "../../shared/components/Navigation/Sidebar3";


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

    const Experience = props =>{
      
        const rootElement = document.getElementById('root');
        const root = createRoot(rootElement);
        root.render(
            <React.Fragment>
            
           <StrictMode>
           
              <PlayerComponent />
           </StrictMode>
           </React.Fragment>
        );
      

    }


    return(
        <React.Fragment>
             <ErrorModal error={error} onClear={clearError} />
            <Modal 
            show={showConfirmModal}
            onCancel= {cancelDeleteHandler}
            header= "Are you sure?" 
            footerClass="place-item__modal-actions" 
            footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}> CANCEL</Button>
                    <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
                <p>Do you want to proceed and delete this model? 
                    please note that it cannot be undone thereafter.</p>
            </Modal>
    
        <li className="place-item2">
            
            <Card className="place-item2__content">
            {isLoading && <LoadingSpinner asOverlay />}
                <div className="place-item2__image">
                   <img src={`http://localhost:5000/${props.image}`}  alt={props.title}/>
                </div>
                <div className="place-item2__info">
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
    
                </div>
                
                <div className="place-item2__actions">
                {auth.isLoggedIn &&<Button inverse href="https://gitlab.com/OMotuba/ImmersivePJ">DOWNLOAD</Button>}
                {auth.isLoggedIn &&<Button inverse onClick={Experience} >EXPERIENCE</Button> }
                {auth.userId === props.creatorId && <Button danger onClick={showDeletewarningHandler}>DELETE</Button>}

                </div>
            </Card>
              
           
    
        </li>
        </React.Fragment>
    )

};

export default ModelItem;