/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { IconBrandGithub, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import { getFavorite } from "../../utils/services";
import { Link } from "react-router-dom";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_data: string;
  vote_average: number;
}

const Favorite = () => {
  const [page, setPage] = useState<any>(1);
  const [totalPage, setTotalPage] = useState<number>();
  const [favList, setFavList] = useState<Movies[]>([]);

  const fetchFavorite = async () => {
    await getFavorite().then((res) => {
      setFavList(res.data.results);
      setPage(res.data.page);
      setTotalPage(res.data.total_pages);
    });
  };

  useEffect(() => {
    fetchFavorite();
  }, []);

  return (
    <div className="container">
      <div className="flex flex-col justify-start items-start px-20 mx-10 py-5">
        <h1 className="navTitle text-slate-900">Favorite Movie List</h1>
        {/* <span className="w-[80%] border-2 border-solid border-black"></span> */}
      </div>
      <div className="flex flex-wrap justify-evenly px-12 mx-12 mb-10">
        {favList &&
          favList.map((item: { id: number; title: string; poster_path: string; vote_average: number }, index: number) => (
            <div className="flex flex-col bg-slate-900 w-[15rem] max-w-[100%] rounded-xl p-3 mb-5" key={index}>
              {item.poster_path && (
                <div className="relative group">
                  <img className=" w-full self-center rounded-lg " src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={`${item.title} Poster`} />
                  <div className="absolute inset-0 flex flex-row justify-start items-start bg-gray-200 text-yellow-500 max-w-[48px] h-[25px] rounded">
                    <IconStarFilled className="mx-1 mt-1 size-4 " />
                    <p className="text-black">{`${Math.round(item.vote_average * 10) / 10}`}</p>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-start items-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className={`${favList.length > 0 && favList[index] ? "text-red-500" : "text-white"}`}>
                      <IconHeartFilled className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-center justify-center pt-2">
                <p className="text-white text-center">{item.title}</p>
              </div>
            </div>
          ))}
      </div>
      <div className="pagination py-2 bg-slate-900 text-white">
        <div className="flex flex-row items-center justify-center">
          <div className="buttonPage m-5 p-5 text-white">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
          </div>
          <div className="current" id="current">
            {page}
          </div>
          <div className="m-5 p-5 text-white">
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
        <Link to="https://github.com/ranggaydtm" target="_blank" rel="noopener noreferrer">
          <div className="flex flex-row items-center justify-center p-2">
            <IconBrandGithub />
            <p className="text-white font-mono pl-1">ranggaydtm</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Favorite;
