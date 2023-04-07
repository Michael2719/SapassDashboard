import React, { useState, useEffect, useReducer} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AddCollaBorator.css'
import cx from "classnames";
import BasicAlert from "../../../../Alerts/BasicAlert";
import ConfirmAlert from "../../../../Alerts/ConfirmAlert";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { uploadImage } from "../../../../FirebaseOperation/UserOperation";
import { setDataCollab, getDataCollabByField, updateDataCollab } from "../../../../FirebaseOperation/AddCollaboratorOperation";
import { useNavigate, useParams } from "react-router-dom";


const AddCollaBorator = () => {
    const {id} =useParams();
    const [title, setTitle] = useState("")
    const [infoPerso, setInfoPerso] = useState({nom:"", prenom:"", numero: "", numeroMvola:""})
    const [infoCin, setInfoCin] = useState({ddn:"", ldn:"", numeroCin:"" , adress:"", arrond:"", profession:""})
    const [imageUrl, setImageUrl] = useState({recto :null, verso : null})
    const [image, setImage] = useState({recto:null, verso:null})
    const [inputError, setInputError] = useState({nom:false, prenom:false, numero: false, numeroMvola:false ,ddn:false, ldn:false, numeroCin:false , adress:false, arrond:false, profession:false, cinRecto:false, cinVerso:false})
    const [onSubmit, setOnSubmit] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [imageOnUpload, setImageOnUpload] = useState({recto:false , verso:false})
    const [onLoad, setOnLoad] = useState(false)
    const navigate = useNavigate();

//Handle Title 
useEffect(()=>{
    if(id){
        setTitle("Mise à jour du collaborateur")
        getDataCollabByField(null, "id",id ).then((res)=>{
            console.log(res[0])
            const collab = res[0]
            setInfoPerso({nom: collab.nom, prenom:collab.prenom, numero: collab.numero, numeroMvola:collab.numeroMvola})
            setInfoCin({ddn:collab.ddn, ldn:collab.ldn, numeroCin:collab.numeroCin , adress:collab.adress, arrond:collab.arrond, profession:collab.profession})
            setImageUrl({recto:collab.urlRecto, verso:collab.urlVerso})
        })
    }else{
        setTitle("Ajout de nouveau collaborateur")
    }
},[])   


// drag state
const [dragActive, setDragActive] = useState(false);

// handle drag events
const handleDrag = function(e) {
  e.preventDefault();
  e.stopPropagation();
  if (e.type === "dragenter" || e.type === "dragover") {
    setDragActive(true);
  } else if (e.type === "dragleave") {
    setDragActive(false);
  }
};

// triggers when file is dropped
const handleDrop = function(e) {
 
  e.preventDefault();
  e.stopPropagation();
  setDragActive(false);

  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    const image = URL.createObjectURL(e.dataTransfer.files[0])
    
    if(e.target.id ==="input-file-1"){
      
      setImageUrl(t => ({...t, recto : image}))
      setImage(t=>({...t, recto:e.dataTransfer.files[0]}))
      setInputError(t=>({...t, cinRecto:false}))
      
    }
    
    if(e.target.id =="input-file-2"){
  
      setImageUrl(t => ({...t, verso :  image}))
      setImage(t=>({...t, verso:e.dataTransfer.files[0]}))
      setInputError(t=>({...t, cinVerso:false}))
    }
  }

  console.log(image.recto)
};

// triggers when file is selected with click
const handleChange = function(e) {
  e.preventDefault();
  console.log(e.target.name)
  if(e.target.files && e.target.files[0]){
    
    const image = URL.createObjectURL(e.target.files[0])
    
    if(e.target.name ==="input-file-1"){
        setInputError(t=>({...t, cinRecto:false}))
        setImage(t=>({...t, recto:e.target.files[0]}))
        setImageUrl(t => ({...t, recto : image}))
      
    }
    
    if(e.target.name =="input-file-2"){
        setInputError(t=>({...t, cinVerso:false}))
        setImage(t=>({...t, verso:e.target.files[0]}))
        setImageUrl(t => ({...t, verso :  image}))
    }
    
  }
 
  if (e.target.files && e.target.files[0]) {
    handleFile(e.target.files);
  }
};


