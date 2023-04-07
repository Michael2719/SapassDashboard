import {React, useEffect} from 'react'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';

const createImageData = (url)=>{
  return {original:url, thumbnail:url}
 
 }


export default function BusDetails({bus}) {
  const imageCg = []
  const imageLicence = []
    useEffect(() => {
  
      imageCg.push(createImageData(bus.urlCg))
      imageLicence.push(createImageData(bus.urlLicence))
    },[bus]);
    
   
    

  return (
    <div className='modal-detail'>
        <div className="cg-detail">
            <div className="row carte-grise">
                <div className=" col-12 col-sm-12 col-md-6">
                  <h4>Carte grise</h4>
                  <div className="row-details">
                    <p>Immatriculation: </p><span>{bus.immatriculation}</span>
                  </div>
                  <div className="row-details">
                    <p>Marque: </p><span>{bus.marque}</span>
                  </div>
                  <div className="row-details">
                    <p>Genre: </p><span>{bus.genre}</span>
                  </div>
                  <div className="row-details">
                    <p>Modèle: </p><span>{bus.type}</span>
                  </div> 
                </div>
                <div className="col-12 col-sm-12 col-md-6 image-container">
                  <ImageGallery showNav ={false} showThumbnails={false}  className="image-gallery" showPlayButton={false}  items={imageCg} />
                </div>
            </div>
        </div>
        <div className="licence-detail">
            <div className="row licence">
                <div className="col-12 col-sm-12 col-md-6 image-container">
                  <ImageGallery showNav ={false} showThumbnails={false}  className="image-gallery" showPlayButton={false}  items={imageLicence} />
                </div>
                <div className=" col-12 col-sm-12 col-md-6">
                  <h4>Licence</h4>
                  <div className="row-details">
                    <p>Coopérative: </p><span>{bus.cooperative}</span>
                  </div>
                  <div className="row-details">
                    <p>Zone: </p><span>{bus.zone}</span>
                  </div>
                  <div className="row-details">
                    <p>Date: </p><span>{bus.date}</span>
                  </div>
                   
                </div>
                
            </div>
        </div>

    </div>
  )
}
