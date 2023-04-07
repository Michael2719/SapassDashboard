import {React, useState, useRef} from 'react'
import { getStorage} from "firebase/storage";
import { uploadImage} from "../../../../FirebaseOperation/UserOperation"
import ProgressBar from 'react-bootstrap/ProgressBar';

  

export default function DrapAndDrop({onModalClose ,onPhotoURLChanged }) {
    
    const [uploadState, setUploadState] = useState("")
    const [uploadProgress, setUploadProgress] = useState(0)
   
    const handleFile =(files) =>{     
        console.log(files[0].name)
        const storage = getStorage();
        uploadImage( files[0] , callBackProgress ).then((url)=>{
            onPhotoURLChanged(url)
        }).catch((err)=>{
            console.log(err)
            onModalClose()
        })
         
      }
  
      const callBackProgress =(transferedBytes, uploadState) => {
        setUploadState(uploadState)
        setUploadProgress(transferedBytes)
     
      }

      // drag state
      const [dragActive, setDragActive] = useState(false);
      // ref
      const inputRef = useRef(null);
      
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
          handleFile(e.dataTransfer.files);
        }
      };
      
      // triggers when file is selected with click
      const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
          handleFile(e.target.files);
        }
      };
      
    // triggers the input when the button is clicked
      const onButtonClick = () => {
        inputRef.current.click();
      };
  
      return (<>
                
                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <div>
                    <p>Glisser et déposer votre photo ici</p>
                    <p>ou</p>
                    <button className="upload-button" onClick={onButtonClick}>Séléctionner votre photo</button>
                    <ProgressBar className='progressbar' animated now={uploadProgress} hidden ={uploadProgress ==0}  />
                    </div>
                     
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
                </form>
             </>

      );
}
