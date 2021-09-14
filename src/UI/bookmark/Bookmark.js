import { useState } from 'react';
import { IoBookmarkOutline } from 'react-icons/io5';
const Bookmark = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      role='button'
    >
      {hover ? <IoBookmarkOutline color='rgb(184, 126, 255)' size={25} /> : <IoBookmarkOutline color='white' size={25} />}
    </div>
  );
};

export default Bookmark;
