import {React, useLayoutEffect,useEffect,  useState} from 'react'
import { useParams} from 'react-router-dom';
import './BusCollaborator.css'
import { getDataCollabByField, setDataBus, getBusByImmatr } from '../../../../FirebaseOperation/AddCollaboratorOperation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMobile, faIdCard  } from '@fortawesome/free-solid-svg-icons';
import Summary from './Summary'
import CarteGrise from './CarteGrise';
import Licence from './Licence';
import LoginBus from './LoginBus';
import cx from "classnames";
import Modal from 'react-modal'
import ReactLoading from 'react-loading';
import { sha256 } from 'js-sha256';
import BasicAlert from '../../../../Alerts/BasicAlert'

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

export default function BusCollaborator() {

  let {id, immatr} = useParams()

  const [collabInfo, setCollabInfo ] = useState({})
  const [cg, setCg] = useState({immatriculation :"", genre:"", type:"" , marque:"",urlCg:"", nameCg:"",image:null})
  const [licence, setLicence]= useState({cooperative:"", zone:"", date:"", urlLicence:"",image:null})
  const [login, setLogin] = useState({ passwrd:"", confPasswrd:""})
  const [page, setPage] = useState(0)
  const [onPagePressed, setOnPagePressed] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false);
  const [showAlert, setShowAlert ] = useState(false)

  const handlePagePressState=(bool)=>{
    setOnPagePressed(bool)
  }

  const callBack = (data)=>{
    setCollabInfo(data[0])
  }


  useLayoutEffect(()=>{
    
    getDataCollabByField(callBack, "id", id)
  

  },[])

  const handleNext=()=>{
      setOnPagePressed(true)

  }

  const handlePrev=()=>{

    setPage(p=>(p-1))
 
    
  }

  const nextPage =()=>{
    if(page===2){
      openModal()
    }else{
      setPage(p=>(p+1))     
    }
    
  }
 
  const handleData = (data,component)=>{
     switch (component){
      case "cg":
        setCg(data)
        break
      case "licence":
        setLicence(data) 
        break
      case "login":
        setLogin(data)
        break
      default:
        break     
     }
  }

  const handleAlert=(bool)=>{
    setShowAlert(bool)
  }

  const handleValidate =()=>{
    setLoadingModalIsOpen(true)
    const hashPswd =sha256(login.passwrd);
    const bus ={immatriculation:cg.immatriculation,genre:cg.genre, type:cg.type, marque:cg.marque, cooperative: licence.cooperative, zone:licence.zone, date:licence.date, psswd :hashPswd}
    const files ={cgImage: cg.image, licenceImage: licence.image  }
    const collabId = id


    setDataBus(collabId,bus, files).then((res)=>{
      console.log(res)
      setShowAlert(true)
      setLoadingModalIsOpen(false)
      setIsOpen(false)
      
    }).catch((error)=>{
      setLoadingModalIsOpen(false)
      setIsOpen(false)
    })
   
  }

  /**MODAL */
  const openModal = ()=> {
    setIsOpen(true);
  }

  const afterOpenModal= ()=> {
  
  }

  const closeModal=()=> {
    setIsOpen(false);
  }

  const closeLoadingModal=()=> {
    setLoadingModalIsOpen(false);
  }

  const handleAlertFeedBack = (feedBack)=>{
    if(feedBack){
      window.location.reload(false);
    }
  }
 
 



  var componentList = [
    <CarteGrise onPagePressed = {onPagePressed}  handlePagePressState ={handlePagePressState} nextPage = {nextPage} dataUp={handleData} dataDown={cg} />,
    <Licence onPagePressed = {onPagePressed}  handlePagePressState ={handlePagePressState} nextPage = {nextPage} dataUp={handleData} dataDown={licence} />,
    <LoginBus onPagePressed = {onPagePressed}  handlePagePressState ={handlePagePressState} nextPage = {nextPage} dataUp={handleData} dataDown={login} immatriculation = {cg.immatriculation}  />
  ]
  return (<>
            <BasicAlert title ={"Opération éffectuée"} text ={""} icon ={"success"} confirmButtonText={"Fermer"} alertState={showAlert} setAlertState = {handleAlert} feedBack={handleAlertFeedBack}/>
            
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className={"modal_drag_and_drop"}>
                  <div className="page-summary">
                      <Summary className="loader" collabInfo ={collabInfo} cg ={cg} licence = {licence} closeModale={closeModal} handleValidate ={handleValidate}/>
                      
                  </div>
             
            </Modal>

            <Modal
                isOpen={loadingModalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeLoadingModal}
                style={customStyles}
                contentLabel="Example Modal"
                className={"modal_drag_and_drop"}>
                  <div className="page-loading">
                    <ReactLoading type={"bars"} color="#013142" />
                    <h4>Chargement</h4>
                  </div>
             
            </Modal>


            <div className='car-container'>
                <div className="collab-car-info">
                  <h3>{collabInfo.nom}</h3>
                  <h4>{collabInfo.prenom}</h4>
                  <p><FontAwesomeIcon className='icon-info' icon ={faMobile}/>{collabInfo.numero}</p>
                  <p><FontAwesomeIcon className='icon-info' icon ={faIdCard}/>{collabInfo.numeroCin}</p>   
                </div>
                <div className="progress-register">
              
                    <div className={cx("level-one level",{"current-level": page===0})} >
                      1
                    </div>
                    <div className={cx("level-one level",{"current-level": page===1})}>
                      2
                    </div>
                    <div className={cx("level-one level",{"current-level": page===2})}>
                      3
                    </div>

                    <div className={`progress-level step${page+1}`}>
                  
                    </div>
                    
                </div>
                <div className="car-carousel">
                  {componentList[page]}
                    
                </div>
              
                <div className="button-field">
                      <div>{page>0?<button className='btn-back' onClick={handlePrev}>Retour</button> :"" }</div> 
                      <div><button className='btn-next' onClick={handleNext}>{page===2?"Valider":"Suivant"}</button></div>
                </div>

              </div>
          </>

    


  )
}
