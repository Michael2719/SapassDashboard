import { faCalendar, faEnvelope, faLocationPin, faMobile, faNeuter, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import "./ProfilMenu.css"

export const dateConverterFromFirebase = (_date)=>{
  if(_date)
  {
    var date = new Date(_date);
    var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                      .toISOString()
                      .split("T")[0];
    var tabDate = dateString.split('-')                  
    return tabDate[2]+"/"+tabDate[1]+"/"+tabDate[0]
  }else{
    return""
  }

}


export default function ProfilMenu({user}) {
             

  return (
    <div className='profilmenu_content'>
        <div className='row'>
            <div className='col profil_menu_left'>
                <img src={user.photoURL? user.photoURL :"https://static.jobat.be/uploadedImages/grandprofilfb.jpg"}  className='profil_img_show' alt="" />
                <p>{user.name}</p>
                <p>{user.role}</p>
            
            </div>
            <div className='col profil_menu_right'>
                <div className="email profil_menu_right_item"><FontAwesomeIcon  className="icon_menu_right" icon={faEnvelope}/><p>{user.email}</p></div>
                <div className="tel profil_menu_right_item"><FontAwesomeIcon className="icon_menu_right" icon={faMobile}/><p>{user.phoneNumber}</p></div>
                <div className="role profil_menu_right_item"><FontAwesomeIcon className="icon_menu_right" icon={faUserCheck}/><p>{user.role}</p></div>
                <div className="date profil_menu_right_item"><FontAwesomeIcon className="icon_menu_right" icon={faCalendar}/><p>{dateConverterFromFirebase (user.dateOfBirth )} </p></div>
                <div className="email profil_menu_right_item"><FontAwesomeIcon  className="icon_menu_right" icon={faLocationPin}/><p>{user.adress} </p></div>
                <div className="email profil_menu_right_item"><FontAwesomeIcon  className="icon_menu_right" icon={faNeuter}/><p>{user.sexe} </p></div>
                
             
            </div>
        </div>
    </div>
  )
}