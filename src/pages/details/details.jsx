import axios from "axios";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
let env = import.meta.env.VITE_AUTH;

function Details({ close, id }) {
  const [executed, setExecuted] = useState(false);
  const [movie, setMovie] = useState({});

  const movieDetails = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: env,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch(function (error) {
        console.error(error.response);
      });

    setExecuted(true);
  };
  {
    executed ? "" : movieDetails();
  }
  return (
    <div className='absolute left-0 right-0 top-0 z-30 mx-auto min-h-screen rounded-md border-[1px] border-sub bg-primary dark:bg-primaryDark lg:top-5 lg:w-[90%]'>
      <div className='absolute left-0 z-20 flex  w-full justify-end p-4'>
        <button onClick={() => close()}>
          <IoIosCloseCircle
            size={"2rem"}
            className='text-primaryDark dark:text-white/80'
          />
        </button>
      </div>

      {/* Movie Details */}
      <main className=''>
        <section className='relative isolate'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt=''
            className='h-1/4 w-full md:h-1/3 lg:h-2/4'
          />
          <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-primary/80 from-0%  to-primary dark:from-primaryDark/80 dark:to-primaryDark'>
            <div className='mt-24 px-3 lg:mt-40 lg:px-16 '>
              <div className='flex items-center'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=''
                  className='h-40 rounded-md md:h-60 lg:h-64'
                />

                {/* Details */}
                <section className='ml-2 overflow-x-auto md:ml-5'>
                  <p className='text-xl font-black text-purple lg:text-2xl'>
                    {movie.original_title}
                  </p>

                  <p className='text-sm text-txt dark:text-white/70'>
                    Rating: {movie.vote_average * 10}
                    <sup className='text-[0.5rem]'>%</sup>
                  </p>

                  <div className='no-scrollbar mt-1 flex overflow-x-scroll'>
                    {movie.genres &&
                      movie.genres.map((genre) => (
                        <div
                          className='min-h-5 mr-1 max-h-8 text-clip rounded border-2 border-white/80 bg-white/30 px-3 py-1 text-sm text-white/80 lg:text-base'
                          key={genre.id}
                        >
                          {genre.name}
                        </div>
                      ))}
                  </div>

                  <p className='mt-3 hidden leading-loose text-txt dark:text-white/80 md:block'>
                    {movie.overview}
                  </p>
                </section>
              </div>
              {/* Overview */}
              <p className='mt-3 leading-relaxed md:hidden text-txt dark:text-white/80'>
                {movie.overview}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Details;
