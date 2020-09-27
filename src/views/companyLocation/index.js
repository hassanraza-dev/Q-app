import React,{useState,useEffect} from 'react'
import Companymap from '../../components/Maps/Companymap'
import firebase from '../../config/firebase'
import {  useParams } from "react-router-dom";


const Companylocation = () => 
{
    useEffect(() => {
            getMap()
    },[])

const {slug} = useParams()

    const [ln ,setLn] = useState()
    const [lt ,setLt] = useState()


  const getMap = () => {
    firebase.firestore().collection('Companies').doc(slug)
    .get()
    .then(resp => {
        console.log("han bhai agaya data",resp.data().ln)
        console.log("han bhai agaya data",resp.data().lt)
        setLn(resp.data().ln)
        setLt(resp.data().lt)
    })
  }
  if(!ln && !lt){
    return <h1 style={{color:'white'}}>Loading...</h1>
  }
   return(
       <>
       <div>
     
           <h1 style={{textAlign:'center', color:'white' ,fontSize:'50px'}}>Companylocation</h1>
           <Companymap
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            lt={lt}
            ln={ln}
          />
       </div>
       </>
   )
    
    
}


export default Companylocation;