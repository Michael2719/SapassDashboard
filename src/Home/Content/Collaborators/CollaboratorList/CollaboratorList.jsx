import {React, useState,useEffect} from 'react';
import { getDataCollab, getDataCollabByField } from '../../../../FirebaseOperation/AddCollaboratorOperation';
import './CollaboratorList.css'
import StickyHeadTable from '../../../../Table/StickyHeadTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SelectMui from '../../../../InputsMui/SelectMui';
import { useNavigate } from 'react-router-dom';

const CollaboratorList = () => {
    const[collabData, setCollabData] = useState([])
    const[inputSearch, setInputSearch] = useState("")
    const[selectedIndex, setSelectedindex] = useState("nom")
    const navigate = useNavigate();
  
    const CollabCallback =(user)=>
    {
        setCollabData(user)      
    }
   


    useEffect(()=>{
        
        getDataCollab(CollabCallback)

    },[])
  

    const handleInputSearch = (e) =>{
        e.preventDefault();
        getDataCollabByField(CollabCallback,selectedIndex, e.target.value)
        setInputSearch(e.target.value)

    }
   
    const handleSelectMui =(option)=>{
        setSelectedindex(option)
        if(inputSearch !=="")
        {
            getDataCollabByField(CollabCallback,option, inputSearch)
        }
    }

    const handleOptionClick = (id, action)=>{
       
        switch (action){
            case 1 :
                navigate(`/sapass/clients/detail/${id}`)
                break
            case 2 :
                navigate(`/sapass/clients/update/${id}`)
                break
            case 3 :
                navigate(`/sapass/clients/car/${id}`)
                break
                    
        }
    }

    return (
         
        <div className='collab-container'>
            <div className='toolBar-collab'>
              <div className="toolbar-collab-left">
                <h4>Clients</h4> 
                <button className='btn-add-collab' onClick={()=>(navigate('/sapass/clients/add_client'))}>Ajouter</button>
              </div>
              <div className="toolbar-collab-rigth"> 
                <div  className="search-select">
                   <SelectMui onSelected = {handleSelectMui}/>
                </div>
                <div className="search-input">
                    <input type="text" className='input-search' id='search'  value={inputSearch} onChange= {handleInputSearch}/>
                    <div className='label'>
                        <label  htmlFor="search"><FontAwesomeIcon icon={faSearch} className="icon-search"/></label>
                    </div>
                </div>
              </div>
             

            </div>
            <div className='container-fluide collab-list-container'>
                <StickyHeadTable className="table" onClick ={handleOptionClick} data ={collabData}/>
            </div>



          

        </div>
    );
}

export default CollaboratorList;
