/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 flex flex-row items-center justify-between pt-3 pb-4">
      <div className="text-gray-200 md:text-4xl lg:text-6xl ml-14 navTitle">
        <Link to={"/"}>G E</Link>
      </div>
      <div className="flex flex-wrap  mr-20">
        <p className="text-gray-200 hover:text-white mr-10">
          <Link to={"/now-playing"}>Now Playing</Link>
        </p>
        <p className="text-gray-200 hover:text-white mr-10">
          <Link to={"/popular"}>Popular</Link>
        </p>
        <p className="text-gray-200 hover:text-white mr-10">
          <Link to={"/favorite"}>Favorites</Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
