import React, { useState, useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";
import styled from "styled-components";
import Peer from "simple-peer";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./Voice.scss";

const StyledVideo = styled.video`
  display: none;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    // console.log(props);
    props.peer.on("stream", (stream) => {
      // console.log("stream generated", stream);
      ref.current.srcObject = stream;
    });
  }, []);

  return <StyledVideo playsInline autoPlay ref={ref} />;
};

function Voice() {
  const { gameId, roomId } = useParams();
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const { socket } = useSocket(gameId, roomId, userInfo);
  const [peers, setPeers] = useState([]);
  const userAudio = useRef();
  const peersRef = useRef([]);
  const [mute, setMute] = useState(false);

  const createPeer = (userToSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", { userToSignal, callerId, signal });
    });
    return peer;
  };
  const addPeer = (incomingSignal, callerId, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socket.current.emit("return signal", { signal, callerId });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: false,
        audio: {
          echoCancellation: true,
        },
      })
      .then((stream) => {
        userAudio.current.srcObject = stream;
        socket.current.emit("joinVoice", roomId);
        socket.current.on("allUsers", (users) => {
          const peers = [];
          users.forEach((userId) => {
            const peer = createPeer(userId, socket.current.userId, stream);
            peersRef.current.push({
              peerId: userId,
              peer,
            });
            peers.push({
              peerId: userId,
              peer,
            });
          });
          setPeers(peers);
        });

        socket.current.on("userJoin", (payload) => {
          const peer = addPeer(payload.signal, payload.callerId, stream);
          peersRef.current.push({
            peerId: payload.callerId,
            peer,
          });

          const peerJoin = {
            peer,
            peerId: payload.callerId,
          };
          setPeers((users) => [...users, peerJoin]);
        });

        socket.current.on("receive return signal", (payload) => {
          const i = peersRef.current.find((peer) => peer.peerId === payload.id);
          i.peer.signal(payload.signal);
        });
      });

    socket.current.on("user disconnected", (id) => {
      const peerDone = peersRef.current.find((peer) => peer.peerId !== id);
      if (peerDone) {
        peerDone.peer.destroy();
      }
      const peer = peersRef.current.filter((el) => el.peerId !== id);
      peersRef.current = peers;
      setPeers(peer);
    });
    return () => {
      socket.current.off("allUsers");
      socket.current.off("userJoin");
      socket.current.off("receive return signal");
      socket.current.off("user disconnected");
      socket.current.disconnect();
    };
  }, []);

  const handleMute = () => {
    userAudio.current.srcObject
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    setMute(!mute);
  };

  return (
    <div>
      <div className="ok">일단 내용 넣기 전이용</div>
      <div>
        <StyledVideo muted ref={userAudio} autoPlay playsInline />
        <button onClick={handleMute}>{mute ? "unmute" : "mute"}</button>
        {peers
          .filter((peer) => peer.peerId !== userInfo.userId)
          .map((peer) => {
            return <Video key={peer.peerId} peer={peer.peer} />;
          })}
      </div>
    </div>
  );
}

export default Voice;
