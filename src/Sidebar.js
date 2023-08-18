import './Sidebar.css';
import {Avatar, IconButton} from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SideBarChat from './SideBarChat';
import { useEffect, useState } from 'react';
import   db from  './firebases';
import { useStateValue } from './StateProvider';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() =>{
        const unsubscribe = db.collection("Rooms").onSnapshot((snapshot) => setRooms(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return () =>{
            unsubscribe();
        }
    }, [])


  return (
    <div className='sidebar'>
        <div className='sidebar_header'>
            <Avatar src={user?.photoURL}/>
            <div className='sidebar_headerRight'>
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>

                <IconButton>
                    <ChatIcon />
                </IconButton>
                
                <IconButton>
                    <MoreVertIcon />
                </IconButton>

                
               
            </div>
        </div>

        <div className='Search_bar'>
            <div className='search_container'>
                <SearchOutlinedIcon/>
                    <input type='text' placeholder='Search or start new chat'/>
            </div>     
        </div>

        <div className='Chatbar'>
            <SideBarChat addNewChat />
            {rooms.map(room =>(
                <SideBarChat key={room.id} id={room.id} name={room.data.name} />
            ) )}
        
        </div>
        
        
    </div>
  )
}

export default Sidebar