import {React,useState,useLayoutEffect, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faBackwardStep, faForwardStep  } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import cx from "classnames";
import { motion } from "framer-motion";

export default function CarteGrise({onPagePressed,handlePagePressState, nextPage, dataUp, dataDown}) {

    const [cg, setCg] = useState({immatriculation :"", genre:"", type:"" , marque:"", urlCg:"", nameCg:"", image:null})
    const [inputError, setInputError] =useState({immatriculation :false, genre:false, type:false , marque:false, urlCg:false, image:null})
    

    useEffect(()=>{
        if(onPagePressed){
            handleSubmit()
            handlePagePressState(false)
          
        }
    },[onPagePressed])

    useEffect(()=>{
        
        setCg(dataDown)
    },[])

    useEffect(()=>{
        dataUp(cg,"cg")
      },[cg])
    

    const handleInputCgChange = (e)=>{
        e.preventDefault()
        const name = e.target.name
        switch(name)
        {
            case 'imm' :
                setCg(t => ({...t, immatriculation: e.target.value}))
                setInputError(t => ({...t, immatriculation:false}))
                break;
            case 'genre' :
                setCg(t => ({...t, genre: e.target.value}))
                setInputError(t => ({...t, genre:false}))
                break;
            case 'type' :
                setCg(t => ({...t, type: e.target.value}))
                setInputError(t => ({...t, type:false}))
                break;
            case 'marque' :
                setCg(t => ({...t, marque: e.target.value}))
                setInputError(t => ({...t, marque:false}))
                break;                
              }
       
    }

    const handleSubmit=()=>{
        let temp = 0
        if(cg.immatriculation.trim()===""){
          temp++;  
          setInputError(t=>({...t, immatriculation:true}))
        }
        if(cg.genre.trim()===""){
          temp++;   
          setInputError(t=>({...t, genre:true}))
        }
        if(cg.type.trim()===""){
          temp++;   
          setInputError(t=>({...t, type:true}))
        }
        if(cg.marque.trim()===""){
          temp++;   
          setInputError(t=>({...t, marque:true}))
        }
        if(cg.urlCg.trim()===""){
            temp++
            setInputError(t=>({...t, urlCg:true}))
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
             setCg(t => ({...t, urlCg: url, image:e.target.files[0], nameCg: e.target.files[0].name}))   
             setInputError(t=>({...t, urlCg:false}))
        }
    }
    

    return (
        <div><Form >
        <h4>Carte Grise </h4>
        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
            <Form.Label className='form' column sm="4">
                Immatriculation
            </Form.Label>
            <Col sm="8" className='form'>
                <Form.Control className={cx("input",{"input-error": inputError.immatriculation})}  value ={ cg.immatriculation}   type="text"  name="imm" onChange = {handleInputCgChange}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext2" >
            <Form.Label className='form' column sm="4">
                Genre
            </Form.Label>
            <Col sm="8" className='form'>
                <Form.Control className={cx("input",{"input-error": inputError.genre})}  type="text"  name="genre" value={cg.genre} onChange = {handleInputCgChange}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext3">
            <Form.Label className='form' column sm="4">
                Type
            </Form.Label>
            <Col sm="8" className='form'>
                <Form.Control className={cx("input",{"input-error": inputError.type})}  type="text"  name="type" value ={cg.type} onChange = {handleInputCgChange}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext4">
            <Form.Label className='form' column sm="4">
                Marque
            </Form.Label>
            <Col sm="8" className='form'>
                <Form.Control className={cx("input",{"input-error": inputError.marque})} type="text"  name="marque" value = {cg.marque} onChange = {handleInputCgChange}/>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext5">
            <Form.Label className='form' column sm="4">
            <FontAwesomeIcon className='icon-file' icon = {faPaperclip}/>
            <span>Carte grise(Verso)</span>
            </Form.Label>
            <Col sm="8" className='form'>
                <div><input type="file" className={cx("input",{"input-error": inputError.urlCg})}  onChange ={handleFile}/> <span>{cg.nameCg}</span></div>     
            </Col>
        </Form.Group>
        
    </Form>  
   
    </div>
  )
}