//handle informations personnelles change
const handleInputInfoChange = (e)=>{
    e.preventDefault()
    const name = e.target.name
    switch(name)
    {
        case 'nom' :
            setInfoPerso(t => ({...t, nom: e.target.value}))
            setInputError(t => ({...t, nom:false}))
            break;
        case 'prenoms' :
            setInfoPerso(t => ({...t, prenom: e.target.value}))
            setInputError(t => ({...t, prenom:false}))
            break;
        case 'numero' :
            setInfoPerso(t => ({...t, numero: e.target.value}))
            setInputError(t => ({...t, numero:false}))
            break;
        case 'numeroMvola' :
            setInfoPerso(t => ({...t, numeroMvola: e.target.value}))
            setInputError(t => ({...t, numeroMvola:false}))
            break;            
    }
   
}

//handle CIN change
const handleInputCinChange=(e)=>{
    e.preventDefault()
    const name = e.target.name
    switch(name)
    {
        case 'ddn' :
            setInfoCin(t => ({...t, ddn: e.target.value}))
            setInputError(t => ({...t, ddn:false}))
            break;
        case 'ldn' :
            setInfoCin(t => ({...t, ldn: e.target.value}))
            setInputError(t => ({...t, ldn:false}))
            break;
        case 'numeroCin' :
            setInfoCin(t => ({...t, numeroCin: e.target.value}))
            setInputError(t => ({...t, numeroCin:false}))
            break;
        case 'adress' :
            setInfoCin(t => ({...t, adress: e.target.value}))
            setInputError(t => ({...t, adress:false}))
            break;
        case 'arrond' :
            setInfoCin(t => ({...t, arrond: e.target.value}))
            setInputError(t => ({...t, arrond:false}))
            break;     
        case 'profession' :
            setInfoCin(t => ({...t, profession: e.target.value}))
            setInputError(t => ({...t, profession:false}))
            break;                 
    }
   
    
}

//Handle Cancel
const handleCancel =()=>{
    window.location.reload(false);
}

//handle submit button
const handleSubmit =  ()=>{
 
    //Verifing if all inputs and files inputs are not empty
    if(infoPerso.nom.trim()===""){
        setInputError(t => ({...t, nom:true}))
    }
    if(infoPerso.prenom.trim()===""){
        setInputError(t => ({...t, prenom:true}))
    }
    if(infoPerso.numero.trim()===""){
        setInputError(t => ({...t, numero:true}))
    }
    if(infoPerso.numeroMvola.trim()===""){
        setInputError(t => ({...t, numeroMvola:true}))
    }
    if(infoCin.ddn.trim()===""){
        setInputError(t => ({...t, ddn:true}))
    }
    if(infoCin.ldn.trim()===""){
        setInputError(t => ({...t, ldn:true}))
    }
    if(infoCin.numeroCin.trim()===""){
        setInputError(t => ({...t, numeroCin:true}))
    }
    if(infoCin.adress.trim()===""){
        setInputError(t => ({...t, adress:true}))
    }
    if(infoCin.arrond.trim()===""){
        setInputError(t => ({...t, arrond:true}))
    }
    if(infoCin.profession.trim()===""){
        setInputError(t => ({...t, profession:true}))
    }

    if(imageUrl.recto ===null)
    {
        setInputError(t =>({...t, cinRecto:true}))
    }

    if(imageUrl.verso ===null)
    {
        setInputError(t =>({...t, cinVerso:true}))
    }

    //set onSubmit trur
    setOnSubmit(true)
   
}

//Check if a true value exists in inputError 
//true means one or more input are empty
useEffect(()=>{
 
    if(onSubmit){
        if( JSON.stringify(inputError).includes(true))
        {
            //input validate
            setOnSubmit(false)
            setShowAlert(true)
        }else{
            //input invalidate
            setOnSubmit(false)
            setShowConfirmAlert(true)
            
        }
    }
},[inputError, onSubmit])

//Handle error alert
const handleAlertState =(bool)=>{
    setShowAlert(bool)
}

//Handle confirm alert
const handleConfirmAlertState = (bool)=>{
    setShowConfirmAlert(bool)
}


