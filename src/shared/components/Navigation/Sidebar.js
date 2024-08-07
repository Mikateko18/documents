import React, {useContext} from "react";
import './Sidebar.css'
import NavLinks from "./NavLinks";
import {SidebarData} from './SidebarData'
import { AuthContext } from "../../context/auth-context";

import { NavLink } from "react-router-dom";
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';


function Sidebar() {
    const auth = useContext(AuthContext);
    return (
    <div className= "sideBar1">
      <ul className ="SidebarList">
       
      {auth.isLoggedIn && (<li className="row" > 
            <div classname="icon"><HomeIcon /></div>
           <NavLink to="/home">Home</NavLink>
       </li>
       ) 
       }
        {auth.isLoggedIn && (
       <li className="row">
           <GroupIcon />
           <NavLink to="/users">Users</NavLink>
       </li>
        ) 
       }
       {auth.isLoggedIn && (<li className="row"> 
            <ViewInArIcon />
            <NavLink to={`/${auth.userId}/creator`}>My Models</NavLink>
       </li>
       ) 
       }
        {auth.isLoggedIn && (
       <li className="row">
           <AddIcon />
           <NavLink to="/models/new">Add model</NavLink>
       </li>
        ) 
       }
       <li className="row">
       <ContactMailIcon />
           <NavLink to="/auth">Contact us</NavLink>
       </li>

      
       
       
        
       
      
     
      


   </ul>
          

    </div>
    )
}

export default Sidebar;