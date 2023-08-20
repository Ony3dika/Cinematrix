import { Link } from "react-router-dom";
import { Path } from "../constants";
import { useState, useEffect } from "react";
import { MdDarkMode, MdSunny, MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { mode } from "../constants/store";
import { useAtom } from "jotai";

function Navbar() {
  const [theme, setTheme] = useAtom(mode);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className='sticky top-0 z-20 bg-primary px-2 dark:bg-primaryDark'>
      <div className='flex py-5'>
        <section className='flex basis-full justify-between lg:basis-2/3'>
          <Link to={"/"} className='head bg-gradient-to-r from-sub to-purple bg-clip-text text-3xl font-bold text-transparent '>
            Cinematrix
          </Link>

          <div>
            <FiMenu
              size={"1.5rem"}
              className={`mt-1 lg:hidden ${
                theme === "dark" ? "text-primary/80" : "text-txt"
              } ${menu ? "hidden" : "block"}`}
              onClick={() => setMenu(true)}
            />
          </div>
        </section>
        {/* Links */}
        <section className='hidden basis-5/6 items-center justify-between lg:flex'>
          {Path.map((item, index) => (
            <Link to={item.link} key={index}>
              <button className='after:content-[" "] relative flex items-center px-3 py-1.5 text-sub/70 transition-all duration-300 ease-linear after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple after:transition-[0.3s] hover:text-purple hover:after:w-full hover:after:duration-500'>
                {item.icon} <p className='ml-1'>{item.title}</p>
              </button>
            </Link>
          ))}
        </section>

        <section className='hidden items-center justify-end lg:flex lg:basis-1/3'>
          <button
            className='flex items-center transition-all duration-300 ease-linear'
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? (
              <MdSunny className='text-primary/80' size={"1.5rem"} />
            ) : (
              <MdDarkMode className='text-txt' size={"1.5rem"} />
            )}
          </button>
        </section>
      </div>

      {/* mobile menu */}
      <section
        className={`fixed left-0 top-0 z-10 h-screen w-9/12 flex-col justify-around rounded-r-xl border-r-2 border-r-purple bg-primary/90 px-4 pl-8 pt-3 font-thin backdrop-blur-xl transition-all duration-300 dark:bg-primaryDark/90 md:px-10 md:pl-20 md:pt-10  lg:hidden ${
          menu ? "left-0" : "left-[-100%]"
        } `}
      >
        <div className='mt-3 flex justify-between'>
          <Link to={"/"}>
            <p className='head bg-gradient-to-r from-sub to-purple bg-clip-text text-2xl font-bold text-transparent '>
              Cinematrix
            </p>
          </Link>
          <div>
            <MdClose
              size={"1.5rem"}
              className='mt-1 text-purple lg:hidden'
              onClick={() => setMenu(false)}
            />
          </div>
        </div>
        {Path.map((item, index) => (
          <Link to={item.link} key={index}>
            <button className='my-5 flex items-center rounded-full py-1.5 text-sub md:my-10'>
              {item.icon} <span className='ml-1'>{item.title}</span>
            </button>
          </Link>
        ))}

        <button
          className='flex items-center transition-all duration-300 ease-linear'
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          {theme === "dark" ? (
            <MdSunny size={"1.3rem"} className='text-primary/80' />
          ) : (
            <MdDarkMode size={"1.3rem"} className='text-txt' />
          )}

          <span className='ml-1 font-medium text-sub'>Theme</span>
        </button>
      </section>
    </nav>
  );
}

export default Navbar;
