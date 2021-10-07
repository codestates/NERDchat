import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const history = useHistory();
  const url = new URL(window.location.href);
  const authorizationCode = url.searchParams.get("code");
  const ENDPOINT = process.env.REACT_APP_ENDPOINT;
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;

  //   const sendCodeHandler = async () => {
  //     const res = await axios({
  //       url: "https://kauth.kakao.com/oauth/token",
  //       params: {
  //         grant_type: "authorization_code",
  //         client_id: KAKAO_REST_API_KEY,
  //         redirect_uri: `${ENDPOINT}/oauth/kakao`,
  //         code: authorizationCode,
  //       },
  //     });
  //     console.log(999, res);
  //   };
  const sendCodeHandler = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${ENDPOINT}/oauth/kakao`,
        headers: {
          accept: "application/json",
          //   origin: "http://localhost:8080",
        },
        data: {
          code: authorizationCode,
        },
        withCredentials: true,
      });

      if (res.data.messages === "loggedIn") {
        history.push("/server");
        // window.location.reload();
      } else {
        history.push("/");
      }
    } catch (err) {
      if (err) console.log(err);
    }
  };
  useEffect(() => {
    const authorizationCode = url.searchParams.get("code");
    if (!authorizationCode) return;
    sendCodeHandler();
  }, []);

  return <div></div>;
};

export default Callback;
