
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ModelItem from '../components/ModelItem';
import ErrorModal from '../../shared/components/UIComponents/ErrorModal';
import LoadingSpinner from '../../shared/components/UIComponents/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ModelType from '../../shared/utils/pages/modelType';


const ModelItems = props => {
      
    const [LoadedModels, setLoadedModels] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [models, setModels] = useState([]);

    

    useEffect(() => {

        const fetchModels = async () => {
            try{
                const responseData = await sendRequest(`http://localhost:5000/api/models/${props.id}`);
                setLoadedModels(responseData.models)
            }catch(err){
            
            }
           
        }
        fetchModels();

    }, [sendRequest, props.id]);

    const modelDeletedHandler = deletedModelId => {

        setLoadedModels(prevModels  => prevModels.filter(model => model.id !== deletedModelId) )
    }
    return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (<div className="center">
        <LoadingSpinner />
        </div>
        )
        }
        
        

    
    </React.Fragment>
  )
}

export default ModelItems;