import React, { useState, useEffect } from "react";
import Peer from "peerjs";

export default function usePeer(roomId) {
  const myPeer = new Peer();
  console.log(myPeer);
  //   const [mediaStream, SetMediaStream] = useState(null);
  //   const [myPeers, setPeers] = useState(null);
  //   const [myPeerID, setMyPeerID] = useState(null);

  //   const cleanUp = () => {
  //     if (myPeer) {
  //       myPeer.disconnect();
  //       myPeer.destroy();
  //     }
  //     setPeers(null);
  //     setMyPeerID(null);
  //   };

  const audioOnlyConfig = {
    video: false,
    audio: true,
  };
  const userMediaConfig = {
    audio: { echoCancellation: true, noiseSuppression: true },
    video: { facingMode: "user" },
  };

  useEffect(() => {
    myPeer.on("call", (call) => {
      navigator.mediaDevices.getUserMedia(userMediaConfig).then((stream) => {
        call.answer(stream);
      });
    });
  }, []);
}