//Send data after validate alert 
const sendData = async () =>{

        /**If update */
        if(id){
            let urlRecto, urlVerso=""
            /**If update include image update */
            if(image.recto || image.verso){
                
                setOnLoad(true)
                if(image.recto){
                    setImageOnUpload(t=>({...t, recto:true}))
                    
                    try{
                        urlRecto  =await uploadImage(image.recto, callBackProgress)
                            
                        setImageOnUpload(t=>({...t, recto:false}))
                    }
                    catch(err){
                        setImageOnUpload(t=>({...t, recto:false}))
                    }
                    

                }
                if(image.verso){
                    setImageOnUpload(t=>({...t, verso:true}))
                    
                    try{
                        urlVerso  =await uploadImage(image.verso, callBackProgress)
                            
                        setImageOnUpload(t=>({...t, verso:false}))
                    }
                    catch(err){
                        setImageOnUpload(t=>({...t, verso:false}))
                    }
                }

                console.log(urlRecto)
                let info = {...infoPerso, ...infoCin }
                if(image.recto){
                    info ={...info, urlRecto}
                }
                if(image.verso){
                    info ={...info,urlVerso}
                }

                updateDataCollab(info, id).then((res)=>{
                    setOnLoad(false)
                window.location.reload(false);
                }).catch((err)=>{
                    setOnLoad(false)
                    console.log(err)
                })        
                
               
            }else{
                const info = {...infoPerso, ...infoCin }
                        
                updateDataCollab(info, id).then((res)=>{
                setOnLoad(false)
                window.location.reload(false);
                }).catch((err)=>{
                    setOnLoad(false)
                    console.log(err)
                })
            }
        }else{
                setOnLoad(true)
                setImageOnUpload(t=>({...t, recto:true}))
                
                uploadImage(image.recto, callBackProgress).then((url)=> {
                
                    setImageOnUpload(t=>({...t, recto:false}))
                
                    const urlRecto = url
                    setImageOnUpload(t=>({...t, verso:true}))
                    
                    uploadImage(image.verso, callBackProgress).then((url1)=>{
                        setImageOnUpload(t=>({...t, verso:false}))
                        const urlVerso = url1
                        const info = {...infoPerso, ...infoCin, urlRecto, urlVerso }
                        
                        setDataCollab(info).then((res)=>{
                            setOnLoad(false)
                            window.location.reload(false);
                        }).catch((err)=>{
                            setOnLoad(false)
                            console.log(err)
                        })
        
                        //When something goes wrong on upload VERSO
                    }).catch((err)=>{
                        setImageOnUpload(t=>({...t, verso:false}))
                    })
                    //When something goes wrong on upload RECTO
                }).catch((err)=>{
                    setImageOnUpload(t=>({...t, recto:false}))
                })
        }
      
       
}


const callBackProgress =(transferedBytes, uploadState) => {
  //  setUploadState(uploadState)
    setUploadProgress(transferedBytes)
 
  }

