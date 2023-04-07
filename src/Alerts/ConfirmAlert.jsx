import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const ConfirmAlert = ({title, text, icon, confirmButtonText, cancelButtonText, alertState, setAlertState, confirmCallBack, successMessage,successMessagebody}) => {

  const showAlert = () => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText : cancelButtonText,
            confirmButtonText: confirmButtonText
          }).then((res)=>{
           
            if (res.isConfirmed) {
                confirmCallBack()
                Swal.fire(
                    successMessage,
                    successMessagebody,
                  'success'
                )
              }         
            setAlertState(false)
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

export default ConfirmAlert;
