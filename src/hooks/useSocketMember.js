import { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const useSocketMember = (uuid) => {
    const[numberOfMember, setNumberOfMember] = useState(0);
    const roomId;
    const socket = io('http://localhost:8080');
    const getUsers = (roomId) => {
        socket.emit('getUsers', roomId);
    }
    useEffect(() => {
        getUsers(roomId);
        socket.on('getUsers', (data)=> {
            setNumberOfMember(data)
        })

        return ()=> socket.disconnect();
    }, [])
    
    return 
}

export default useSocketMember
