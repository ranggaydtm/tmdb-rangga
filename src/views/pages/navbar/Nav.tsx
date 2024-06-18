/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconDeviceTv, IconMenu2, IconMovie } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const content = (
    <>
      <div style={{ zIndex: 1000 }} className="md:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 transition">
        <ul className="text-center text-xl p-5">
          <Link to={"/now-playing"}>
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-700 hover:rounded">Now Playing</li>
          </Link>
          <Link to={"/popular"}>
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Popular</li>
          </Link>
          <Link to={"/favorite"}>
            <li className="my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded">Favorites</li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    <nav>
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 flex-1">
        <div className="flex items-center flex-1 text-3xl navTitle">
          <Link className="flex flex-row items-center gap-2" to={"/"}>
            G E
            <IconDeviceTv size={32} />
          </Link>
        </div>
        <div className="lg:flex md:flex sm:static items-center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <Link to={"/now-playing"}>
                <li className="hover:text-gray-400 transition border-b-2 border-slate-900 hover:border-gray-400 cursor-pointer">Now Playing</li>
              </Link>
              <Link to={"/popular"}>
                <li className="hover:text-gray-400 transition border-b-2 border-slate-900 hover:border-gray-400 cursor-pointer">Popular</li>
              </Link>
              <Link to={"/favorite"}>
                <li className="hover:text-gray-400 transition border-b-2 border-slate-900 hover:border-gray-400 cursor-pointer">Favorites</li>
              </Link>
            </ul>
          </div>
        </div>
        <div>{open && content}</div>
        <button className="block md:hidden transition text-white" onClick={handleToggle}>
          <IconMenu2 className="text-white" />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
