import Navbar from "../navbar";
import NowPlaying from "../../../components/nowplaying";
import Popular from "../../../components/popular";
import Discover from "../../../components/discover";
import Favorite from "../../../components/favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-200 min-h-screen flex-row items-center ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Discover />} />
        </Routes>
        <Routes>
          <Route path="/now-playing" element={<NowPlaying />} />
        </Routes>
        <Routes>
          <Route path="/popular" element={<Popular />} />
        </Routes>
        <Routes>
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default HomePage;
