import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigate = useNavigate();
  return (
    <nav className="bg-black border-b-2 fixed border-pink-600 shadow-md w-full z-50">
      <div className="max-w-[1400px] w-full mx-auto px-8 xl:px-20 py-5 flex justify-between items-center ml-7">
        {/* Logo + Tagline */}
        <div className="flex flex-col">
          <a href="#hero" onClick={() => navigate("/")}>
            {" "}
            <h1 className="text-pink-500 font-black text-4xl lg:text-5xl tracking-widest">
              Sin & Suffer
            </h1>
          </a>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-12 text-3xl xl:text-4xl font-semibold gap-6">
          <li>
            <a
              href="#about"
              className="text-pink-100 hover:text-pink-500 transition duration-300 relative group"
            >
              About
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-600 transition-all duration-300 absolute bottom-[-4px] left-0"></span>
            </a>
          </li>
          <li>
            <a
              href="#roadmap"
              className="text-pink-100 hover:text-pink-500 transition duration-300 relative group"
            >
              Roadmap
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-600 transition-all duration-300 absolute bottom-[-4px] left-0"></span>
            </a>
          </li>
          <li>
            <a
              href="#torture-stats"
              className="text-pink-100 hover:text-pink-500 transition duration-300 relative group"
            >
              Tortures
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-600 transition-all duration-300 absolute bottom-[-4px] left-0"></span>
            </a>
          </li>
          <li>
            <a
              href="#torture-gallery"
              className="text-pink-100 hover:text-pink-500 transition duration-300 relative group"
            >
              Gallery of Pain
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-600 transition-all duration-300 absolute bottom-[-4px] left-0"></span>
            </a>
          </li>
          <li>
            <a
              href="/history"
              onClick={(e) => {
                e.preventDefault();
                navigate("/history");
              }}
              className="text-pink-100 hover:text-pink-500 transition duration-300 relative group"
            >
              Your Sins
              <span className="block h-[2px] w-0 group-hover:w-full bg-pink-600 transition-all duration-300 absolute bottom-[-4px] left-0"></span>
            </a>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div
          className="md:hidden text-pink-500 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-pink-600 px-6 pb-6">
          <ul className="flex flex-col space-y-6 text-3xl font-medium pt-4">
            <li>
              <a
                href="#about"
                className="text-pink-100 hover:text-pink-400 transition"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#roadmap"
                className="text-pink-100 hover:text-pink-400 transition"
              >
                Roadmap
              </a>
            </li>
            <li>
              <a
                href="#torture-stats"
                className="text-pink-100 hover:text-pink-400 transition"
              >
                Tortures
              </a>
            </li>
            <li>
              <a
                href="#torture-gallery"
                className="text-pink-100 hover:text-pink-400 transition"
              >
                Gallery of Pain
              </a>
            </li>
            <li>
              <a
                href="/history"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/history");
                  toggleMenu();
                }}
                className="text-pink-100 hover:text-pink-400 transition"
              >
                Your Sins
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
