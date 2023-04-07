import {React, useState, useEffect} from 'react'
import './Security.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cx from "classnames";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider , updatePassword} from "firebase/auth";
import { firebaseResponseError } from '../../../../FirebaseOperation/FirebaseErrorList';
import BasicAlert from '../../../../Alerts/BasicAlert'


const containsNumbers=(str)=>{
  return /[0-9]/.test(str)
}

const containsUpperCase = (str) =>{
  return /[A-Z]/.test(str)
}



const reauthenticate =  (currentPswd) => {
  return new Promise(async(resolve, reject)=>{
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      //console.log(user)
      const credential = await EmailAuthProvider.credential(
          auth.currentUser.email,
          currentPswd
      );
      reauthenticateWithCredential(user, credential).then((res=>{
        resolve(res)
      })).catch((res)=>{
        reject(res)
      });
   
  } catch (e) {
 
      return false
  }
  })

}


const updatePassWord = (user, newPassWord)=>{
    return new Promise((resolve, reject)=>{
      updatePassword(user, newPassWord).then((res)=>{
        resolve(res)
      }).catch((res)=>{
        reject(res)
      })
    })
}



export default function Security() {
  const [psswd , setPsswd] = useState({currentPsswd:"", newPswd:"", newPswdConf:""})
  const [newPswdvalidity, setNewPswdvalidity] = useState({upperCase:false, number: false, length: false })
  const [inputError, setInputError] = useState({currentPswdErr:false , newPswdConfErr: false})
  const [dataValidity, setDataValidity] = useState(false)
  const [hiddenLoad, setHiddenLoad] = useState("hidden")
  const [hiddenText, setHiddenText]= useState("")
  const [onLoad, setOnLoad] = useState(false)

  /**State for Alert */
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({title :"" , text :"", icon :"" ,confirmButtonText :"" })


  /**Change text on button "valider" to a spinner and "chargement" text on Load and reverse  */
  const setLoadingButton = (onLoad)=>{
      if(onLoad)
      {
        setHiddenText("hidden")
        setHiddenLoad("")
        setOnLoad(true) 
      }else{
        setHiddenText("")
        setHiddenLoad("hidden")
        setOnLoad(false)
      }
  }

  const handleChange = (e) =>{
      
      switch (e.target.name){
         case "pswd":
          setPsswd(t=>({...t , currentPsswd : e.target.value }))
          break;

         case "newPswd":
          let _newPswd = e.target.value
          
          /**check new password length */
          if(_newPswd.length>=8)
          {
            setNewPswdvalidity(t =>({...t, length:true }))
          }else{
            setNewPswdvalidity(t =>({...t, length:false }))
          }

          /**check if password contains number */
          if(containsNumbers(_newPswd)){
            setNewPswdvalidity(t =>({...t, number:true }))
          }else{
            setNewPswdvalidity(t =>({...t, number:false }))
          }

          /**check if new password contains Uppercase  */  
          if(containsUpperCase(_newPswd)){
            setNewPswdvalidity(t =>({...t, upperCase:true }))
          }else{
            setNewPswdvalidity(t =>({...t, upperCase:false }))
          }

          setPsswd(t=>({...t , newPswd : _newPswd}))
          break;

         case "newPswdConf": 
         setPsswd(t=>({...t , newPswdConf : e.target.value }))
          break;
      }
    
  }
  
  const handleSubmit = (e) =>{

    e.preventDefault();
    
    /**Check if all rules are OK */
    if(dataValidity){
      if(psswd.newPswd === psswd.newPswdConf )
      {
       setInputError(t=>({...t, newPswdConfErr:false}))
       setLoadingButton(true)
      
       /**Operation to change password */
      /**Verify current user password */
       reauthenticate(psswd.currentPsswd).then((res)=>{
          setInputError(t=>({...t, currentPswdErr:false}))
        
          const auth = getAuth();
          const user = auth.currentUser;
          
          /**Update pswd from FireBase */
          updatePassWord(user, psswd.newPswd).then((res)=>{
              setLoadingButton(false)

          /**Error on updating password */    
          }).catch((res)=>{
              setLoadingButton(false)
              setAlertMessage(t =>({title : "Une erreur est survenue" , text :firebaseResponseError[res.code], icon :"error" , confirmButtonText :"Fermer"}))
              setShowAlert(true)
            })      
       })

       /**Error when currentuser password varifing failed */
       .catch((res)=>{
        setLoadingButton(false)
        const message = res.code

        setAlertMessage(t =>({title : "Une erreur est survenue" , text :firebaseResponseError[res.code], icon :"error" , confirmButtonText :"Fermer"}))
        setShowAlert(true)
        
        if(message === "auth/wrong-password"){
          setInputError(t=>({...t, currentPswdErr:true}))
        }else{
          setInputError(t=>({...t, currentPswdErr:false}))
        }
  
       })


      }else{
        setInputError(t=>({...t, newPswdConfErr:true}))
      }
    }else{
     
    }
    
  }
  
  const handleAlertState =(bool)=>{
    setShowAlert(bool)
  }

  /**UseEffect used to chech input completition and verify all rules like upperCase, length , contains Number ,... */
  useEffect(() => {
  
    if(psswd.currentPsswd.length>= 8 && psswd.newPswdConf.length>=8 && newPswdvalidity.number && newPswdvalidity.upperCase && newPswdvalidity.length  ){
      setDataValidity(true)     
    }else
    {
      setDataValidity(false)
    }
  }, [psswd]);

  
  return (
  
   
    <div className='container-fluid'>
      <div className="row security" >
     
        <h3> Changer votre mot de passe </h3>
          <div className="col-12 col-sm-12  col-md-7 security_form mt-3">
            
            <Form>
                    <Form.Group className="mb-3" controlId="formBasicText1">
                      <Form.Label>Mot de passe</Form.Label>
                      <Form.Control disabled ={onLoad} className={cx("input", {"input-error" : inputError.currentPswdErr})}  type="password"  name="pswd" value={psswd.currentPsswd} onChange = {handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText2">
                      <Form.Label>Nouveau mot de passe</Form.Label>
                      <Form.Control disabled ={onLoad} type="password"  name="newPswd" value={psswd.newPswd} onChange = {handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText3">
                      <Form.Label>Confirmer nouveau mot de passe</Form.Label>
                      <Form.Control disabled ={onLoad} className={cx("input", {"input-error" : inputError.newPswdConfErr})}  type="password"  name="newPswdConf" value={psswd.newPswdConf} onChange = {handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="button" className='mb-3' onClick={handleSubmit} disabled = {!dataValidity} >
                           <span className={""+hiddenText}>Valider</span>
                          <span className={"spinner-grow spinner-grow-sm "+hiddenLoad} role="status" aria-hidden="true"></span>
                          <span className={""+hiddenLoad} >  Chargement</span>
                    </Button>
            </Form>
        </div>  
        <div className="col-12 col-sm-12 col-md-5 security_info mt-5">
          <h4>Le mot de passe doit contenir:</h4>
          <ul>
            <li className={cx("valid",{"not-valid" : !newPswdvalidity.upperCase} )}>Au moins une lettre majuscule (A-Z)</li>
            <li className={cx("valid",{"not-valid" : !newPswdvalidity.number} )}>Au moins un chiffre (0-9)</li>
            <li className={cx("valid",{"not-valid" : !newPswdvalidity.length} )}>Au moins 8 caractères</li>
          </ul>
        </div>
      </div>
      <BasicAlert title ={alertMessage.title}  text ={alertMessage.text} icon ={alertMessage.icon} confirmButtonText={alertMessage.confirmButtonText} alertState = {showAlert} setAlertState ={handleAlertState} />
    </div>
  )
}
