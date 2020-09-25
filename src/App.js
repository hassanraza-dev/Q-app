import React,{useEffect,useState} from 'react';
import './App.css';
import Router from './config/router'
import firebase  from './config/firebase'

function App() {
  useEffect(() => {
    listenAuthentication()
  }, [])

  const [isLoggedIn, setLoggedIn] = useState(true)
  
     const logOut = () => {
      firebase.auth().signOut()
      localStorage.clear()
     }

  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function(user) { 
      
      setLoggedIn(user ? { email: user.email, uid: user.uid ,name:user.displayName} : false)
    })
  }

  return (
    <div >
      
       {isLoggedIn  && <button onClick={logOut} className="btn btn-danger" style={{margin:"20px"}}>Logout</button>}
       {isLoggedIn  && <h4 style={{color:"white"}}>{isLoggedIn.name}</h4>}
      <Router isLoggedIn={isLoggedIn} />
    </div>
  )
 
}



export default App;
