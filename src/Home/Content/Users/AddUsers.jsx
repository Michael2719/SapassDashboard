import {React, useState} from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import cx from "classnames";
import './Users.css'
import  DatePicker  from  "react-datepicker" ;
import { addNewUserAuth } from '../../../FirebaseOperation/CreateNewUserOperation';
import { firebaseResponseError } from '../../../FirebaseOperation/FirebaseErrorList';
import BasicAlert from '../../../Alerts/BasicAlert';
const containsNumbers=(str)=>{
    return /[0-9]/.test(str)
}
  
const containsUpperCase = (str) =>{
    return /[A-Z]/.test(str)
}

const dateFormat = (date)=>{
    return /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(date)
}

const emailFormat =(email)=>{
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}


const AddUsers = () => {
    const [onLoad, setOnLoad] = useState(false)
    const [infoUser, setInfoUser] = useState({nom:"", prenoms:"", ddn:"", adress:"", tel:"", role:"admin_3", genre:"homme"})
    const [inputError, setInputError] = useState({nom:false, prenoms:false, ddn:false, adress:false, tel:false, email:false, psswd:false, confPsswd:false})

    const [loginUser, setLoginUser] = useState({email:"", psswd:"", confPsswd:""}) 
    const [psswdState, setPsswdState] = useState({uppercase: true,number:true, length:true })
    
    const [basicAlertState, setBasicAlertState] = useState(false)
    const [basicAlertInfo, setBasicAlertInfo]= useState({title:"", text:"", icon:"", confirmButtonText:""})

    const handleAlertState = (bool) =>{
        setBasicAlertState(bool)
    }

    const handleInfoPersoChange=(e)=>{
        switch(e.target.name){
            case "nom" :
                setInfoUser(t=>({...t,nom:e.target.value}))
                setInputError(t=>({...t,nom:false}))
                if(containsNumbers(e.target.value)){
                    setInputError(t=>({...t,nom:true}))
                }
                break;
            
            case "prenoms" :
                setInfoUser(t=>({...t,prenoms:e.target.value}))
                setInputError(t=>({...t,prenoms:false}))
                if(containsNumbers(e.target.value)){
                    setInputError(t=>({...t,prenoms:true}))
                }
                break;
            case "adress" :
                if(inputError.adress)
                {
                    setInputError(t=>({...t,adress:false}))
                }
                setInfoUser(t=>({...t,adress:e.target.value}))
                break;
            
            case "tel" :
                if(inputError.tel)
                {
                    setInputError(t=>({...t,tel:false}))
                }
                setInfoUser(t=>({...t,tel:e.target.value}))
                break;
            
            case "role" :
                console.log(e.target.value)
                setInfoUser(t=>({...t,role:e.target.value}))
                break;
            
            case "groupe" :
             
                if(e.target.id ==="check1"){

                    setInfoUser(t=>({...t,genre:"homme"}))
                }else{
                    setInfoUser(t=>({...t,genre:"femme"}))
                }
                
                break;

            default:
                break;
        }
    }
    const handleDateChange=(date)=>{
        if(inputError.ddn)
        {
            setInputError(t=>({...t,ddn:false}))
        }
        setInfoUser(t=>({...t, ddn:date}))
       
        
    }

    const handleLoginChange =(e)=>{
    
        switch(e.target.name){
            case"email":
                if(inputError.email)
                {
                    setInputError(t=>({...t,email:false}))
                }
                setLoginUser(t=>({...t, email:e.target.value}))
                break;
        
            case"psswd":
                if(inputError.psswd)
                {
                    setInputError(t=>({...t,psswd:false}))
                }
                setLoginUser(t=>({...t, psswd:e.target.value}))
                const value = e.target.value
                /**UPPERCASE CHECK */
                if(containsUpperCase(value)){
                    setPsswdState(t=>({...t, uppercase:false}))
                    
                }else{
                    setPsswdState(t=>({...t, uppercase:true}))
               
                }
                /*NUMBER CHECK*/
                if(containsNumbers(value)){
                    setPsswdState(t=>({...t, number:false}))
                    
                }else{
                    setPsswdState(t=>({...t, number:true}))
                    
                }

                /*LENGHT check*/
                if(value.length>=8){
                    setPsswdState(t=>({...t, length:false}))
                    
                }else{
                    setPsswdState(t=>({...t, length:true}))
                  
                }

                break;
    
            case"confPsswd":
                if(inputError.confPsswd)
                {
                    setInputError(t=>({...t,confPsswd:false}))
                }
                setLoginUser(t=>({...t, confPsswd:e.target.value}))
                break;
            
            default:
                break;
        }
    }

 

    const handleValidate =()=>{
        let cmp =0
        if(infoUser.nom.length<4){
            setInputError(t=>({...t, nom:true}))
            cmp++;
        }
        if(infoUser.prenoms.length<2){
            setInputError(t=>({...t, prenoms:true}))
            cmp++;
        }
        if(infoUser.ddn ===""){
            setInputError(t=>({...t, ddn:true}))
            cmp++;
        }
        if(infoUser.adress.length<4){
            setInputError(t=>({...t, adress:true}))
            cmp++;
        }
        if(infoUser.tel.length!==10){
            setInputError(t=>({...t, tel:true}))
            cmp++;
        }

        if(!emailFormat(loginUser.email)){
            setInputError(t=>({...t, email:true}))
            cmp++;
        }

        if(JSON.stringify(psswdState).includes("true")){
            setInputError(t=>({...t,psswd:true }))
            cmp++;
        }

        if(inputError.confPsswd){
            setInputError(t=>({...t, confPsswd:false}))
        }
        if(loginUser.confPsswd!==loginUser.psswd){
            setInputError(t=>({...t, confPsswd:true}))
            cmp++;

        }

        /**IF ALL FIELDS ARE COMPLETED CORRECTELY  */
        if(cmp===0){
            addNewUserInformation()            
        }
    }
    const emailVerficationCallBack =(bool)=>{
        if(bool){
            //Send user informations to firestore
        }else{
            if(basicAlertState){
                setBasicAlertState(false)
            }
            setBasicAlertInfo({title:"Temps d'ettente dépassé!", text:"Adresse email non-vérifié", icon:"error", confirmButtonText:"Fermer"})
             setBasicAlertState(true)   
        }
    }

    const addNewUserInformation =()=>{
        addNewUserAuth(loginUser.email, loginUser.psswd , emailVerficationCallBack).then((res)=>{
            console.log(res)
            if(basicAlertState){
                setBasicAlertState(false)
            }
            setBasicAlertInfo({title:"", text:`Email de vérification envoyée à l'adresse ${loginUser.email}`, icon:"info", confirmButtonText:"Fermer"})
            setBasicAlertState(true)
        }).catch((err)=>{
            if(basicAlertState){
                setBasicAlertState(false)
            }   
       
            console.log(firebaseResponseError[err.code])
            setBasicAlertInfo({title:"", text:firebaseResponseError[err.code], icon:"error", confirmButtonText:"Fermer"})
             setBasicAlertState(true)
        })       
    }

    return (
        <div className='add-user-container'>
            <BasicAlert title={basicAlertInfo.title} text={basicAlertInfo.text} icon ={basicAlertInfo.icon} confirmButtonText={basicAlertInfo.confirmButtonText} alertState={basicAlertState} setAlertState={handleAlertState} />
            <div className="add-user-toolbar  d-flex flex-column flex-md-row justify-content-md-between">
                <h3>Ajout de nouvel utilisateur</h3>
                <div className="add-user-toolbar-button d-flex flex-column flex-md-row gap-3 align-self-end ">
                    <button >Annuler</button>
                    <button onClick={handleValidate}>Valider</button>
                </div>
            </div>
            
            <div className="add-user-form d-flex flex-column-reverse flex-md-row justify-content-between ">
                <div className='w-100'>
                    <h4>Informations personnelles</h4>
                    <Form className="form_group">                        
                        <Form.Group as={Row} className="mb-3 form-group" controlId="formPlaintext1">
                            <Form.Label className='form' column sm="4">
                                Nom
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    <Form.Control disabled ={onLoad} type="text" className={cx("input", {"input-error" : inputError.nom})} name="nom" onChange={handleInfoPersoChange} value={infoUser.nom}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext2">
                            <Form.Label className='form' column sm="4">
                                Prénoms
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    <Form.Control disabled ={onLoad} type="text"  className={cx("input", {"input-error" : inputError.prenoms})}  name="prenoms" onChange={handleInfoPersoChange} value={infoUser.prenoms}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext3">
                            <Form.Label className='form' column sm="4">
                                Date de naissance
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    < DatePicker  disabled ={onLoad}  className={cx("user-date_picker input", {"input-error" : inputError.ddn})}   name="ddn"  
                                       onChange={(date)=>(handleDateChange(date))} selected={infoUser.ddn}/>
                                </Col>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext4">
                            <Form.Label className='form' column sm="4">
                                Adresse
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    <Form.Control disabled ={onLoad} type="text"    name="adress"  className={cx("input", {"input-error" : inputError.adress})}  onChange={handleInfoPersoChange} value={infoUser.adress} />
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext5">
                            <Form.Label className='form' column sm="4">
                                Téléphone
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    <Form.Control disabled ={onLoad} type="number"    name="tel"  className={cx("input", {"input-error" : inputError.tel})}  onChange={handleInfoPersoChange} value={infoUser.tel}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext6">
                            <Form.Label className='form' column sm="4">
                                Rôle
                                </Form.Label>
                                <Col sm="8" className='form'>
                                    <Form.Select aria-label="Default select example " name="role" onChange={handleInfoPersoChange} value={infoUser.role}>                                       
                                        <option value="super_admin">Super Admnistrateur</option>
                                        <option value="admin_1">Administrateur niveau 1</option>
                                        <option value="admin_2">Administrateur niveau 2</option>
                                        <option value="admin_3">Administrateur niveau 3</option>
                                    </Form.Select>
                                </Col>
                        </Form.Group>     
                        <Form.Group as={Row} className="mb-3 add-user-radio " controlId="formPlaintext7">
                            <Form.Label className='form' column sm="4">
                                Genre
                                </Form.Label>
                                <Col sm="8" className='form check'>
                                    <Form.Check checked={infoUser.genre==="homme"?true:false} label ="Homme" inline id="check1"  disabled ={onLoad} type="radio"  name ="groupe" onChange={handleInfoPersoChange}    />
                                    <Form.Check label ="Femme" inline id="check2" disabled ={onLoad} type="radio"  name="groupe"  onChange={handleInfoPersoChange}/>
                                </Col>
                        </Form.Group>                                       
                    </Form>
                </div>
                <div className="security_info m-3 w-75">
                    <h4>Instructions:</h4>
                    <ul>
                        <li className='d-flex flex-row align-items-baseline gap-2' ><p>Nom:</p> Au moins 4 caractères (A-Z, a-z)</li>
                        <li className='d-flex flex-row align-items-baseline gap-2'><p>Prénoms:</p> Au moins 2 caractères (A-Z, a-z)</li>
                        <li className='d-flex flex-row align-items-baseline gap-2'><p>Date de Naissance:</p> jj/mm/aaa ou jj-mm-aa</li>
                        <li className='d-flex flex-row align-items-baseline gap-2'><p>Adresse:</p> Au moins 4 caractères(A-Z, 0-9)</li>
                        <li className='d-flex flex-row align-items-baseline gap-2'><p>Téléphone:</p> 10 chiffres(0-9)</li>
                        
                    </ul>
                </div>
                
            </div>


            <div className="add-user-login-form d-flex flex-column-reverse flex-md-row justify-content-between ">
                <div className='m-3 w-100'>
                    <h4>Login Sapass</h4>
                    <Form className="form_group">                        
                        <Form.Group as={Row} className="mb-3 form-group" controlId="formPlaintext8" autoComplete="off">
                            <Form.Label className='form' column sm="4">
                                Adresse Email 
                                </Form.Label>
                                <Col sm="8" className='form'>
                                <Form.Control disabled ={onLoad}  autoCorrect="off" spellCheck="false" autoComplete="off" className={cx("input", {"input-error" : inputError.email})} type="email" name="email" value= {loginUser.email} onChange={handleLoginChange}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext9">
                            <Form.Label className='form' column sm="4">
                                Mot de passe
                                </Form.Label>
                                <Col sm="8" className='form'>
                                <Form.Control disabled ={onLoad} autoCorrect="off" spellCheck={false} autoComplete="off" className={cx("input", {"input-error" : inputError.psswd})} type="password" name="psswd" value ={loginUser.psswd} onChange={handleLoginChange}/>
                                </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext10">
                            <Form.Label className='form' column sm="4">
                                Confirmer mot de passe
                                </Form.Label>
                                <Col sm="8" className='form'>
                                <Form.Control disabled ={onLoad} autoCorrect="off" spellCheck={false} autoComplete="off" className={cx("input", {"input-error" : inputError.confPsswd})} type="password" name="confPsswd" value ={loginUser.confPsswd} onChange={handleLoginChange}  />
                                </Col>
                        </Form.Group>
                    </Form>
                </div>
               
                <div className="security_info m-3 w-75">
                    <h4>Le mot de passe doit contenir:</h4>
                    <ul>
                        <li className={cx("", {"error" : psswdState.uppercase})}>Au moins une lettre majuscule (A-Z)</li>
                        <li className={cx("", {"error" : psswdState.number})}>Au moins un chiffre (0-9)</li>
                        <li className={cx("", {"error" : psswdState.length})}>Au moins 8 caractères</li>
                    </ul>
                </div>
            </div>
            
        </div>)
    
    }


export default AddUsers;
