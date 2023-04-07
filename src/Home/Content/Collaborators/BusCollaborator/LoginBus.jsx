import {React,useState,useEffect} from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import cx from "classnames";

const LoginBus = ({onPagePressed,handlePagePressState, nextPage, dataUp, dataDown,immatriculation}) => {


    const [login, setLogin] = useState({ passwrd:"", confPasswrd:""})
    const [inputError, setInputError] =useState({passwrd:false, confPasswrd:false })

    useEffect(()=>{
      if(onPagePressed){
          handleSubmit()
          handlePagePressState(false)
        
      }
    },[onPagePressed])
    
    useEffect(()=>{
      setLogin(dataDown)
  },[])
    
    useEffect(()=>{
      dataUp(login,"login")
    },[login])


    const handleInputCgChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        switch(name)
        {        
            case 'psswd' :
                setLogin(t => ({...t, passwrd: e.target.value})) 
                setInputError(t => ({...t, passwrd:false}))  
                break;   
    
            case 'confPsswd' :
                setLogin(t => ({...t, confPasswrd: e.target.value}))   
                setInputError(t => ({...t, confPasswrd:false}))
                break;     
              }      
    }
    
    const handleSubmit=()=>{
        let temp = 0
        if(login.passwrd.trim().length<4){
          temp++;  
          setInputError(t=>({...t, passwrd:true}))
        }
        if(login.confPasswrd.trim().length<4){
          temp++;   
          setInputError(t=>({...t,confPasswrd :true}))
        }

        if(login.confPasswrd.trim()!==login.confPasswrd.trim())
        {
          setInputError(t=>({...t,confPasswrd :true}))
          setInputError(t=>({...t, passwrd:true}))
          temp++; 
        }
        
        if(temp===0){
          nextPage()
      }
    }


    return (
        <div>
             <Form>
                <h4>Login Sapass</h4>
                  <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                            <Form.Label className='form' column sm="4">
                                Imatriculation (Identifiant)
                            </Form.Label>
                            <Col sm="8" className='form'>
                              <Form.Control className={cx("input",{"input-error": inputError.immatriculation})}  disabled type="text"  name="ddn" value={immatriculation}  />
                            </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                            <Form.Label className='form' column sm="4">
                                Mot de passe
                            </Form.Label>
                            <Col sm="8" className='form'>
                              <Form.Control className={cx("input",{"input-error": inputError.passwrd})}  type="password"  name="psswd" onChange = {handleInputCgChange} value={login.passwrd}/>
                            </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                            <Form.Label className='form' column sm="4">
                               Confirmer mot de passe
                            </Form.Label>
                            <Col sm="8" className='form'>
                              <Form.Control  className={cx("input",{"input-error": inputError.confPasswrd})} type="password"  name="confPsswd" onChange = {handleInputCgChange}  value={login.confPasswrd}/>
                            </Col>
                  </Form.Group>
                </Form>
        </div>
    );
}

export default LoginBus;
