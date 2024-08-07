import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import AddIcon from '@mui/icons-material/Add';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';
import NewModel from '../../../models/pages/NewModel';
import { NavLink } from "react-router-dom";

import './Sidebar.css'

export const SidebarData = [
     
   
    {
        tittle: <NavLink to="/models/new"  className = "SidebarList">Home</NavLink> ,
        icon: <HomeIcon />,
        link: "/"
    },
    {
        tittle: "Users",
        icon: <GroupIcon />,
        link: "/"
    },
    {
        tittle: "My Models",
        icon: <ViewInArIcon />,
        link: "/auth"
    },
    {
        tittle: "Add Model",
        icon: < AddIcon />,
        link: "/models/new"
    },
    {
        tittle: "Contact us",
        icon: <ContactMailIcon />,
        link: "/auth"
    },
    {
        tittle: "Logout",
        icon: < LogoutIcon />,
        link: "/auth"
    },

]

