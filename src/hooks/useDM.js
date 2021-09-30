import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useDM = (to, userInfo) => {
  const socket = useRef();
  const [userList, setUserList] = useState([
    // {
    //   userId: "",
    //   nickname: "",
    //   avatar: null,
    //   connected: false,
    //   messages: [],
    // },
  ]);
  const userListRef = useRef(userList);
  const { userId, nickname, avatar } = userInfo;
  const users = [];
  useEffect(() => {
    socket.current = io(`${ENDPOINT}/users`, {
      autoConnect: false,
    });

    const token = localStorage.getItem("socketToken");
    //이전에 접속한 기록이 있다면, socket.current.auth에 정보저장후, 연결
    if (token) {
      socket.current.auth = { token, userId, nickname, avatar };
      socket.current.connect();
    }
    //이전에 받은 토큰이 없다면, 현재 정보만 저장해서 연결
    //토큰은 rootSocket에서 따로 받는다.
    else {
      socket.current.auth = { userId, nickname, avatar };
      socket.current.connect();
    }

    //token이벤트에서 받은 토큰을 auth와 local에 저장한다.
    socket.current.on("token", ({ token, userId }) => {
      socket.current.auth = { ...socket.current.auth, token };
      socket.current.userId = userId;
      localStorage.setItem("socketToken", token);
    });

    //users이벤트를 통해, serverUsers를 받아와서, 최신화 시키기
    //users이벤트는 본인이 처음 접속할 때, 다른 사람이 접속하거나 나갈때 발생
    socket.current.on("users", (serverUsers) => {
      serverUsers.forEach((serverUser) => {
        for (let i = 0; i < userListRef.current.length; i++) {
          const existingUser = userListRef.current[i];
          //이미 기존에 있던 유저였다면, 새로 갱신해주고 리턴
          if (existingUser.userId === serverUser.userId) {
            //위에 배열을 얕은 복사를 해주었기 때문에,
            //아래와 같이 바꾸어 주면, 저장되어 있는 users에도 반영이 되게 된다.
            existingUser.connected = serverUser.connected;
            existingUser.messages = serverUser.messages;
            return;
          }
        }
        //만약 서버로부터 받은 유저이름이 새로운 유저라면, users에 push
        userListRef.current.push(serverUser);
      });
    });

    // //users이벤트를 통해, serverUsers를 받아와서, 최신화 시키기
    // //users이벤트는 본인이 처음 접속할 때, 다른 사람이 접속하거나 나갈때 발생
    // const getUsers = (li) => {
    //   socket.current.on("users", (serverUsers) => {
    //     const list = [...li];
    //     setUserList(() => {
    //       serverUsers.forEach((serverUser) => {
    //         for (let i = 0; i < list.length; i++) {
    //           const existingUser = list[i];
    //           if (existingUser.userId === serverUser.userId) {
    //             existingUser.connected = serverUser.connected;
    //             existingUser.messages = serverUser.messages;
    //             //깊은복사
    //             const updated = [...list];
    //             updated[i] = existingUser;
    //             console.log(666, updated);
    //             return updated;
    //           }
    //         }
    //         return [...list, serverUser];
    //       });
    //     });
    //   });
    // };
    // getUsers(userListRef.current);

    //   serverUsers.forEach((serverUser) => {
    //     for (let i = 0; i < users.length; i++) {
    //       const existingUser = users[i];
    //       //이미 기존에 있던 유저였다면, 새로 갱신해주고 리턴
    //       if (existingUser.userId === serverUser.userId) {
    //         //위에 배열을 얕은 복사를 해주었기 때문에,
    //         //아래와 같이 바꾸어 주면, 저장되어 있는 users에도 반영이 되게 된다.
    //         existingUser.connected = serverUser.connected;
    //         existingUser.messages = serverUser.messages;
    //         return;
    //       }
    //     }
    //     //만약 서버로부터 받은 유저이름이 새로운 유저라면, users에 push
    //     users.push(serverUser);
    //   });

    //소켓 연결이 되었다면,
    //client단에서 관리하는 users에서 나의 아이디를 찾아 connected = true 설정
    socket.current.on("connect", () => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === userId) {
          existingUser.connected = true;
          break;
        }
      }
    });
    // setUserList((prev) => {
    //     for (let i = 0; i < prev.length; i++) {
    //       const existingUser = prev[i];
    //       if (existingUser.userId === userId) {
    //         existingUser.connected = true;
    //         const updatedState = [...prev];
    //         updatedState[i] = existingUser;
    //         return updatedState;
    //       }
    //     }
    //   });

    //다른 유저가 들어오면 발생하는 이벤트인,
    //user connected 발생시, client에서 관리하는 users에서 해당 유저 찾아서 업데이트 해준다.
    socket.current.on("user connected", (connectedUser) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === connectedUser.userId) {
          existingUser.connected = true;
          return;
          //   return setUserList(users);
        }
      }
      //만약 못찾는다면, 새롭게 들어온 유저이므로 추가해주자.
      userListRef.current.push(connectedUser);
      //   return setUserList(users);
    });

    //다른 유저가 오프라인이 되면 발생하는 이벤트인,
    //user disconnected발생시, 해당유저 찾아서 connected = false로 바꿔준다.
    socket.current.on("user disconnected", (leftUserId) => {
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        if (existingUser.userId === leftUserId) {
          existingUser.connected = false;
          return;
        }
      }
    });

    //DM을 받은 경우,
    //users의 messages배열에 update 시켜주기
    //
    socket.current.on("private message", (message) => {
      let mine = userId === message.from;
      for (let i = 0; i < userListRef.current.length; i++) {
        const existingUser = userListRef.current[i];
        //만약, 메시지가 내가 보낸 것이라면(mine), 내가 보낸 상대방(to)에게 저장.
        //만약, !mine이라고 하더라도, from이 보낸  to에게 저장
        if (existingUser.userId === message.to) {
          //   message = { body: message.content, user: message.from, mine };
          existingUser.messages.push(message);
          console.log(111111, userListRef.current);
          return;
        }
      }
    });

    return () => {
      //   setUserList(users);
      //   socket.current.disconnect();
      socket.current.off("connect");
      socket.current.off("token");
      socket.current.off("users");
      socket.current.off("user connected");
      socket.current.off("user disconnected");
      socket.current.off("private message");
      socket.current.off("disconenct");
    };
  }, [userListRef]);

  const privateMessageHandler = (msgData, to) => {
    socket.current.emit("private message", { content: msgData, to });
  };
  return { privateMessageHandler, userList, users, userListRef };
};

export default useDM;
