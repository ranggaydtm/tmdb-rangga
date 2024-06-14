/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import useDebounce from "../../utils/hooks/useDebouce";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconHeart } from "@tabler/icons-react";
import { SNACKBAR_OPEN } from "../../utils/store/actions";
import { addFavorite, getFavorite, getMovieList } from "../../utils/services";

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const CollectionMovie = () => {
  const dispatch = useDispatch();

  const [collect, setCollect] = useState<Movies[]>([]);
  const [favList, setFavList] = useState<any>();
  const [favorite, setFavorite] = useState<any>();

  const [loading, setLoading] = useState<any>(false);
  const [page, setPage] = useState<any>(1);
  const [search, setSearch] = useState<any>();
  const searchMovie = useDebounce(search, 500);
  const apiKey = "9c5d13af89af12b8152425b400a578b7";

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&query=${searchMovie}`);
      setCollect(response.data.results);
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
      setCollect(response.data.results);
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
    fetchMovie();
    if (search) {
      searchMovies();
    }
  }, [page, searchMovie]);

  useEffect(() => {
    fetchFavorite();
  }, []);

  useEffect(() => {
    if (favorite && collect) {
      setFavList(collect.map((item: any) => favorite.some((fav: any) => item.id === fav.id)));
    }
  }, [favorite, collect]);

  return (
    <div className="container">
      <div className="heroTitle">
        <h1 className="">Movies</h1>
      </div>
      <div className="hero">
        {collect.map((item) => (
          <div className="heroContent">
            <div className="imageContainer">
              {item.poster_path && (
                <>
                  <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={`${item.title} Poster`} />
                  <IconHeart className="favIcon" />
                </>
              )}
            </div>
            <h3>{item.title}</h3>
            <h5>{`Release Date: ${item.release_date}`}</h5>
            <p>{`Rating: ${Math.round(item.vote_average * 10) / 10}`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionMovie;
