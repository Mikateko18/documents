import React from 'react';

import Card from '../../shared/components/UIComponents/Card';
import ModelItem from './ModelItem';
import Button from '../../shared/components/FormElements/Button';
import './ModelList.css';
import Sidebar3 from '../../shared/components/Navigation/Sidebar3';
import { NavLink } from "react-router-dom";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import '../../shared/components/Navigation/Sidebar.css';
import Home from '../../shared/utils/pages/Home'


const ModelList = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Home />
        <Card>
          <h2 >You have successfully deleted your model</h2>
     
        </Card>
      

      
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(model => (
        <ModelItem
          key={model.id}
          id={model.id}
          image={model.image}
          title={model.title}
          description={model.description}
          creatorId={model.creator}
          onDelete = {props.onDeleteModel}
         
        />
      ))}
    </ul>
  );
};

export default ModelList;
