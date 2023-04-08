// Import the functions you need from the SDKs you need

import { initializeApp } from "../../node_modules/firebase/app";
import {getAuth, createUserWithEmailAndPassword, signOut,sendEmailVerification, deleteUser} from "../../node_modules/firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu7-gSxO6M176VFmEMj_jkg8RHuvcc2S8",
  authDomain: "sapass-d028e.firebaseapp.com",
  projectId: "sapass-d028e",
  storageBucket: "gs://sapass-d028e.appspot.com",
  messagingSenderId: "38592385095",
  appId: "1:38592385095:web:464fd1ce93ad69cf7a6162",
  measurementId: "G-7ZCERJEM75"
};

// Initialize Firebase
const secondaryApp = initializeApp(firebaseConfig, "Secondary");
const auth1= getAuth(secondaryApp)

const checkEmailIsVerified =(callBack)=>{
  let compteur =0
  const onIdTokenChangedUnsubscribe=auth1.onIdTokenChanged((user)=>{
    console.log(compteur)
    if(user){
      if(compteur>=100 && !user.emailVerified ){
      
        deleteUser(auth1.currentUser).then(()=>{
          callBack(false)
          signOut(auth1)
          return onIdTokenChangedUnsubscribe()
        })
        
      }  
    }
    

    if (user && user.emailVerified) {
   
       //unsubscribe
        callBack(true)      
        signOut(auth1)
        return onIdTokenChangedUnsubscribe()
    }else{
      if(auth1.currentUser!==null){
        setTimeout(()=>{
          compteur +=10;
          auth1.currentUser.reload();
          auth1.currentUser.getIdToken(true)
        },10000)
      }   
    }
  })
}

export const addNewUserAuth =(email, password, callBack)=>{
  return new Promise((resolve, reject)=>{

    createUserWithEmailAndPassword(auth1, email, password)
      .then(() => {
        sendEmailVerification(auth1.currentUser).then((res)=>{
          checkEmailIsVerified(callBack)
          resolve("Email sent")
          
        }).catch((err)=>{
          reject(err)
        })
      
      })
      .catch((error) => {
        console.log(error.code)
        const errorCode = error.code;
        const errorMessage = error.message;
        
        reject(error)
      });

  })
    
}
/*const onAuthStateChangedUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    setEmailVerified("Sent");
    await user.sendEmailVerification();
    const onIdTokenChangedUnsubscribe = firebase.auth().onIdTokenChanged((user) => {
      if (user && user.emailVerified) {
        setEmailVerified("Verified");
        return onIdTokenChangedUnsubscribe(); //unsubscribe
      }
      setTimeout(() => {
        firebase.auth().currentUser.reload();
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ /*true);
     /* }, 10000);
    });
  }
});*/