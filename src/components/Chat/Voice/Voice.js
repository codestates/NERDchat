import React, { useState, useEffect, useRef } from "react";
import useSocket from "../../../hooks/useSocket";
import styled from "styled-components";
import Peer from "simple-peer";
import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import "./Voice.scss";

const Container = styled.div`
  padding: 20px;
  display: flex;
  margin: auto;
  flex-wrap: wrap;
`;

const StyledVideo = styled.video`
  height: 100px;
  width: 100px;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
      console.log("stream generated", stream);
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

  // const Audio = (props) => {
  //   const userRef = useRef();
  //   console.log("!!!!!!!!", props.peer);
  //   useEffect(() => {
  //     props.peer.on("stream", (stream) => {
  //       console.log("stream generated", stream);
  //       if (userRef.current !== null) userRef.current.srcObject = stream;
  //     });
  //   }, []);

  //   return <video playsInline autoPlay ref={userRef} />;
  // };

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
    socket.current.onAny((event, ...args) => {
      console.log(event, args);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  return (
    <Container>
      <StyledVideo muted ref={userAudio} autoPlay playsInline />
      {peers.map((peer) => {
        return <Video key={peer.peerId} peer={peer.peer} />;
      })}
    </Container>
  );
}

export default Voice;
//
