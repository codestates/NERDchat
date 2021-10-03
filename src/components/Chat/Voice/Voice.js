import React, { useState, useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";

import Peer from "peerjs";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./Voice.scss";
function Voice() {
  const [MypeerId, setMyPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const { gameId, roomId } = useParams();
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const { socket } = useSocket(gameId, roomId, userInfo);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (peerId) => {
      console.log("나ㅇㅕ..", peerId);
      setMyPeerId(peerId);
      socket.current.emit("joinRoom", roomId, userInfo, peerId);
    });

    socket.current.on("userConnect", (peerId) => {
      console.log("상대방ㅇㅣ여..", peerId);
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

  const call = (remotePeerId) => {
    const getUserMedia = navigator.getUserMedia;

    getUserMedia({ video: false, audio: true }, (mediaStream) => {
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
    <div>
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

// import React, { useState, useEffect, useRef } from "react";
// import useSocket from "../../../hooks/useSocket";
// import styled from "styled-components";
// import Peer from "simple-peer";
// import { Cookies } from "react-cookie";
// import { useParams } from "react-router-dom";
// import "./Voice.scss";

// const Container = styled.div`
//   padding: 20px;
//   display: flex;
//   flex-wrap: wrap;
// `;

// const StyledVideo = styled.video`
//   height: 50px;
//   width: 50px;
// `;

// const Video = (props) => {
//   const ref = useRef();

//   useEffect(() => {
//     props.peer.on("stream", (stream) => {
//       ref.current.srcObject = stream;
//     });
//   }, []);

//   return <StyledVideo playsInline autoPlay ref={ref} />;
// };

// const videoConstraints = {
//   height: window.innerHeight / 2,
//   width: window.innerWidth / 2,
// };

// function Voice() {
//   const [peers, setPeers] = useState([]);

//   const userVideo = useRef();
//   const peersRef = useRef([]);

//   const { gameId, roomId } = useParams();
//   const cookies = new Cookies();
//   const userInfo = cookies.get("userInfo");
//   const { socket, joinRoom } = useSocket(gameId, roomId, userInfo);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: videoConstraints, audio: true })
//       .then((stream) => {
//         userVideo.current.srcObject = stream;
//         joinRoom();
//         socket.current.on("Users", (usersInThisRoom) => {
//           const peers = [];
//           usersInThisRoom.forEach((userID) => {
//             const peer = createPeer(userID, userInfo.userId, stream);
//             peersRef.current.push({
//               peerID: userID,
//               peer,
//             });
//             peers.push(peer);
//           });
//         });
//         socket.current.on("user joined", (payload) => {
//           const peer = addPeer(payload.signal, payload.callerID, stream);
//           peersRef.current.push({
//             peerID: payload.callerID,
//             peer,
//           });

//           setPeers((users) => [...users, peer]);
//         });

//         socket.current.on("receiving returned signal", (payload) => {
//           const item = peersRef.current.find((p) => p.peerID === payload.id);
//           item.peer.signal(payload.signal);
//         });
//       });

//   }, []);

//   function createPeer(userToSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket.current.emit("sending signal", {
//         userToSignal,
//         callerID,
//         signal,
//       });
//     });

//     return peer;
//   }

//   function addPeer(incomingSignal, callerID, stream) {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on("signal", (signal) => {
//       socket.current.emit("returning signal", { signal, callerID });
//     });

//     peer.signal(incomingSignal);

//     return peer;
//   }

//   return (
//     <Container>
//       <StyledVideo muted ref={userVideo} autoPlay playsInline />
//       {peers.map((peer, index) => (
//         <Video key={index} peer={peer} />
//       ))}
//     </Container>
//   );
// }

// export default Voice;
// message.txt
// 5KB
