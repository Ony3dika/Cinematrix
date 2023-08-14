import { useState, useEffect } from "react";
import axios from "axios";
import { movieID } from "../../constants/store";
import Details from "../details/details";
import loader from "../../assets/loader.svg";
let env = import.meta.env.VITE_AUTH;

function Trend() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [retry, setRetry] = useState(false);
  const [id, setId] = useState(movieID);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      headers: {
        accept: "application/json",
        Authorization: env,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setValidate(true);
      });
  }, [retry]);

  // ClosePopUp

  const close = () => {
    setPopUp(false);
  };

  return (
    <div className='py-5'>
      <p className='mt-5 w-fit rounded-sm border-b-[3px] border-purple py-1 pl-2 pr-5 text-xl font-black text-purple lg:text-2xl'>
        Trending
      </p>
      {popUp ? <Details id={id} close={close} /> : ""}

      {/* LOADING */}
      <section className='relative isolate flex justify-center'>
        {loading ? (
          <div className='h-1/10 mt-10 flex w-full justify-center'>
            <div className='z-10 flex h-fit w-1/2 justify-center rounded-md border-[1px] border-purple bg-gray-400 backdrop-blur-md dark:bg-txt/40 lg:w-1/3'>
              {validate ? (
                <div className='my-5 flex flex-col items-center justify-around'>
                  <p className='p-3 text-center font-extrabold text-primaryDark dark:text-white/80'>
                    Error 😵
                  </p>

                  <button
                    className='mb-3 rounded-3xl border-2 border-purple px-12 py-3 font-bold text-primaryDark dark:bg-primaryDark dark:text-white/80'
                    onClick={() => {
                      setRetry(!retry);
                      setValidate(false);
                    }}
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <img className='h-28' src={loader} />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>

      <section className='no-scrollbar mt-10 flex overflow-y-hidden overflow-x-scroll'>
        {movies &&
          movies.map((movie) => (
            <div
              key={movie.id}
              className='min-h-72 mr-4 w-44 flex-none overflow-clip rounded-md border-2 border-transparent bg-gray-100/80 transition-all duration-300 ease-linear hover:border-2 hover:border-purple dark:bg-txt/10'
              onClick={() => {
                setId(movie.id);
                setPopUp(true);
              }}
            >
              <div className='flex justify-center'>
                <img
                  className='h-56 rounded-md transition-all duration-500 hover:scale-110 md:h-60 lg:h-64'
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=''
                />
              </div>

              {/* NAME */}
              <div className='relative isolate z-0'>
                <div className='absolute -top-6 ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple  bg-gray-100/80 dark:bg-txt/90 '>
                  <p className='text-sm text-txt dark:text-white/70'>
                    {movie.vote_average * 10}
                    <sup className='text-[0.5rem]'>%</sup>
                  </p>
                </div>
                <p className='ml-2 pt-2 font-medium text-txt dark:text-white/70'>
                  {movie.original_title}
                </p>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Trend;
