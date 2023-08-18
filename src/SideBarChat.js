import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import Avatar from '@mui/material/Avatar';
import   db from  './firebases';
import { Link } from 'react-router-dom';





function SideBarChat({id, name, addNewChat}) {

    const [seed, setSeed] = useState(" ")
    const[messages, setMessages] = useState("")

    useEffect(() => {
        if(id) {
          db.collection("Rooms")
            .doc(id)
            .collection("Messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => 
              setMessages(snapshot.docs.map((doc) => 
                doc.data())))
        }
    }, [id])
    

    useEffect(() =>{
            setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createChat = () =>{
        const roomName = prompt("please enter name for chat");

        if(roomName){
            db.collection("Rooms").add({
                name: roomName,
            })
            //clever database here
        }
    }


  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
                <div className='SidebarChat'>
                    <Avatar src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${seed}`}/>
                    <div className='chat_info'>
                        <h2>{name}</h2>
                        <p>{messages[0]?.message}</p>
                    </div>

                 </div>
    </Link>
    
  ) : (
    <div className='SidebarChat' onClick={createChat}>
        <h2>Add new chat</h2>
    </div>
  )
}

export default SideBarChat