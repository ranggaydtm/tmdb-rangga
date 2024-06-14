/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import useDebounce from "../../utils/hooks/useDebouce";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SNACKBAR_OPEN } from "../../utils/store/actions";
import { addFavorite, getFavorite } from "../../utils/services";
import { IconBrandGithub, IconHeartFilled, IconStarFilled } from "@tabler/icons-react";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Discover = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<any>(1);
  const [discover, setDiscover] = useState<Movies[]>([]);
  const [favList, setFavList] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [search, setSearch] = useState<any>();
  const searchMovie = useDebounce(search, 500);
  const apiKey = "9c5d13af89af12b8152425b400a578b7";

  const fetchDiscover = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&query=${searchMovie}`);
      setDiscover(response.data.results);
      setPage(response.data.page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/collection?api_key=${apiKey}&page=${page}&query=${searchMovie}`);
      setDiscover(response.data.results);
      setPage(response.data.page);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorite = async () => {
    await getFavorite()
      .then((res) => {
        if (res.data) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            anchorOrigin: {
              horizontal: "center",
              vertical: "top",
            },
            message: "Successfully add to favorite",
            alertSeverity: "success",
            variant: "alert",
            close: true,
          });
          setFavList(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFav = (id: number) => {
    addFavorite({ media_id: id, media_type: "movie", favorite: true })
      .then((res) => {
        if (res) {
          fetchFavorite();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchDiscover();
    if (search) {
      searchMovies();
    }
  }, [page, searchMovie]);

  useEffect(() => {
    fetchFavorite();
  }, []);

  useEffect(() => {
    if (favList && discover) {
      setFavList(discover.map((item: any) => favList.some((fav: any) => item.id === fav.id)));
    }
  }, [favList, discover]);

  return (
    <div className="container">
      <div className="flex flex-col justify-start items-start px-20 mx-10 py-5">
        <h1 className="navTitle text-slate-900">Discover Movie</h1>
        {/* no query for search in discover endpoint */}
        {/* <div className="flex items-center border-b border-slate-900 py-2">
          <form className="w-full max-w-sm">
            <input
              className="appearance-none bg-transparent border-none w-full text-slate-900 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="search"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div> */}
      </div>
      <div className="flex flex-wrap justify-evenly px-12 mx-12 mb-10">
        {discover &&
          favList &&
          discover.map((item: { id: number; title: string; poster_path: string; vote_average: number }, index: number) => (
            <div className="flex flex-col bg-slate-900 w-[15rem] max-w-[100%] rounded-xl p-3 mb-5" key={index}>
              {item.poster_path && (
                <div className="relative group">
                  <img className=" w-full self-center rounded-lg " src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={`${item.title} Poster`} />
                  <div className="absolute inset-0 flex flex-row justify-start items-start bg-gray-200 text-yellow-500 max-w-[48px] h-[25px] rounded">
                    <IconStarFilled className="mx-1 mt-1 size-4 " />
                    <p className="text-black">{`${Math.round(item.vote_average * 10) / 10}`}</p>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-start items-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => handleFav(item.id)} className={`${favList.length > 0 && favList[index] ? "text-red-500" : "text-white"}`}>
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
        <div className="flex flex-row items-center justify-center py-3">
          <div className="buttonPage mr-5 pr-5 text-white">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              Prev
            </button>
          </div>
          <div className="current" id="current">
            {page}
          </div>
          <div className="ml-5 pl-5 text-white">
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

export default Discover;
