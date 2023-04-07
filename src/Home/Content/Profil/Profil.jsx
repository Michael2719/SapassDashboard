import React , {useEffect, useState }from 'react';

import './Profil.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Routes,
    Route,
    useNavigate,
    useLocation
  } from "react-router-dom";

import ProfilMenu from './ProfilMenu/ProfilMenu';
import Security from './Security/Security'
import {
    faShield,
    faCog,
    faUser,
    faRightFromBracket,
    faAngleRight
    
  } from "@fortawesome/free-solid-svg-icons";
import EditProfil from './EditProfil/EditProfil';
import cx from "classnames";
import {getData, getCurrentUser} from "../../../FirebaseOperation/UserOperation"
import { auth } from "../../../Fireabase";
import ConfirmAlert from '../../../Alerts/ConfirmAlert'

const Profil = () => {

    const [currentMenu, setCurrentMenu] = useState("profil")
    const [profilData, setProfilData] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    const location = useLocation() ;
    const pathTab = location.pathname.split('/')
    const undeMenuPath = pathTab[3]

    const ProfilCallback =(user)=>
    {
       
        setProfilData(user)
        
    }
    const navigate = useNavigate();


    useEffect(()=>{
        getCurrentUser().then((user)=>{
            getData(user , ProfilCallback)  
        })
       
              
    },[])
  

    useEffect(()=>{
        setCurrentMenu(undeMenuPath)
    }, [pathTab])


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
        <div className='body_profil container-fluid'>
                <div className='row'>
                    <div className='col-12 col-sm-12 col-md-4  col-lg-4 profil_container'>
                        <div className='profil info'>
                            <img src={profilData.photoURL? profilData.photoURL:"https://static.jobat.be/uploadedImages/grandprofilfb.jpg"} alt="" />
                            <div>
                                <p className='name'>{profilData.name}</p>
                                <p className='aftername'>{profilData.afterName}</p>
                            </div>
                          
                        </div>
                        <div className='profil option'>
                            <div className={cx("item" , {"item_active": currentMenu==="user"})} onClick = {()=>{setCurrentMenu("profil"); navigate(('/sapass/profil/user'))}}> <FontAwesomeIcon className='option_icon' icon={faUser} /> <p>Profil</p> <FontAwesomeIcon className='option_carretRight' icon={faAngleRight}/> </div>
                            <div className={cx("item" , {"item_active": currentMenu==="editProfil"})} onClick = {()=>{setCurrentMenu("editprofil"); navigate(('/sapass/profil/editProfil'))}}> <FontAwesomeIcon className='option_icon' icon={faCog} /> <p>Modifier</p> <FontAwesomeIcon className='option_carretRight' icon={faAngleRight}/></div>
                            <div className={cx("item" , {"item_active": currentMenu==="security"})} onClick = {()=>{setCurrentMenu("security"); navigate(('/sapass/profil/security'))}}> <FontAwesomeIcon className='option_icon' icon={faShield}/> <p>Sécurité</p> <FontAwesomeIcon className='option_carretRight' icon={faAngleRight}/></div>
                            <div className='item'onClick ={handleClick}> <FontAwesomeIcon className='option_icon' icon={faRightFromBracket} /> <p>Déconnexion</p> <FontAwesomeIcon className='option_carretRight' icon={faAngleRight}/></div>
                        </div>
                    </div>
                    <div  className='col-12 col-sm-12 col-md-8  col-lg-8 profil_content'>
                        <div>
                            <Routes>
                                <Route  path='/' element = {<ProfilMenu user = {profilData}/>}/>
                                <Route path='/user' element = {<ProfilMenu user = {profilData}/>}/>
                                <Route path='/editProfil' element = {<EditProfil />}/>
                                <Route path='/security' element = {<Security/>}/>
                                <Route path='/*' element = {<Security/>}/>
                            </Routes>
                        </div>
                    </div>
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

export default Profil;
