import axios from "axios";

const apiKey = "9c5d13af89af12b8152425b400a578b7";
const accID = "20378599";

export interface Data {
  media_id: number;
  media_type: string;
  favorite: boolean;
}

export interface search {
  query: string;
}

export const getMovieList = async () => {
  return await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`);
};

export const getMovies = async (query: search) => {
  return await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`);
};

export const getMovieNP = async () => {
  return await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
};

export const getMoviePopular = async () => {
  return await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
};

export const getMovieGenre = async () => {
  return await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
};

export const addFavorite = async (data: Data) => {
  return await axios.post(`https://api.themoviedb.org/3/account/${accID}/favorite`, data, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVkMTNhZjg5YWYxMmI4MTUyNDI1YjQwMGE1NzhiNyIsInN1YiI6IjY0ZjAzMTZlY2FhNTA4MDBjODg2YTM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jo8SeqVmaDOEIWqoIPEYCeMCEMyTQwzU2yOgoD06v3g`,
    },
  });
};

export const getFavorite = async () => {
  return await axios.get(`https://api.themoviedb.org/3/account/${accID}/favorite/movies`, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YzVkMTNhZjg5YWYxMmI4MTUyNDI1YjQwMGE1NzhiNyIsInN1YiI6IjY0ZjAzMTZlY2FhNTA4MDBjODg2YTM3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jo8SeqVmaDOEIWqoIPEYCeMCEMyTQwzU2yOgoD06v3g`,
    },
  });
};
