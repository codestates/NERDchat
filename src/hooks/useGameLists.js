import {useEffect, useState} from 'react'
import axios from 'axios'

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const useGameLists = (pageNum) => {
    const [loading, setLoading] = useState(true);
    const [gameLists, setGameLists] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    useEffect(() => {
        setLoading(true);
        getGameLists();
        setLoading(false);
    }, [pageNum])
    // 좋아하는 리스트를 받아오고... 
    // 그 리스트와 data의 id가 일치한다면, favorites: 1로 체크, if not 0;
    const getGameLists = async () => {
        // let cancel
        // , {cancelToken: new axios.CancelToken(c => cancel = c)}

        //test용
        let accesToken = 1 || undefined;
        const header = {authorization: accesToken}
        const res = await axios.get(`${ENDPOINT}/category/lists/${pageNum}`, {headers: header, withCredentials: true});
        console.log(res.data.data);
        setGameLists((prev) => [...prev, ...res.data.data]);
        // setGameLists((prev) => {return [...new Set([...prev, res.data.data])]});
        setHasMore(res.data.data.length > 0 )
    }
    return { gameLists, hasMore, loading};
}

export default useGameLists
