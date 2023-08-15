import React from 'react'
import "./Login.css"
import {Button} from '@mui/material';
import {auth, provider} from "./firebases"



function Login() {

    const signIn = () =>{
        auth
        .signInWithPopup(provider)
        .then((result) => console.log(result))
        .catch((error) => alert(error.massage))
    }
  return (
    <div className='login'>
        <div className='login_container'>
             <h1>CLONED WHATSAPP</h1>
            <img  src='https://upload.wikimedia.org/wikipedia/whatsapp'/>
            <div>
              <h1>Sign in to Whatsapp</h1>
             </div>
             <Button onClick={signIn}>Sign in with Google</Button>
        </div>
        
    </div>
  )
}

export default Login