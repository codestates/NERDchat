import React, { useState, useRef, useCallback, useEffect } from "react";
import useLists from "../../hooks/useLists";
import ServerPageCard from "../../components/serverPage/ServerPageCard";
import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import "./ServerPage.scss";

const ServerPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const { lists, hasMore, loading } = useLists(
    pageNum,
    "get",
    "/category/lists/"
  );

  // Infinite Scroll
  // 일반적인 useRef는 state가 아니기 때문에 컴포넌트가 변화할때마다 다시 렌더되지 못한다. 하지만, useCallback을 ref로 주게 되면,
  // 해당요소가 생성 될 때 마다 callback함수가 실행되게 된다.
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      // 현재 옵저버의 연결을 다시 끊고
      if (observer.current) observer.current.disconnect();
      // IntersectionObserver은 교차관찰자 web api로, 비동기적으로 실행되기 때문에, 메인thread에 영향을 주지 않고, 변경사항들을 관찰 할 수 있다.
      // 새로운 IntersectionObserver을 등록.
      observer.current = new IntersectionObserver((entries) => {
        // 관찰 대상이 뷰포트에 들어온 경우,
        if (entries[0].isIntersecting && hasMore) {
          // 콘솔찍고
          // console.log('last element showed up')
          // 마지막임을 알았으니 page + 1;
          setPageNum((prevPage) => prevPage + 1);
        }
      });
      // 관찰할 대상을 등록하고, 해당 요소를 관찰 시킨다.
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // forTest
  // let lastElementRef;
  // const Lists = [{ id: 1, category: 'diablo', image: 1, fav: 1 }, { id: 2, category: 'lol', image: 2, fav: 0 }, { id: 3, category: 'hothot3', image: 3, fav: 0 }, { id: 4, category: 'coolcool', image: 4, fav: 0 }, { id: 5, category: 'diablo', image: 1, fav: 0 }, { id: 6, category: 'lol', image: 2, fav: 1 }, { id: 7, category: 'hothot3', image: 3, fav: 0 }, { id: 8, category: 'coolcool', image: 4, fav: 1 }, { id: 9, category: 'diablo', image: 1, fav: 0 }, { id: 10, category: 'lol', image: 2, fav: 0 }, { id: 11, category: 'hothot3', image: 3, fav: 0 }, { id: 12, category: 'coolcool', image: 4, fav: 0 }, { id: 13, category: 'diablo', image: 1, fav: 0 }, { id: 14, category: 'lol', image: 2, fav: 1 }, { id: 15, category: 'hothot3', image: 3, fav: 0 }, { id: 16, category: 'coolcool', image: 4, fav: 0 }];
  // const loading = false;

  return (
    <div class="server__list__container">
      <NavBar />
      <div className="big__container">
        <div className="game__list__card__container">
          {lists.map((list, idx) => {
            // 해당 요소가 마지막 요소라면, ref붙여주기
            if (lists.length === idx + 1) {
              return (
                <div ref={lastElementRef}>
                  <ServerPageCard
                    key={list.id}
                    id={list.id}
                    category={list.category}
                    img={list.image}
                    like={list.fav}
                  />
                </div>
              );
            } else {
              return (
                <div>
                  <ServerPageCard
                    key={list.id}
                    id={list.id}
                    category={list.category}
                    img={list.image}
                    like={list.fav}
                  />
                </div>
              );
            }
          })}
          <div>{loading && "loading..."}</div>
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
