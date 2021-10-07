import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useLists = (pageNum, method, api, data) => {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const deleayedReq = setTimeout(() => {
      getLists();
    }, 1);

    return () => clearTimeout(deleayedReq);
  }, [pageNum]);

  // 좋아하는 리스트를 받아오고...
  // 그 리스트와 data의 id가 일치한다면, favorites: 1로 체크, if not 0;
  const getLists = async () => {
    const header = { "Content-Type": "application/json" };
    const res = await axios({
      url: `${api}${pageNum}`,
      method: `${method}`,
      baseURL: `${ENDPOINT}`,
      headers: header,
      withCredentials: true,
      data: data,
    });
    setLists((prev) => [...prev, ...res.data.data]);
    // setLists((prev) => {return [...new Set([...prev, ...res.data.data])]});
    setHasMore(res.data.data.length > 0);
  };
  return { lists, hasMore, loading };
};

export default useLists;
