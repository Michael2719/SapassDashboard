import React from 'react';
import './Content.css'
import TopMenu from "./TopMenu/TopMenu"
import Profil from "./Profil/Profil"
import EditProfil from "./Profil/EditProfil/EditProfil"
import Collaborator from "./Collaborators/Collaborator"
import AddCollaborator from "./Collaborators/AddCollaborator/AddCollaBorator"
import DeleteCollaborator from "./Collaborators/DeleteCollaborator/DeleteCollaborator"
import Transactions from "./Transactions/Transactions"
import Users from "./Users/Users"
import DeleteUsers from "./Users/DeleteUsers"
import AddUsers from "./Users/AddUsers"
import BusCollaborator from './Collaborators/BusCollaborator/BusCollaborator';

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
            <Route path='/collaborator/*' element = {<Collaborator/>}/>
            <Route path='/add_collaborator' element = {<AddCollaborator/>}/>
            <Route path='/delete_collaborator' element = {<DeleteCollaborator/>}/>
            <Route path='/transactions' element = {<Transactions/>}/>
            <Route path='/users' element = {<Users/>}/>
            <Route path='/add_users' element = {<AddUsers/>}/>
            <Route path='/delete_users' element = {<DeleteUsers/>}/>
          </Routes>      
        </div>
       
    );
}

export default Content;
