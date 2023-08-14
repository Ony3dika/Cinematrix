import axios from "axios";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BsBoxArrowUpRight, BsFillStarFill } from "react-icons/bs";
let env = import.meta.env.VITE_AUTH;
import loader from "../../assets/loader.svg";

function Details({ close, id }) {
  const [executed, setExecuted] = useState(false);
  const [movie, setMovie] = useState({});
  const [movieImage, setMovieImage] = useState([]);
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);

  const movieDetails = () => {
    const movieData = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: env,
      },
    };

    movieImages()
    axios
      .request(movieData)
      .then(function (response) {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error.response);
        setValidate(true);
      });

    setExecuted(true);
  };

  const movieImages = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/images`,
      headers: {
        accept: "application/json",
        Authorization: env,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovieImage(response.data.backdrops)
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  {
    executed ? "" : movieDetails();
  }
  return (
    <div className='fixed left-0 right-0 top-0 z-30 mx-auto overflow-y-scroll min-h-screen rounded-md border-purple/40 bg-primary dark:bg-primaryDark lg:top-5 lg:w-[90%] lg:border-[1px]'>
      <div className='absolute left-0 z-20 flex w-full justify-end p-4'>
        <button onClick={() => close()}>
          <IoIosCloseCircle
            size={"2rem"}
            className='text-primaryDark dark:text-white/80'
          />
        </button>
      </div>

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

      {/* Movie Details */}
      <main>
        <section className='relative isolate'>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
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

                  <p className='flex items-center text-sm text-txt dark:text-white/70'>
                    Rating:{" "}
                    <BsFillStarFill
                      size={"0.8rem"}
                      className='mx-1 text-yellow-400'
                    />
                    <span>{movie.vote_average} / 10</span>
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

                  <a href={movie.homepage} target='_blank' rel='noreferrer'>
                    <button className='mt-2 flex items-center rounded-md border-2 border-purple bg-purple/40 px-5 py-1 text-txt dark:text-white/80'>
                      Visit <BsBoxArrowUpRight className='ml-1' size={"1rem"} />
                    </button>
                  </a>
                </section>
              </div>
              {/* Overview */}
              <p className='mt-3 leading-relaxed text-txt dark:text-white/80 md:hidden'>
                {movie.overview}
              </p>

              <div className="flex mt-5 overflow-x-scroll no-scrollbar">
                {movieImage &&
                  movieImage.map((image, index) => (
                    <img
                      src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                      key={index}
                      className="rounded-md mx-3 h-32 md:h-40 lg:h-52"
                      alt=''
                    />
                  ))}
              </div>

              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati, possimus? Asperiores aut consequuntur soluta, veniam magni fuga sint natus deleniti dolorum voluptatum aperiam nemo debitis molestiae sapiente exercitationem. A in doloremque sapiente architecto odio error illo quaerat. Nihil sequi aspernatur cumque vitae animi vel, expedita veniam beatae. Alias, corporis distinctio!</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Details;
