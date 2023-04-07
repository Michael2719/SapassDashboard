import { getAuth, onAuthStateChanged , updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, setDoc ,onSnapshot, updateDoc } from "firebase/firestore"; 
import {db} from "../Fireabase"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();




export const getCurrentUser=()=>{
    const auth = getAuth();
    return new Promise((resolve, reject)=>{
        onAuthStateChanged(auth, (user)=>{
            resolve(user)
        })
    })
}

export const setData = async(user)=>{
    try{
         
        const docRef = await setDoc(doc(db, "Collaborateurs", user.uid), 
         {nom:"Taxi" , uid: user.uid}).then(()=>{
             console.log ("okokokoko") 
         }).catch((err=> console.log(err)))
        
     }
      
     catch (e) {
         console.log ("error") 
       }
 }

export const getData = (user, Callback=null)=>{
     return new Promise((resolve, reject)=>{
         try{
             onSnapshot(doc(db, "Collaborateurs", user.uid), { includeMetadataChanges: true }, (doc) => {
                const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            
                if(Callback && source ==="Server")
                {
                    Callback(doc.data())
                } 
                 resolve(doc.data())        
              });
         }catch(err)
         {
             reject(err)
         }
        
     })
     
    
 }

 export const updateData = (user)=>{
    return new Promise((resolve, reject)=>{
        var userRef = doc(db,"Collaborateurs",user.uid)        
       
        updateDoc(userRef, {
            ...user
          }).then((res)=>{
            resolve(res)
          }).catch((err)=>{
            reject(err)
          });
    })
 }


 export const uploadImage =( file , Callback=null)=>{
   return new Promise((resolve,reject)=>{
    const storageRef = ref(storage, 'images/'+file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
     // console.log('Upload is ' + progress + '% done');
      let state =""
      switch (snapshot.state) {
        case 'paused':
          state = "paused"
          break;
        case 'running':
         state = "running"
          break;
      }
      if(Callback!=null){
        Callback(progress, state)
      }
      
    }, 
    (error) => {
      // Handle unsuccessful uploads
      reject(error)
    }, 
    () => {getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
       
      });
    }
  );
   })

  
 
} 


    
   
