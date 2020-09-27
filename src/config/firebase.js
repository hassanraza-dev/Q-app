import * as firebase from 'firebase'
import 'firebase/firestore';
import {  useParams } from "react-router-dom";



  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCcI1FpIm3AgQhGrOkFbV3jIllmhuszqxQ",
    authDomain: "q-app-79e78.firebaseapp.com",
    databaseURL: "https://q-app-79e78.firebaseio.com",
    projectId: "q-app-79e78",
    storageBucket: "q-app-79e78.appspot.com",
    messagingSenderId: "212993066569",
    appId: "1:212993066569:web:c35c698a5657d158e06198",
    measurementId: "G-BQLK31VPVE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth();

  function registerUser(email,password){

   return auth.createUserWithEmailAndPassword(email,password)
   .then(userResonse => {
    console.log("user Id______>",userResonse.user.uid)
    const userId = userResonse.user.uid

    firebase.firestore().collection("users").doc(userId).set({
      email
    }).then(() => {
      alert("Rgistered!")
    })
  })
    
  }

  function loginUser(email,password){

   return auth.signInWithEmailAndPassword(email,password)
  .then(userResponse=> {
       const userId = userResponse.user.uid
        localStorage.setItem('userId', userId)
  })
    
  }

     function fbLogin()
     {
      var provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider).then(function(result) {
       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
       var token = result.credential.accessToken;
       // The signed-in user info.
       var user = result.user;
       console.log('user***',result)
       
       // ...
     }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // The email of the user's account used.
       var email = error.email;
       // The firebase.auth.AuthCredential type that was used.
       var credential = error.credential;
       // ...
     });
     }

    const addCompany = (name,since,timing,address,img,userId,ln ,lt)=>
    {

      const storageRef = firebase.storage().ref(`images/${Date.now()}`);
    
      storageRef.put(img).then(function(response){

        
    response.ref.getDownloadURL().then(function(url){
      

      firebase.firestore().collection('Companies').add({
        name,since,timing,address,url,userId,lt,ln
      }).then(function(){
       
        alert('Add successfully')
      
      }).catch(function(err){
        alert(err.message)
      })
    })
    }).catch(function(error){
      console.log(error)
  
    })
    
    }
    
    const addToken = (token,time,slug,regtime)=>
    {      
      
    
   
firebase.firestore().collection("Companies").doc(slug).update({
  token: token,
  time: time,
  regtime:regtime
 

})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});

    
    }
  
   const buyToken = (name,email,image,id)=>
   {
    const storageRef = firebase.storage().ref(`customerImg/${Date.now()}`);
    
    storageRef.put(image).then(function(response){

      
  response.ref.getDownloadURL().then(function(url){

    firebase.firestore().collection('Customer').add({
      name,email,url,id
    }).then(function(){
     
      alert('Add successfully')

      firebase.firestore().collection("Companies").doc(id).get()
      .then((res) => {

       console.log("ressss====>",res.data().token)

       let updateToken = res.data().token - 1

       firebase.firestore().collection('Companies').doc(id).update({
         token:updateToken
       })

    }).catch(e => {
      alert(e)
    })


    }).catch(function(err){
      alert(err.message)
    })
  })
  }).catch(function(error){
    console.log(error)

  })
   }




  export{
      registerUser,
      loginUser,
      fbLogin,
      addCompany,
      addToken,
      buyToken
      
}

export default firebase