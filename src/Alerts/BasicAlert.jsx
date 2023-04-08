import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";


/**https://sweetalert2.github.io/#examples
 * this Custom alert needs some parameters to use
 * title
 * text
 * icon
 * confirmButton
 * alertState : alert state needs to be true for show alert
 * setAlertState : setting alertState to false after each alert showed
 */
const BasicAlert = ({title, text, icon, confirmButtonText, alertState, setAlertState, feedBack=null}) => {
  
  const showAlert = () => {
        Swal.fire({
            title: title,
            text: text,
            
            confirmButtonColor: '#013142',
            icon: icon,
            confirmButtonText: confirmButtonText,
          }).then((res)=>{
           // console.log(res)                    
           /**{isConfirmed: true, isDenied: false, isDismissed: false, value: true}
                                                isConfirmed
                                                : 
                                                true
                                                isDenied
                                                : 
                                                false
                                                isDismissed
                                                : 
                                                false
                                                value
                                                : 
                                                true
                                                [[Prototype]]
                                                : 
                                                Object */
            setAlertState(false)
            if(icon==="success" && feedBack!=null){
                feedBack(true)
            }

          });

        
    }
        
    useEffect(()=>{
        if(alertState){
            showAlert();
        }
        
    }, [alertState])
    return  (
        <div></div>
    );
}

export default BasicAlert;
