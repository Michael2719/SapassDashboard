import React from 'react';
import './Content.css'
import TopMenu from "./TopMenu/TopMenu"
import Profil from "./Profil/Profil"
import EditProfil from "./Profil/EditProfil/EditProfil"
import Collaborator from "./Collaborators/Collaborator"
import AddCollaborator from "./Collaborators/AddCollaborator/AddCollaBorator"
import Transactions from "./Transactions/Transactions"
import Users from "./Users/Users"
import AddUsers from "./Users/AddUsers"


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Outlet
  } from "react-router-dom";


const Content = () => {
    return (
        <div className='content'>
          <div className="topMenu">
            <TopMenu></TopMenu> 
          </div>
           
           <Routes>
            <Route path='/profil/*' element = {<Profil/>}/>
            <Route path='/edit_profil' element = {<EditProfil/>}/>
            <Route path='/clients/*' element = {<Collaborator/>}/>
            <Route path='/clients/add_client' element = {<AddCollaborator/>}/>
            <Route path='/transactions' element = {<Transactions/>}/>
            <Route path='/users' element = {<Users/>}/>
            <Route path='/add_users' element = {<AddUsers/>}/>

          </Routes>      
        </div>
       
    );
}

export default Content;
