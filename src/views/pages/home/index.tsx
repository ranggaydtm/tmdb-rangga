import Nav from "../navbar/Nav";
import NowPlaying from "../../../components/nowplaying";
import Popular from "../../../components/popular";
import Discover from "../../../components/discover";
import Favorite from "../../../components/favorites";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = () => {
  return (
    <BrowserRouter>
      <div style={{ zIndex: 1000 }} className="bg-slate-900">
        <Nav />
      </div>
      <div className="bg-gray-200">
        <div className="min-h-screen flex-row items-center">
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
      </div>
    </BrowserRouter>
  );
};

export default HomePage;
