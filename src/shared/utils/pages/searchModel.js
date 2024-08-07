import React, { useState, useEffect } from 'react';
import ModelType from './modelType';
import SearchBar from '../../components/Navigation/SearchBar';
import { useHttpClient } from '../../hooks/http-hook';
import './searchModel.css'

const searchModel = () => {

    const [models, setModels] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');
    const { sendRequest } = useHttpClient();


    const fetchModelss = async () => {
        try {
            const responseData = await sendRequest('http://localhost:5000/api/model');
            setAllModels(responseData.models)
            setModels(responseData.models);
          setError(null);
        } catch (err) {
          setError(err.message);
          setModels(null);
        } finally {
          setLoading(false);
        }
      };

      const updateKeyword = (keyword) => {
        const filtered = allModels.filter(model => {
         return `${model.title.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        setKeyword(keyword);
        setModels(filtered);
     }

     useEffect(() => {
        fetchModelss();
      }, []);


      return (
        <React.Fragment>
        
        
          {error && <div>{`Problem fetching the models - ${error}`}</div>}
          <SearchBar keyword={keyword} onChange={updateKeyword}/>
          <ModelType models={models} />
        
        </React.Fragment>
      )

}

export default searchModel;