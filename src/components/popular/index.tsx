/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import dayjs from "dayjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "../../utils/store/actions";
import { addFavorite, getFavorite } from "../../utils/services";
import { IconHeartFilled, IconStarFilled } from "@tabler/icons-react";
import Footer from "../footer";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Popular = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<any>(1);
  const [popular, setPopular] = useState<Movies[]>([]);
  const [favList, setFavList] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const apiKey = "9c5d13af89af12b8152425b400a578b7";

  const fetchPopular = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`);
      setPopular(response.data.results);
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
    fetchPopular();
  }, [page]);

  useEffect(() => {
    fetchFavorite();
  }, []);

  useEffect(() => {
    if (favList && popular) {
      setFavList(popular.map((item: any) => favList.some((fav: any) => item.id === fav.id)));
    }
  }, [favList, popular]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flexGrow: 1 }}>
        <div className="flex flex-col justify-start items-start px-20 mx-10 py-5">
          <h1 className="navTitle text-slate-900">Popular Movies</h1>
          {/* <span className="w-[83%] border-2 border-solid border-black"></span> */}
        </div>
        <div className="flex flex-wrap justify-evenly px-12 mx-12 mb-10">
          {popular &&
            popular.map((item: { id: number; title: string; poster_path: string; vote_average: number; release_date: string }, index: number) => (
              <div className="flex flex-col bg-slate-900 w-[15rem] max-w-[100%] rounded-xl p-3 mb-5" key={index}>
                {item.poster_path && (
                  <div className="relative group">
                    <img className=" w-full self-center rounded-lg " src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={`${item.title} Poster`} />
                    <div className="absolute inset-0 flex flex-row justify-start items-start bg-gray-200 text-yellow-500 max-w-[48px] h-[25px] rounded">
                      <IconStarFilled className="mx-1 mt-1 size-4 " />
                      <p className="text-black">{`${Math.round(item.vote_average * 10) / 10}`}</p>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-start items-end bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button onClick={() => handleFav(item.id)}>
                        <IconHeartFilled className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center pt-2">
                  <p className="text-white text-center">{item.title}</p>
                  {/* <p className="text-white text-center">{dayjs(item.release_date).format("D MMMM, YYYY")}</p> */}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer page={page} setPage={setPage} />
    </div>
  );
};

export default Popular;
