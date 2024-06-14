import React from "react";
import { Link } from "react-router-dom";
import { IconBrandGithub } from "@tabler/icons-react";

interface FooterProps {
  page: number;
  setPage: (page: number) => void;
}

const Footer: React.FC<FooterProps> = ({ page, setPage }) => {
  return (
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
  );
};

export default Footer;
