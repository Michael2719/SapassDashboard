import React from "react";
import "./Login.css";
import { Button, Form, FormGroup, Label, Input, Card, CardImg  } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import {useState, useEffect} from 'react'
import {signInWithEmailAndPassword}from "../../node_modules/firebase/auth";
import { auth } from "../Fireabase";
import { useNavigate } from "react-router-dom";
import {firebaseResponseError} from '../FirebaseOperation/FirebaseErrorList'
import BasicAlert from "../Alerts/BasicAlert";

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
  const [pswdErr, setPswdErr] = useState("")
  const [emailErr, setEmailErr] = useState("")
  const [hiddenTxt, setHiddenTxt] = useState("")
  const [hiddenLoad, setHiddenLoad] = useState("hidden")
  const [errMessage , setErrMessage] = useState("")
  const [alertState, setAlertState] = useState(false)
  const navigate = useNavigate();

  const handleAlertState = (bool)=>{
    setAlertState(false)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user )
      {
        navigate("/sapass")
      }
    })
  },[] );

  const handleChange = (e)=>{
  
    if(e.target.id ==="_email"){
        setEmail(e.target.value)
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && emailErr!=="")
        {
            setEmailErr("")
        }
    }else
    {
        setPassword(e.target.value)
        if(password.length>=8 && pswdErr!=="")
        {
            setPswdErr("");
        }
    }
    
  } 

   const onSubmit = async(e) =>{
    

    if(password.length<8)
    {
        setPswdErr("input-error")
    }else
    {
        setPswdErr("")
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
    {
       setEmailErr("input-error")
    }else
    {
        setEmailErr("")
    } 

    if(password.length>=8 && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) )
    {
          setHiddenLoad("")
          setHiddenTxt("hidden")    
          try{
            await signInWithEmailAndPassword(auth, email, password).then((res)=>{
              setHiddenLoad("hidden")
              setHiddenTxt("")    
              if(res.user.emailVerified)
              {
                 navigate("/sapass")
              }
            });
            
          }catch(err)
          {
           
            setHiddenLoad("hidden")
            setHiddenTxt("") 
            setErrMessage( firebaseResponseError[err.code])
            setAlertState(true)

          }
        
    }
  }

  return (
    <div className="background">
      <div className="login-box">
      <div className="container">
        <div className="row app-des">
          <div className="col col-sm-4 col-md-4 left-background ">
            <h2>Sapass</h2>
            <div className="logo"></div>
          </div>
          <div className="col col-sm-8 col-md-8 login-form">
            <form>
              <h2 className="font-weight-bold mb-4">Connexion</h2>
              <FormGroup>
                <Label className="font-weight-bold mb-2">Email</Label>
                <Input id="_email" className ={"mb-3 "+emailErr} type="email" placeholder="rakoto@exemple.com"  value = {email} onChange = {handleChange} disabled= {hiddenTxt ==="hidden"? true : false }/>
                <Label className="font-weight-bold mb-2">Mot de passe</Label>
                <Input id="_pswd" className={"mb-3 "+pswdErr} type="password" placeholder="Au moins 8 caractères" value = {password} onChange = {handleChange} disabled =  {hiddenTxt ==="hidden"? true : false } />
               

              </FormGroup>
              <Button className="mt-3  btn btn-submit" onClick={onSubmit} > 
                <span className={""+hiddenTxt}>Connecter vous à votre compte</span>
                <span className={"spinner-grow spinner-grow-sm "+hiddenLoad} role="status" aria-hidden="true"></span>
                <span className={"sr-only chargement "+hiddenLoad} >Chargement</span>
              </Button>
              <div className="forgotPswd"><span>Mot de passe oublié?</span></div>
              
              {/* <><div className="text-center m-4">or continue with social account</div>
              <GoogleLoginButton className="mt-3 mb-3 px-auto text-center"/></>*/}
            </form>
          </div>
        </div>
      </div>
      <BasicAlert 
            title ="Une erreur est survenue" 
            text ={errMessage} icon = "error" 
            confirmButtonText ="Fermer" 
            alertState ={alertState} 
            setAlertState = {handleAlertState} />
      </div>
    </div>
  );
}

export default Login;
