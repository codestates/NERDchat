import { useEffect, useState } from "react";
import axios from "axios";
import "./BookMarkList.scss";

function BookMarkList() {
  const [lists, setLists] = useState([]);

  // useEffect(() => {
  //   getBookmarkLists();
  // }, []);

  // const getBookmarkLists = async () => {
  //   const res = await axios.get()
  // }
  return <div>북마크 목록임다</div>;
}

export default BookMarkList;
