import React, { useState, useEffect, useRef } from "react";

import useSocket from "../../../hooks/useSocket";
import styled from "styled-components";
import Peer from "simple-peer";

import { Cookies } from "react-cookie";
import { useParams } from "react-router-dom";

import { ReactComponent as Glasses } from "../../../images/glasses.svg";
import {
  IoHeartCircleOutline,
  IoChevronDownOutline,
  IoMicOffOutline,
  IoMicOutline,
  IoOptionsOutline,
  IoRepeatOutline,
  IoArrowUndoOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

import "./Voice.scss";

const StyledVideo = styled.video`
  display: none;
`;

const Video = (props) => {
  const ref = useRef();

  useEffect(() => {
    props.peer.on("stream", (stream) => {
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
    <div className="mute__card-container">
      <div className="mute__card">
        <div className="mute__head">
          <div className="mute__arrow">
            <IoChevronDownOutline size={20} />
          </div>
          <div className="mute__text">NERD PLAYER</div>
          <div className="mute__like">
            <IoHeartCircleOutline size={20} />
          </div>
        </div>
        <div className="mute__cover">
          <div className="mute__app">
            <Glasses width="230" height="230" className="mute__glasses" />
          </div>
        </div>
        <div className="mute__des">
          <p className="mute__album-title">WithCall</p>
          <p className="mute__album-subtitle">YOUR FRIEND</p>
        </div>
        <div className="mute__progress">
          <div className="mute__bg"></div>
          <div className="mute__time"></div>
          <div className="mute__times">
            <div className="mute__time-current">2:02</div>
            <div className="mute__time-end">4:05</div>
          </div>
        </div>
        <div className="mute__menu">
          <div className="mute__options">
            <IoOptionsOutline size={20} />
          </div>
          <div className="mute__repeat">
            <IoRepeatOutline size={20} />
          </div>
          <div onClick={handleMute} className="mute__play-pause">
            {mute ? (
              <IoMicOffOutline size={30} className="mute__play" />
            ) : (
              <IoMicOutline size={30} className="mute__pause" />
            )}
          </div>
          <div className="mute__back">
            <IoArrowUndoOutline size={20} />
          </div>
          <div className="mute__share">
            <IoShareSocialOutline size={20} />
          </div>
        </div>
      </div>
      <div>
        <StyledVideo muted ref={userAudio} autoPlay playsInline />
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
