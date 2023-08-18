import React, { useEffect, useState } from 'react'
import './Chat.css'
import {Avatar, IconButton} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AttachFile from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useParams } from 'react-router-dom';
import db from './firebases';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useStateValue } from './StateProvider';





function Chat() {
    const [seed, setSeed] = useState(" ")
    const[input, setInput] = useState("")
    const {roomId} = useParams();
    const[roomName, setRoomName] = useState("")
    const[message, setMessage] = useState([])
    const [{user}, dispatch] = useStateValue();
    
    

    useEffect(()=>{
        if(roomId) {
            db.collection("Rooms").doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ));

            db.collection("Rooms").doc(roomId).collection("Messages").orderBy('timestamp', 'asc').onSnapshot(snapshot =>(
                setMessage(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() =>{
            setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you type this>>>', input)
        db.collection("Rooms").doc(roomId).collection("Messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('')
    }
  return (
    <div className='chat'>
      <div className='chat_header'>
             <Avatar src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`}/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>Last seen{" "}
                    {new Date(message[message.length - 1] ?.timestamp?.toDate()).toUTCString()}
                </p>
            </div>

            <div className='chat_headerRight'>
                <IconButton>
                    <SearchOutlinedIcon />
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
      </div>

      <div className='chat_body'>
            {
                message.map(messages =>(
                    <p className={`chat_message ${messages.name === user.displayName && "chat_receiver"}`}> <span className='chat_name'>{messages.name}</span>{messages.message} <span className='chat_timestamp'>{new Date(messages.timestamp ?.toDate()).toUTCString()}</span></p>
                ))
            }
      </div>

      <div className='chat_footer'>
            <InsertEmoticonIcon />
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} type='text' placeholder='Type a message' />
                <button type='submit' onClick={sendMessage}>Send a messeage</button>
            </form>
            <MicIcon/>
            

      </div>
    </div>
  )
}

export default Chat