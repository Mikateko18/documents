import React from "react";
import ModelList from "../components/ModelList";
import { useParams } from "react-router-dom";


const userModels = () =>{
  const userId = useParams().userId;
  const loadedModels = DUMMY_Models.filter(model => model.creator === userId)
  return <ModelList items={loadedModels} />
};
export default userModels;