const handleFile =(files) =>{     
     
  }

    return (
        <div className='collab_container'>
          <h3>{title}</h3>
           
           <div className="row ">
                <div className="col col-sm-12 col-md-8 col-lg-6 ">
                        <div className='collab_info'>
                                <Form className="form_group">
                                        <h4>Informations personnelles</h4>
                                        
                                        <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                                            <Form.Label className='form' column sm="4">
                                            Nom
                                            </Form.Label>
                                            <Col sm="8" className='form'>
                                            <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.nom})}   name="nom" onChange={handleInputInfoChange} value ={ infoPerso.nom}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext2">
                                            <Form.Label className='form' column sm="4">
                                            Prenoms
                                            </Form.Label>
                                            <Col sm="8" className='form'>
                                            <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.prenom})} name="prenoms" onChange={handleInputInfoChange} value ={ infoPerso.prenom}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext3">
                                            <Form.Label className='form' column sm="4">
                                            Numero
                                            </Form.Label>
                                            <Col sm="8" className='form'>
                                            <Form.Control disabled ={onLoad} type="number" className={cx("input",{"input-error": inputError.numero})} name="numero" onChange={handleInputInfoChange} value ={ infoPerso.numero}/>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext4">
                                            <Form.Label  column sm="4" className='form'>
                                            Numero tel (Mvola)
                                            </Form.Label>
                                            <Col sm="8"className='form'>
                                            <Form.Control disabled ={onLoad} type="number" className={cx("input",{"input-error": inputError.numeroMvola})} name="numeroMvola"onChange={handleInputInfoChange} value ={ infoPerso.numeroMvola}/>
                                            </Col>
                                        </Form.Group>
                                </Form>
                            
                            </div>
                            <div className="collab_info cin">
                                <Form >
                                            <h4>CIN </h4>
                                            <Form.Group as={Row} className="mb-3 " controlId="formPlaintext1">
                                                <Form.Label className='form' column sm="4">
                                                Date de Naissance
                                                </Form.Label>
                                                <Col sm="8" className='form'>
                                                <Form.Control disabled ={onLoad}  type="text" className={cx("input",{"input-error": inputError.ddn})} name="ddn" onChange={handleInputCinChange} value ={ infoCin.ddn}/>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext2">
                                                <Form.Label className='form' column sm="4">
                                                Lieu de naissance
                                                </Form.Label>
                                                <Col sm="8" className='form'>
                                                <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.ldn})} name="ldn" onChange={handleInputCinChange} value ={ infoCin.ldn}/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext3">
                                                <Form.Label className='form' column sm="4">
                                                Numero CIN
                                                </Form.Label>
                                                <Col sm="8" className='form'>
                                                <Form.Control disabled ={onLoad} type="number" className={cx("input",{"input-error": inputError.numeroCin})} name="numeroCin" onChange={handleInputCinChange} value ={ infoCin.numeroCin}/>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext4">
                                                <Form.Label column sm="4" className='form'>
                                            Adresse
                                                </Form.Label>
                                                <Col sm="8"className='form'>
                                                <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.adress})} name="adress" onChange={handleInputCinChange} value ={ infoCin.adress}/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext4">
                                                <Form.Label column sm="4" className='form'>
                                            Arrondissement
                                                </Form.Label>
                                                <Col sm="8"className='form'>
                                                <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.arrond})} name="arrond" onChange={handleInputCinChange} value ={ infoCin.arrond}/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3 form" controlId="formPlaintext4">
                                                <Form.Label column sm="4" className='form'>
                                            Profession
                                                </Form.Label>
                                                <Col sm="8"className='form'>
                                                <Form.Control disabled ={onLoad} type="text" className={cx("input",{"input-error": inputError.profession})} name="profession" onChange={handleInputCinChange} value ={ infoCin.profession}/>
                                                </Col>
                                            </Form.Group>
                                            
                                    </Form>


                                <div className="container">
                                            <div className="row test ">
                                                <div className={cx(" col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 cin_img_container   input",{"input-error": inputError.cinRecto})} 
                                                    onDragEnter={handleDrag} 
                                                    name="input-file-1">
                                                 
                                                    <div className="cin_img"  draggable={false}>
                                                            <img  src={imageUrl.recto}alt="" />
                                                    </div>

                                                    <div className="drag_and_drop" draggable={false} hidden ={onLoad}>
                                                        <p>Glisser et déposer le fichier ici</p>
                                                        <p>OU</p>
                                                        <input  type="file" id="input-file-upload-1" name="input-file-1" multiple={false} onChange={handleChange} />
                                                    </div>
                                                    
                                                    { dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}  id="input-file-1"></div>}
                                                    
                                                    <div className='progressbar-cin'>
                                                         <ProgressBar variant="success"  animated now={uploadProgress} hidden ={!imageOnUpload.recto}   />
                                                    </div>    
                                                        
                                                </div>

                                                <div className={cx("col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 cin_img_container input",{"input-error": inputError.cinVerso})} 
                                                onDragEnter={handleDrag} 
                                                name="input-file-2"
                                                >

                                                    <div className="cin_img">
                                                        <img  src={imageUrl.verso}alt="" />
                                                </div>
                                                    
                                                    <div className="drag_and_drop" hidden ={onLoad}>
                                                        <p>Glisser et déposer le fichier ici</p>
                                                        <p>OU</p>
                                                        <input  type="file" id="input-file-upload-2" name="input-file-2" multiple={false} onChange={handleChange} />
                                                    
                                                    </div>
                                                    { dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} id="input-file-2"></div>}
                                                    <div className='progressbar-cin' >
                                                    <ProgressBar  className='progressbar-cin' variant="success"   animated now={uploadProgress} hidden ={!imageOnUpload.verso}  />
                                                    </div>
                                                </div>
                                            </div>
                                </div>
                            </div>
                </div>
                <div className="col col-sm-12 col-md-4 col-lg-6 button">
                        <button className="btn_validate" onClick={handleSubmit} >Valider</button>
                        <button className="btn_cancel" onClick={handleCancel} >Annuler</button>
                        <span>Tous les champs sont obligatoires!</span>
                </div>
           </div>
           
           <BasicAlert title ="Attention"  text ="Tous les champs doivent être remplis " icon ="error" confirmButtonText="Fermer" alertState = {showAlert} setAlertState ={handleAlertState} />
           <ConfirmAlert title ="Confirmation"  
                          text ="Etes-vous sure de vouloir valider?" 
                          icon ="warning" 
                          confirmButtonText="Valider" 
                          cancelButtonText ="Fermer!" 
                          alertState = {showConfirmAlert} 
                          setAlertState ={handleConfirmAlertState}
                          confirmCallBack = {sendData}
                          successMessageTitle =""
                          successMessagebody ="Traitement encours!"
                          /> 
     </div>
       
         
         
      
    );
}

export default AddCollaBorator;
