import React,{useState} from 'react'
import  './index.css'
import {registerUser,loginUser,fbLogin} from '../../config/firebase.js'
import {useHistory} from 'react-router-dom'


const Login = function(){
    const history = useHistory()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [msg,setMsg] = useState('')

    const onRegister = async function()
    {
        try
        {
            await registerUser(email,password)
            setMsg('Register Successfully')
        }catch(error)
        {
            setMsg(error.message)
        }
       

    }

    const onLogin = async function()
    {
        try
        {
            await loginUser(email,password)
            alert("welcome")
            history.push('/home')
          
        }
        catch(error)
        {
           
            console.log('hahah',error.message)
            setMsg(error.message)
        }
       

    }

    const loginFB  = function() {
        fbLogin()
        history.push('/home')
    }
    

    return(
        <>
        <p  style={{textAlign:'center'}}>{msg}</p>
          <div className="main">
    
    <p className="sign" align="center">Sign in</p>
    <div className="form1">
      <input className="un " type="email" align="center" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
      <input className="pass" type="password" align="center" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
      <div style={{ display:'flex',justifyContent:"center"}}>
      <button className="submit" align="center" onClick={onLogin}>Login</button>
      <button className="submit" align="center" onClick={onRegister}>Sign up</button>
      </div>
      <div className='fb'>
      <button className="loginBtn loginBtn--facebook" onClick={loginFB}>
  Login with Facebook
</button>
</div>
      
        </div>
                
    </div>
        </>
    )
}

export default Login;