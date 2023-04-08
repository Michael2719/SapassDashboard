import {React, useState, useEffect} from 'react';
import Modal from 'react-modal'
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

const CustomModal = ({children, setModal}) => {
    const [modalIsOpen, setModalisOpen]= useState(false)
 
    const closeModal =()=>{
        setModalisOpen(false)
    }


    useEffect(()=>{
        setModalisOpen(setModal)
    },[setModal])

    return (
        <div>
             <Modal
                isOpen={modalIsOpen}
                
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                className={"modal_drag_and_drop"}>
                
                    {children}
             
            </Modal>
        </div>
    );
}

export default CustomModal;
