import React,{useContext, useEffect, useState } from "react";
import Input from "../../components/FormElements/Input";

import {VALIDATOR_FILE, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../utils/validators";
import Button from "../../components/FormElements/Button";
import { useForm } from "../../hooks/form-hook";
import { useHttpClient } from '../../hooks/http-hook';
import { AuthContext } from "../../context/auth-context";
import ErrorModal from '../../components/UIComponents/ErrorModal';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import { useHistory, useParams } from "react-router-dom";

import HomeModelList from '../../../models/components/HomeModelList'
import UsersList from "../../../users/components/UsersList";

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchModel from "./searchModel";
   
const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [LoadedUsers, setLoadedUsers] = useState();

    useEffect(() => {

        const sendRequest = async() => {
            setIsLoading(true);

            try{
                const response = await fetch('http://localhost:5000/api/model')

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message);
                  }
     
                setLoadedUsers(responseData.models)
                setIsLoading(false);
            }catch (err) {
                
                setError(err.message || 'Something went wrong, please try again.');
              }

              setIsLoading(false);
        }

        sendRequest();
    }, 
    
    [])

    const errorHandler = () => {
        setError(null);
      };




  


  
 
  


return <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler} />
    {isLoading && <div className="center">
        <LoadingSpinner asOverlay />
        </div>}

    {!isLoading && LoadedUsers && < SearchModel items={LoadedUsers}/>}

</React.Fragment>
}
export default Users;