import React ,{useState,useEffect}from 'react'
import firebase from "../../config/firebase"


const Notification = () => 
   


{
    firebase.firestore().collection('Customer')
    .get()
    .then(res => {
        res.forEach(doc => {
            console.log('customer kaaa data',doc.data())
        })
    })


    
}




export default Notification;