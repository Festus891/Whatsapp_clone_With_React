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




function Chat() {
    const [seed, setSeed] = useState(" ")
    const[input, setInput] = useState("")
    const {roomId} = useParams();
    const[roomName, setRoomName] = useState("")

    useEffect(()=>{
        if(roomId) {
            db.collection("Rooms").doc(roomId).onSnapshot((snapshot) => (
                setRoomName(snapshot.data().name)
            ))
        }
    }, [roomId])

    useEffect(() =>{
            setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you type this>>>', input)
        setInput('')
    }
  return (
    <div className='chat'>
      <div className='chat_header'>
             <Avatar src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`}/>
            <div className='chat_headerInfo'>
                <h3>{roomName}</h3>
                <p>Last seen at....</p>
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
            <p className={`chat_message ${true && "chat_receiver"}`}> <span className='chat_name'>Festus</span>Hey guys <span className='chat_timestamp'>2:34pm</span></p>
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