import { useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";

import "./Bookmark.scss";
const Bookmark = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <div onMouseEnter={onHover} onMouseLeave={onLeave} role="button">
      {hover ? (
        <IoBookmarkOutline size={20} className="hover" />
      ) : (
        <IoBookmarkOutline size={20} className="nonhover" />
      )}
    </div>
  );
};

export default Bookmark;
