import {React,useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip  } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import cx from "classnames";
import { motion } from "framer-motion";

const Licence = ({onPagePressed,handlePagePressState, nextPage,dataUp, dataDown}) => {
    const [licence, setLicence]= useState({cooperative:"", zone:"", date:"", urlLicence:"", nameLicence:"", image:null})
    const [inputError, setInputError] =useState({cooperative:false, zone:false, date:false, urlLicence:false})


  useEffect(()=>{
    
      if(onPagePressed){
          handleSubmit()
          handlePagePressState(false)
        
      }
  },[onPagePressed])

  useEffect(()=>{
    setLicence(dataDown)
  },[])

  useEffect(()=>{
    dataUp(licence,"licence")
  },[licence])

    const handleInputCgChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        switch(name)
        {
            case 'coop' :
                setLicence(t => ({...t, cooperative: e.target.value}))
                setInputError(t => ({...t, cooperative:false}))   
                break;
            case 'zone' :
                setLicence(t => ({...t, zone: e.target.value}))   
                setInputError(t => ({...t, zone:false}))
                break;    
            case 'date' :
                setLicence(t => ({...t, date: e.target.value}))   
                setInputError(t => ({...t, date:false}))
                break; 
              }
       
    }
    
    const handleSubmit=()=>{  
        let temp = 0
        if(licence.cooperative.trim()===""){
          temp++; 
          setInputError(t=>({...t, cooperative:true}))
        }
        if(licence.zone.trim()===""){
          temp++; 
          setInputError(t=>({...t, zone:true}))
        }
        if(licence.date.trim()===""){
          temp++; 
          setInputError(t=>({...t, date:true}))
        }
        if(licence.urlLicence.trim()===""){
          temp++
          setInputError(t=>({...t, urlLicence:true}))
      }
        if(temp===0){
         
          nextPage()
      }
    }

    const handleFile=(e)=>{
      e.preventDefault();
      if(e.target.files && e.target.files[0]){
          console.log(e.target.files[0].name)
           const url = URL.createObjectURL(e.target.files[0]) 
           setLicence(t => ({...t,urlLicence: url, nameLicence: e.target.files[0].name, image:e.target.files[0], })) 
           setInputError(t=>({...t, urlLicence:false}))
      }
  }

    return (
        <div>
            <div>
              <Form >
                    <h4>Licence </h4>
                      <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                          <Form.Label className='form' column sm="4">
                              Cooperative
                          </Form.Label>
                          <Col sm="8" className='form'>
                            <Form.Control className={cx("input",{"input-error": inputError.cooperative})}  type="text"  name="coop" value={licence.cooperative}  onChange = {handleInputCgChange} />
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                          <Form.Label  className='form' column sm="4">
                              Zone
                          </Form.Label>
                          <Col sm="8" className='form'>
                            <Form.Control className={cx("input",{"input-error": inputError.zone})}  type="text"  name="zone"  value={licence.zone}  onChange = {handleInputCgChange}/>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                          <Form.Label className='form' column sm="4">
                              Date d'acquisition
                          </Form.Label>
                          <Col sm="8" className='form'>
                            <Form.Control className={cx("input",{"input-error": inputError.date})}  type="text"  name="date" value={licence.date}  onChange = {handleInputCgChange}/>
                          </Col>
                      </Form.Group>
                      <Form.Group as={Row} className="mb-3 " controlId="formPlaintext5">
                        <Form.Label className='form' column sm="4">
                             <FontAwesomeIcon className='icon-file' icon = {faPaperclip}/>
                             <span>Licence(Verso)</span>
                        </Form.Label>
                        <Col sm="8" className='form'>
                        <div><input type="file" className={cx("input",{"input-error": inputError.urlLicence})}  onChange ={handleFile}/> <span>{licence.nameLicence}</span></div> 
                        </Col>
                     </Form.Group>
              </Form>    
            
            </div>
        </div>
    );
}

export default Licence;
