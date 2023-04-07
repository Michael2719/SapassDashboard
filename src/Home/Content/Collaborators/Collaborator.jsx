import {React, useState,useEffect} from 'react';
import './Collaborator.css'
import { Routes, Route } from 'react-router-dom';
import CollaboratorList from './CollaboratorList/CollaboratorList';
import BusCollaborator from './BusCollaborator/BusCollaborator'
import CollaboratorDetails from './CollaboratorDetails/CollaboratorDetails';
import AddCollaBorator from './AddCollaborator/AddCollaBorator';

const Collaborator = () => {
    
    return(<div className='collaborator'>
    <Routes>
        <Route path="/" element={<CollaboratorList />}/>
        <Route path="/update/:id" element={<AddCollaBorator/>}/>
        <Route path="/car/:id" element ={<BusCollaborator/>}/>
        <Route path="/car/update/:id/:immatr" element ={<BusCollaborator/>}/>
        <Route path="/detail/:id" element={<CollaboratorDetails/>}/>
    </Routes>   
    </div>)
}

export default Collaborator;
