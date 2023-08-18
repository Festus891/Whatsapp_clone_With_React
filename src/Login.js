import React from 'react'
import "./Login.css"
import {Button} from '@mui/material';
import {auth, provider} from "./firebases"
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () =>{
        auth.signInWithPopup(provider).then((result) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: result.user,
          })
        })
        .catch((error) => alert(error.massage))
    }

  return (
    <div className='login'>
        <div className='login_container'>
             <h1>CLONED WHATSAPP</h1>
            <img  src='https://th.bing.com/th/id/R.66c510d8e3208ca8609dcf558e759c7e?rik=mUyqlrmhm3HSmA&pid=ImgRaw&r=0'/>
            <div className='login_text'>
              <h1>Sign in to Whatsapp</h1>
             </div>
             <Button onClick={signIn}>Sign in with Google</Button>
        </div>
        
    </div>
  )
}

export default Login