import React, { useState, useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";

import Peer from "peerjs";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./Voice.scss";
function Voice() {
  const [peerId, setPeerId] = useState("");
  const [peers, setPeers] = useState([]);
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peersRef = useRef([]);
  const peerInstance = useRef(null);

  const { gameId, roomId } = useParams();
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const { socket } = useSocket(gameId, roomId, userInfo);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (peerId) => {
      console.log("ㄴㅏ여", peerId);
      setPeerId(peerId);
      socket.current.emit("joinRoom", roomId, userInfo, peerId);
    });

    socket.current.on("userConnect", (peerId) => {
      console.log("상대ㅇㅣ여", peerId);
      setRemotePeerIdValue(peerId);
    });
    peer.on("call", (call) => {
      const getUserMedia = navigator.getUserMedia;
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });
    peerInstance.current = peer;
  }, []);
  console.log(peerInstance);

  const call = (remotePeerId) => {
    const getUserMedia = navigator.getUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };
  return (
    <div id="video-grid">
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <div className="dlfqjs">
        <video className="haha" ref={currentUserVideoRef} />
      </div>
      <div className="dlqjs">
        <video className="haha1" ref={remoteVideoRef} />
      </div>
    </div>
  );
}

export default Voice;
