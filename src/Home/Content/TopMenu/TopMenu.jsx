import React, { useState, useEffect } from "react";
import "./TopMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth } from "../../../Fireabase";
import { useNavigate } from "react-router-dom";
import ConfirmAlert from '../../../Alerts/ConfirmAlert'
import {
    faRightFromBracket,
 
  } from "@fortawesome/free-solid-svg-icons";
 


const TopMenu = () => {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if(!user)
          {
         
            navigate("/")
          }
        })
    },[] );

    const signOut = ()=>{
        auth.signOut()
    }

    const handleClick =()=>{
        setShowAlert(true)
    }
    
    const handleAlertState = (bool)=>{
        setShowAlert(bool)
    }
    return (
        <div className='top__menu'>
            <div className='lougout' onClick={handleClick}>
                <FontAwesomeIcon icon={faRightFromBracket}/>
                <span>Déconnexion</span>
            </div>
            <ConfirmAlert title ="Déconnexion"  
                          text ="Vous allez être déconnecté de Sapass" 
                          icon ="warning" 
                          confirmButtonText="Me déconnecter" 
                          cancelButtonText ="Non, rester connecté!" 
                          alertState = {showAlert} 
                          setAlertState ={handleAlertState}
                          confirmCallBack = {signOut}
                          successMessageTitle ="Déconnecté"
                          successMessagebody ="Vous avez été déconneté!"
                          />
    </div>
    );
}

export default TopMenu;
