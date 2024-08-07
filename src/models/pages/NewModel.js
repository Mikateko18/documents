import React,{useContext} from "react";
import Input2 from "../../shared/components/FormElements/Input";
import './NewModel.css'
import {VALIDATOR_FILE, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/utils/validators";
import Button from '../../shared/components/FormElements/Button'
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";



const NewModel = () =>{
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [formState, Inputhandler] = useForm({
    
        title:{
             value: '',
             isValid: false
        },
        description:{
         value: '',
         isValid: false
    }, 
    image: {
        value: null,
        isValid: false
      }
     }, false
)
const history = useHistory();
    

    const modelSubmitHandler = async event => {
        event.preventDefault();
        try{

        const formData = new FormData();
        formData.append('title', formState.inputs.title.value );
        formData.append('description', formState.inputs.description.value );
        formData.append('creator',  auth.userId );
        formData.append('image', formState.inputs.image.value );
            await sendRequest(
                'http://localhost:5000/api/models', 'POST', 
                formData,{Authorization: 'Bearer ' + auth.token}
            )
                history.push('/')

        }catch(err){

        }
       
       
    }
   
    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
         <form className="place-form" onSubmit={modelSubmitHandler}>
         {isLoading && <LoadingSpinner asOverlay />}
         
        <Input2 element="input" 
        id = "title" 
        type="text" label="Title" 
        validators={[VALIDATOR_REQUIRE()]} 
        errorText="Please enter a valid title"
        onInput= {Inputhandler}
        
        />
         <Input2 element="textarea" 
         id= "description"
        type="text" label="Desription" 
        validators={[ VALIDATOR_MINLENGTH(5)]} 
        errorText="Please enter a valid description"
        onInput= {Inputhandler}
        
        />
      
         <ImageUpload  id="image"  onInput={Inputhandler} />
        
        
        <Button type="Submit" disabled= {!formState.isValid}> ADD MODEL</Button>
        
    </form>
    </React.Fragment>
    )
}

export default NewModel;