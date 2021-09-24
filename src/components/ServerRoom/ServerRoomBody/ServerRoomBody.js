import { useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./ServerRoomBody.scss";
import ServerRoomCard from "../ServerRoomCard/ServerRoomCard";
import Loader from "../../Loader/Loader";
import useLists from "../../../hooks/useLists";

const ServerRoomBody = ({ searchedLists, searched }) => {
  const { gameId } = useParams();
  const [pageNum, setPageNum] = useState(1);
  const { lists, hasMore, loading } = useLists(
    pageNum,
    "post",
    "/rooms/list/",
    { gameId }
  );
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  // const lists = [{id: 1, roomTitle: 'heyguys', uuid:13124, max: 3}, {id: 2, roomTitle: 'how ya doing', uuid:1123123, max: 5}];
  // 현재 인원수는 io.sockets.adapter.rooms[uuid] 로 받아오자.

  const totalLists = lists.map((list, idx) => {
    if (lists.length === idx + 1) {
      return (
        <div key={list.id} ref={lastElementRef}>
          {loading ? (
            <Loader />
          ) : (
            <ServerRoomCard
              gameId={gameId}
              id={list.id}
              roomTitle={list.roomTitle}
              uuid={list.uuid}
              max={list.max}
              loading={loading}
              len={list.len}
            />
          )}
        </div>
      );
    } else {
      return (
        <div key={list.id}>
          {loading ? (
            <Loader />
          ) : (
            <ServerRoomCard
              gameId={gameId}
              id={list.id}
              roomTitle={list.roomTitle}
              uuid={list.uuid}
              max={list.max}
              loading={loading}
              len={list.len}
            />
          )}
        </div>
      );
    }
  });
  const filteredLists = searchedLists.map((list, idx) => {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div key={list.id}>
            <ServerRoomCard
              gameId={gameId}
              id={list.id}
              roomTitle={list.roomTitle}
              uuid={list.uuid}
              max={list.max}
              len={list.len}
            />
          </div>
        )}
      </>
    );
  });
  return (
    <div className="room__big__container">
      <div className="roomLists__container">
        {searched ? filteredLists : totalLists}
      </div>
    </div>
  );
};

export default ServerRoomBody;
