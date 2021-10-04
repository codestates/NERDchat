import React, { useState, useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";

import Peer from "simple-peer";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./Voice.scss";
function Voice() {
  const { gameId, roomId } = useParams();
  const cookies = new Cookies();
  const userInfo = cookies.get("userInfo");

  const { socket } = useSocket(gameId, roomId, userInfo);
  const [peers, setPeers] = useState([]);
  const userAudio = useRef();
  const peersRef = useRef([]);

  const Audio = (props) => {
    const ref = useRef();

    useEffect(() => {
      props.peer.on("stream", (stream) => {
        console.log("stream generated");
        ref.current.srcObject = stream;
      });
    }, []);

    return <video playsInline autoPlay ref={ref} />;
  };

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
        video: true,
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
            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.current.on("userJoin", (payload) => {
          const peer = addPeer(payload.signal, payload.callerId, stream);
          peersRef.current.push({
            peerId: payload.callerId,
            peer,
          });
          setPeers((users) => [...users, peer]);
        });

        socket.current.on("receive return signal", (payload) => {
          const i = peersRef.current.find((peer) => peer.peerId === payload.id);
          i.peer.signal(payload.signal);
        });
      });
    socket.current.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <div>
      <video muted ref={userAudio} autoPlay playsInline />
      {peers.map((peer, idx) => {
        return <Audio key={idx} peer={peer} />;
      })}
    </div>
  );
}

export default Voice;
