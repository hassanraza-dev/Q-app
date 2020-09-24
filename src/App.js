import React,{useEffect,useState} from 'react';
import './App.css';
import Router from './config/router'
import firebase  from './config/firebase'

function App() {
  useEffect(() => {
    listenAuthentication()
  }, [])

  const [isLoggedIn, setLoggedIn] = useState(true)
  
     

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function(user) { 
      
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false)
    })
  }

  return (
    <div >
      
       {isLoggedIn  && <button onClick={() => firebase.auth().signOut()} className="btn btn-danger" style={{margin:"20px"}}>Logout</button>}
      <Router isLoggedIn={isLoggedIn} />
    </div>
  )
 
}



export default App;
