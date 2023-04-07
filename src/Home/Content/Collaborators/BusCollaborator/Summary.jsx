import React from 'react';
import ImageGallery from 'react-image-gallery';

const createImageData = (url)=>{
    return {original:url, thumbnail:url}
   
   }


const Summary = ({collabInfo,cg,licence, closeModale , handleValidate}) => {
    const handleClose =()=>{
        closeModale()
    }

    const validate =()=>{
        
        handleValidate()
    }
    const imageCin = []
    const imageLicence = []
    imageCin.push(createImageData(cg.urlCg))

    imageLicence.push(createImageData(licence.urlLicence))
    return (
        <div className='summary-content'>
           <div className="row">
                <div className="col-12 col-sm-12 col-md-5 collab-desc">
                    <h4>Recapitulatif</h4>
                    <p>{collabInfo.nom}</p>
                    <p>{collabInfo.prenom}</p>
                    <p>{collabInfo.adress}</p>
                    <p>{collabInfo.numero}</p>
                    <p>CIN {collabInfo.numeroCin}</p>
                    <p>ID {collabInfo.id} </p>
                    
                    <div className='button-summary'>
                        <button onClick={handleClose}>Modifier</button>
                        <button onClick={validate}>Valider</button> 
                    </div>    
                </div>
                <div className="col-12 col-sm-12 col-md-7 collab-bus">
                    <div className="cg">
                        <div >
                            <div><p className="Label">Immatriculation:</p><span>{cg.immatriculation}</span></div> 
                            <div><p className="Label">Genre:</p><span>{cg.genre}</span></div>
                            <div><p className="Label">Marque:</p><span>{cg.type}</span></div>
                            <div><p className="Label">Type:</p><span>{cg.marque} 5</span></div>
                        </div>
                        <div>
                            <ImageGallery showNav ={false} showThumbnails={false}  className="image-gallery" showPlayButton={false}  items={imageCin} />
                         
                        </div>
                    </div>
                    <div className="cg">
                        <div >
                            <div><p className="Label">Cooperative:</p><span>{licence.cooperative}</span></div> 
                            <div><p className="Label">Zone:</p><span>{licence.zone}</span></div>
                            <div><p className="Label">date:</p><span>{licence.date}</span></div>
                           
                        </div>
                        <div>
                        <ImageGallery showNav ={false} showThumbnails={false}  className="image-gallery" showPlayButton={false}  items={imageLicence} />
                        </div>
                    </div>
                    <div className="cg">
                        
                    </div>
                 
                    
                </div>
           </div>
        </div>
    );
}

export default Summary;
