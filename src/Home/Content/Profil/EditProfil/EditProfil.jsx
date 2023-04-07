
import "./EditProfil.css"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from 'react-modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  DatePicker  from  "react-datepicker" ;
import cx from "classnames";
import  "react-datepicker/dist/react-datepicker.css" ;
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import {getData, getCurrentUser, updateData} from "../../../../FirebaseOperation/UserOperation"
import DrapAndDrop from "./DrapAndDrop";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

const EditProfil = (props) => {
   

    let subtitle;
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [profilData, setProfilData] = useState([])
    const [isApproval, setApproval] = useState(false) ;
    const [isInputValide, setInputValide] = useState({_name:true, afterName:true, adress:true, phoneNumber:true})
    const [hiddenLoad, setHiddenLoad] = useState("hidden")
    const [hiddenText, setHiddenText]= useState("")


  /**Change text on button "valider" to a spinner and "chargement" text on Load and reverse  */
  const setLoadingButton = (onLoad)=>{
      if(onLoad)
      {
        setHiddenText("hidden")
        setHiddenLoad("")
      
      }else{
        setHiddenText("")
        setHiddenLoad("hidden")
      
      }
  }


    const openModal = ()=> {
        setIsOpen(true);
      }

    const afterOpenModal= ()=> {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }
    
    const closeModal=()=> {
        setIsOpen(false);
      }

    
    useEffect(()=>{
       
        getCurrentUser().then((user)=>{
          if(user)
          {
            getData(user).then((userData)=>{
              setProfilData(userData)
              })
            
          }
        })
      },[])
    
    const handleInputChanged=(e)=>{
       
        setProfilData(s => ({...s,[e.target.name] :e.target.value}))
      
    }

    const handleDatePickerChanged = (date)=>{
      setProfilData(s => ({...s,dateOfBirth :""+date}))

    }

    const handleCheckedChange = (e)=>{
      //console.log(profilData)
      var isValide = true
      if(profilData.name.length<2)
      {
        isValide =false
        setInputValide(s =>({...s, _name: false}))
      }else{
        setInputValide(s =>({...s, _name: true}))
      }

      if(profilData.afterName.length<2)
      {
        isValide =false
        setInputValide(s =>({...s, afterName: false}))
      }else{
        setInputValide(s =>({...s, afterName: true}))
      }

      if(profilData.adress.length<2)
      {
        isValide =false
        setInputValide(s =>({...s, adress: false}))
      }else{
        setInputValide(s =>({...s, adress: true}))
      }

      if(profilData.phoneNumber.length<10)
      {
        isValide =false
        setInputValide(s =>({...s, phoneNumber: false}))
      }else{
        setInputValide(s =>({...s, phoneNumber: true}))
      }

      if(isValide)
      {
        setApproval(!isApproval)
        
       
      }
    }

    const handleUrlProfilChanged=(url)=>{
      
     
      setProfilData(s => ({...s,photoURL :url}))
     
      updateData({uid : profilData.uid, photoURL:url}).then((res)=>{
        closeModal()
     })
    }

    const handleButtonSubmit = (e)=>{
       setLoadingButton(true)
      e.preventDefault()
      
      updateData(profilData).then((res)=>{
         setLoadingButton(false) 
        navigate("/sapass/profil/user")
     
      }).catch((res)=>{
    
        setLoadingButton(false)
      })
    }
    return (
        <div >
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className={"modal_drag_and_drop"}>
               <div className="page">
                  <DrapAndDrop onModalClose = {closeModal}  onPhotoURLChanged = {handleUrlProfilChanged}/>
               </div>
             
        </Modal>
        <div className="page_edit">
              <div className="row">
                <div className="col col order-2 order-sm-2 order-md-2">
                    <Form>
                            <Form.Group className="mb-3" controlId="formBasicText1">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control  className={cx("input" , {"input-error": !isInputValide._name})} type="text" disabled ={isApproval} name="name" onChange={handleInputChanged} placeholder="Votre nom" value={profilData.name ||""}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText2">
                                <Form.Label>Prénom(s)</Form.Label>
                                <Form.Control type="text" className={cx("input" , {"input-error": !isInputValide.afterName})} disabled ={isApproval} name="afterName" onChange={handleInputChanged} placeholder="Votre prénom(s)" value={profilData.afterName ||""}  />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText3">
                                <Form.Label>Adresse</Form.Label>
                                <Form.Control className={cx("input" , {"input-error": !isInputValide.adress})} type="text" disabled ={isApproval} name="adress" onChange={handleInputChanged} placeholder="Votre adresse " value={profilData.adress ||""}  />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText4">
                                <Form.Label>Tel</Form.Label>
                                <Form.Control className={cx("input" , {"input-error": !isInputValide.phoneNumber})} type="number" disabled ={isApproval} name ="phoneNumber" onChange={handleInputChanged} placeholder="Votre numero téléphone"  value={profilData.phoneNumber ||""} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicText5">
                                <Form.Label>Date de naissance</Form.Label>
                                < DatePicker  className="date_picker" disabled ={isApproval}  selected = {profilData.dateOfBirth?new Date(profilData.dateOfBirth): ""} onChange={(date) => handleDatePickerChanged(date)}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox1">
                                <Form.Check type="checkbox" label="Modification(s) appprouvée(s)" checked={isApproval} onChange={handleCheckedChange}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled ={!isApproval} onClick={handleButtonSubmit}>
                                <span className={""+hiddenText}>Valider</span>
                                <span className={"spinner-grow spinner-grow-sm "+hiddenLoad} role="status" aria-hidden="true"></span>
                                <span className={""+hiddenLoad} >  Chargement</span>
                            </Button>
                    </Form>
                </div>
                <div className="col order-1 order-sm-1 order-md-1">
                    <div className="image_picker mb-3">
                        <img src={profilData.photoURL? profilData.photoURL : "https://static.jobat.be/uploadedImages/grandprofilfb.jpg" } alt="" />
                        <button className="btn btn-light" onClick={openModal}><FontAwesomeIcon className="icon_camera" icon={faCamera}/><p>Changer la photo</p></button>
                    </div>
                </div>
            </div>    
        </div>  


        </div>
    );
}

export default EditProfil;
