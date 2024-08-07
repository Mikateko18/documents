import React, {useState, useCallback} from 'react';
import {BrowserRouter as Router, Route, Redirect,Switch} from 'react-router-dom';
import Users from './users/pages/Users';
import { useParams } from "react-router-dom";
import NewModel from './models/pages/NewModel';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import MyModel from './models/pages/MyModel';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/auth-context';
import Sidebar2 from './shared/components/Navigation/Sidebar2';
import Sidebar3 from './shared/components/Navigation/Sidebar3';
import Sidebar4 from './shared/components/Navigation/Sidebar4';
import Sidebar from './shared/components/Navigation/Sidebar';
import Home from './shared/utils/pages/Home';
import SearchModel from './shared/utils/pages/searchModel';
import ModelList from './models/components/HomeModelList';
import SearchBar from './shared/components/Navigation/SearchBar'
import SearchItem from './models/components/SearchItem';
import UserUploadedModels from './models/pages/userUploadedModels';

import PlayerComponent from './models/pages/AR';





const  App =  () => {

  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false)
  const [modelId, setModelId] = useState(false)
  

  
  const login = useCallback((uid, pid, token) => {
    setToken(true);
    setUserId(uid);
    setModelId(pid);
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setModelId(null);
  }, [])

  
  let routes;
  if(token){
    routes= (
      <Switch>
      <Route path="/home" exact>
     <Home />
     <Sidebar2 />
     <SearchModel />
    
  </Route>
  <Route path="/experience" exact>
     
     <Sidebar2 />
     <PlayerComponent />
    
  </Route>

  <Route path="/:userId/creator" exact>
   <UserUploadedModels />
   <Sidebar3 />
   </Route>
  
   <Route path="/:userId/models" exact>
   <MyModel />
   <Sidebar3 />
   </Route>
   <Route path="/verify/:verificationCode" exact>
   <Auth />
  
   </Route>

   <Route path="/:modelId/models" >
   <SearchItem/>
   <Sidebar2 />
   

   <Route path= "/auth">
     <Auth />
  </Route>

  

  
  
</Route>
<Route path="/users" exact>
   <Users />
   <Sidebar />
  
</Route>


<Route path ="/models/new" exact>
    <NewModel />


  </Route>

  <Redirect to="/home" />
  

</Switch>
    );
  }else{
    routes= (
      <Switch>
     
   

<Route path= "/auth">
     <Auth />
  </Route>
  <Redirect to="/auth" />
  
</Switch>
    )
  };
  return (
  <AuthContext.Provider value={{isLoggedIn: !!token,token: token,  userId: userId, modelId: modelId, login:login, logout: logout}}>
    
  <Router>
    <MainNavigation />
    
    <main>{routes}</main>
    
    
    
  </Router>
  </AuthContext.Provider>

  )
  }

export default App;