import {React, useState, useEffect }from 'react';
import './CollaboratorDetails.css'
import { useParams, useNavigate} from 'react-router-dom';
import Modal from 'react-modal'
import BusDetails from './BusDetails';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import StickyHeadTableBus from '../../../../Table/StickyHeadTablebus';

import { getDataCollabByField, getBus } from '../../../../FirebaseOperation/AddCollaboratorOperation';

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

  const createImageData = (url)=>{
   return {original:url, thumbnail:url}
  
  }

const CollaboratorInformation =({collab})=>{

   return(<div className='page collab-info'>
                
            <div>
                <div><p>Date de naissance: </p><p>{collab.ddn}</p></div>
                <div> <p>Lieu de naissance: </p><p>{collab.ldn}</p></div>
                <div><p>Adresse: </p><p>{collab.adress}</p></div>
                <div><p>Arrondissement: </p><p>{collab.arrond}</p></div>
                <div><p>Profession: </p><p>{collab.profession}</p></div>
                <div><p>Numero CIN: </p><p>{collab.numeroCin}</p></div>
                <div><p>Identifiant SAPASS: </p><p>{collab.id}</p></div>                
            </div>
          
            
    </div>)
}

const CollabProfil = ({collab})=>{
    return(<>
        <div className="page profil-collab">
            <img src="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?b=1&s=612x612&w=0&k=20&c=eU56mZTN4ZXYDJ2SR2DFcQahxEnIl3CiqpP3SOQVbbI=" alt="" />
            <p>{collab.nom}</p>
            <p>{collab.prenom}</p>
            <p>{collab.numero}</p>
        </div>
    </>)
}

const CollaboratorCin =({collab})=>{
    const images = []
    images.push(createImageData(collab.urlRecto))
    images.push(createImageData(collab.urlVerso))
    return(<>
        <div className="page cin-swiper">
            
            <ImageGallery showNav ={false}  className="image-gallery" showPlayButton={false}  items={images} />
        </div>
        
        
    </>)
}



const CollaboratorDetails = () => {

    let {id} = useParams()
    const [page, setPage] = useState(0)
    const [bus, setBus] = useState([])
    const [collab, setCollab] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dataBus, setDataBus] = useState({})
    const navigate = useNavigate();

    const handlePage = (index)=>{
        setPage(index)
    }

    const title = [
        "Profil","Informations supplémentaires","CIN"
    ]

    const handleTableClick = (busImmatricule, action)=>{
        switch (action){
            case 1:
                showBusDetails(busImmatricule)
                break
            case 2:
                editBusDetails(busImmatricule)
                break;
            default:
                break;        
        }

    }

    const showBusDetails = (immatriculation)=>{
        let index =bus.findIndex(x=>x.immatriculation===immatriculation)
     
        setDataBus(bus[index])
        openModal()
    }

    const editBusDetails =() =>{
        navigate('/sapass/client/car/update/2atipVFm3RJjg7cb6Gwi/0781TP')
    }

    useEffect(()=>{
        getDataCollabByField(null, "id", id).then((res)=>{
            
            setCollab(res[0])
        }).catch((err)=>{
            console.log(err)
        })

        getBus(id).then((res)=>{
            setBus(res)
            
            console.log()
        })
        

    },[])


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

  }

    return (
        <div id='detail'>
             <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className={"modal_bus-detail"}>
                  <div className='bus-detail'>
                      <BusDetails bus = {dataBus}/>
                     
                  </div>
             
            </Modal>
           <div className="container-fluide detail">
                    <div className="left-page-title">
                        {title[page]}
                    </div>
               <div className="row row-detail ">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-3 left-page">
                        
                        <div className="left-page-body">
                            <Swiper
                                cssMode={true}
                                navigation={true}
                                
                                pagination={true}
                                mousewheel={true}
                                keyboard={true}
                                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                                className="mySwiper"
                                spaceBetween={50}
                                slidesPerView={1}
                                onSlideChange={(swiper) => handlePage(swiper.activeIndex)}
                                onSwiper={(swiper) => console.log(swiper.activeIndex)}
                                >
                                <SwiperSlide><CollabProfil collab = {collab}/></SwiperSlide>    
                                <SwiperSlide><CollaboratorInformation collab = {collab}/></SwiperSlide>
                                <SwiperSlide><CollaboratorCin collab = {collab}/></SwiperSlide>
                            </Swiper>
                        </div>

                    </div>
                    <div className="col-12 col-md-12 col-lg-12 col-xl-9 right-page" >
                        <div className="list-bus">
                            <StickyHeadTableBus data =  {bus} onClick = {handleTableClick} />
                        </div>
                    </div>
               </div>
           </div>
        </div>
    );
}

export default CollaboratorDetails;
