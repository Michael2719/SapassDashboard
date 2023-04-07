
import { collection, addDoc, doc, setDoc , updateDoc, add, query, where, onSnapshot, orderBy } from "firebase/firestore"; 
import { db } from "../Fireabase";
import {uploadImage} from'../FirebaseOperation/UserOperation'

export const setDataCollab = (collab)=>{
    return new Promise(async(resolve, reject)=>{
        addDoc(collection(db, "clients"),{
            ...collab
        }).then((res)=>{
            //Update collab info with doc ID
            setDoc(doc(db, "clients", res.id), {id:res.id}, {merge:true}).then((res)=>{
             
                resolve(res)
            }).catch((err)=>{
                reject(err)
            });
        }).catch((err)=>{
            reject(err)
        })

        
    })
}

export const updateDataCollab =(collab, id)=>{
    return new Promise(async(resolve, reject)=>{
            //Update collab info with doc ID
            setDoc(doc(db, "clients", id), {...collab}, {merge:true}).then((res)=>{
             
                resolve(res)
            }).catch((err)=>{
                reject(err)
            });
        
    })
}

export const setDataBus = (collabId, bus, files)=>{
    return new Promise(async(resolve, reject)=>{
    const urlCg = await  uploadImage(files.cgImage) 
    const urlLicence = await uploadImage(files.licenceImage) 
    
    setDoc(doc(db,"clients" ,collabId ,"bus", bus.immatriculation),{
        ...bus, urlCg:urlCg, urlLicence: urlLicence
    }, {merge:true}).then((res)=>{
        
        setDoc(doc(db,"Receveur",bus.immatriculation),
                {cooperative:bus.cooperative, isActif:false, matricule: bus.immatriculation, mdp:bus.psswd},
                {merge:true}).then((res)=>{
                    resolve(res)
                }).catch((err)=>{
                    console.log(err)
                    reject(err)
                })
    }).catch((err)=>{
        console.log(err)
        reject(err)
    })  
    })
    
}

export const getDataCollab = (Callback)=>{
    return new Promise((resolve, reject)=>{
        try{
            const q = query(collection(db, "clients"));
            onSnapshot(q, (querySnapshot) => {
               const client =[] ;
           
               querySnapshot.forEach((doc) => {
                    client.push(doc.data());
                });
               if(Callback )
               {
                   Callback(client)
               } 
                resolve(client)        
             });
        }catch(err)
        {
            reject(err)
        }
       
    })
}

export const getDataCollabByField = (Callback=null,field, params)=>{
    
    return new Promise((resolve, reject)=>{
        try{
            let  _params ="" ;
            if(field ==="nom"){
                _params = params.toUpperCase()
                
            }else{
                _params = params
            }
            const q = query(collection(db, "clients"), where(field, '>=', _params),where(field, '<=', _params + '~'));
            onSnapshot(q, (querySnapshot) => {
               const client =[] ;
           
               querySnapshot.forEach((doc) => {
                    client.push(doc.data());
                });
               if(Callback )
               {
                   Callback(client)
               } 
          
                resolve(client)        
             });
        }catch(err)
        {
            reject(err)
        }
       
    })
}

export const getBus =(uid)=>{
    return new Promise((resolve, reject)=>{
        try{
            const q = query(collection(db, "clients",uid,"bus" ));
            onSnapshot(q, (querySnapshot) => {
                const bus =[] ;
            
                querySnapshot.forEach((doc) => {
                     bus.push(doc.data());
                 });
                
           
                 resolve(bus)        
              });
        }catch(err){
            reject(err)
        }
    })
}

export const getBusByImmatr =(uid, immatr)=>{
    return new Promise((resolve, reject)=>{
        try{
          
            onSnapshot(doc(db, "clients",uid,"bus",immatr ),{ includeMetadataChanges: true }, (doc)=>{
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
                resolve(doc.data())
            }) 
        }catch(err){
            reject(err)
        }
    })
}




