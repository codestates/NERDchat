import { useState, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import './ServerRoom.scss'
import ServerRoomCard from '../../components/ServerRoomCard/ServerRoomCard'
import useLists from '../../hooks/useLists'

const ServerRoom = () => {
    const {gameId} = useParams();
    // const { lists, hasMore, loading} = useLists(pageNum, "post", "/rooms/list/", { gameId });
    const [pageNum, setPageNum] = useState(1);
    // const observer = useRef();

    // const lastElementRef = useCallback(node => {
    //     if(loading) return;
    //     if(observer.current) observer.current.disconnect();
    //     observer.current = new IntersectionObserver(entries => {
    //         if(entries[0].isIntersecting && hasMore){
    //             setPageNum((prevPage) => prevPage + 1);
    //         }
    //     })
    //     if(node) observer.current.observe(node);
    // }, [loading, hasMore])
    const lists = [{id: 1, roomTitle: 'heyguys', uuid:13124, max: 3}, {id: 2, roomTitle: 'how ya doing', uuid:1123123, max: 5}];
    //현재 인원수는 io.sockets.adapter.rooms[uuid] 로 받아오자.

    return (
        <div className="big__container">
            <div className="roomLists__container">
                {lists.map((list, idx) => {
                    // if(lists.length === idx + 1){
                    //     return (<div key={list.id} ref={lastElementRef}>
                    //         <ServerRoomCard id={list.id} roomTitle={list.roomTitle} uuid={list.uuid} max={list.max}/>
                    //     </div>)
                    // }
                    // else{
                        return (<div key={list.id} >
                            <ServerRoomCard id={list.id} roomTitle={list.roomTitle} uuid={list.uuid} max={list.max}/>
                        </div>)
                    // }
                })}
                {/* <div>{loading && 'loading...'}</div> */}
            </div>
        </div>
    )
}

export default ServerRoom
