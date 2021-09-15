import { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const useSocketMember = (uuid) => {
    const[numberOfMember, setNumberOfMember] = useState(0);
    const socket = io('http://localhost:8080', () => {
        io.sockets.adapter.rooms[`${uuid}`]
    });
    useEffect(() => {

    }, [])
    return (
        <div>
            
        </div>
    )
}

export default useSocketMember
