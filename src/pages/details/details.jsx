import axios from "axios";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { BsBoxArrowUpRight, BsFillStarFill } from "react-icons/bs";
let API_KEY = import.meta.env.VITE_AUTH;
import loader from "../../assets/loader.svg";

function Details(props) {
  const [executed, setExecuted] = useState(false);
  const [movie, setMovie] = useState({});
  const [movieId, setmovieId] = useState("")
  const [movieImage, setMovieImage] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [retry, setRetry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);
  

  const movieDetails = (para) => {
    const movieDetails = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${para === undefined ? props.id  : para}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const recommend = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${props.id}/similar`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };
    movieImages(para);

    const getDetails = axios.request(movieDetails);
    const getRecommendations = axios.request(recommend);

    axios
      .all([getDetails, getRecommendations])
      .then(
        axios.spread((...allData) => {
          setMovie(allData[0].data);
          setRecommendations(allData[1].data.results);
          setLoading(false);
        })
      )
      .catch(function (error) {
        console.error(error.response);
        setValidate(true);
      });

    setExecuted(true);
  };

  const movieImages = (para) => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${para === undefined ? props.id  : para}/images`,
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setMovieImage(response.data.backdrops);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  {
    executed ? "" : movieDetails();
  }
  return (
    <div className='fixed left-0 right-0 top-0 z-30 mx-auto min-h-screen overflow-y-scroll rounded-md border-purple/40 bg-primary dark:bg-primaryDark lg:top-5 lg:w-[90%] lg:border-[1px]'>
      <div className='absolute left-0 z-20 flex w-full justify-end p-4'>
        <button onClick={() => props.close()}>
          <IoIosCloseCircle
            size={"2rem"}
            className='text-primaryDark/80  hover:text-primaryDark dark:text-white/50 hover:dark:text-white/80'
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
                <img className='h-28' src={loader} alt='loading...' />
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </section>

      {/* Movie Details */}
      <main
        className={`min-h-screen overflow-y-scroll  ${
          loading ? "hidden" : "block"
        }`}
      >
        <section className='relative isolate'>
          <img
            loading='lazy'
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt='movie-backdrop'
            className='h-1/4 w-full md:h-1/3 lg:h-2/4'
          />
          <div className='absolute left-0 top-0 h-full w-full bg-gradient-to-b from-primary/80 from-0% to-primary dark:from-primaryDark/80 dark:to-primaryDark'>
            <div className='mt-24 px-3 lg:mt-40 lg:px-16 '>
              <div className='flex items-center'>
                <img
                  loading='lazy'
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt='movie-poster'
                  className='h-40 rounded-md md:h-60 lg:h-64'
                />

                {/* Details */}
                <section className='ml-2 overflow-x-auto md:ml-5'>
                  <p className='text-xl font-black text-purple lg:text-2xl'>
                    {movie.original_title}{" "}
                    <span className='text-purple/70'>
                      ({movie.release_date && movie.release_date.slice(0, 4)})
                    </span>
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
                        <p
                          className='min-h-5 mr-1 max-h-8 text-clip rounded-2xl border-2 border-txt/80 bg-txt/10 px-3 py-1 text-sm text-txt dark:border-white/80 dark:bg-white/10 dark:text-white/80 lg:text-base'
                          key={genre.id}
                        >
                          {genre.name}
                        </p>
                      ))}
                  </div>

                  <p className='mt-3 hidden leading-loose text-txt dark:text-white/80 md:block'>
                    {movie.overview}
                  </p>

                  <a href={movie.homepage} target='_blank' rel='noreferrer'>
                    <button className='mt-2 flex items-center rounded-full border-2 border-purple bg-purple/20 px-5 py-1 text-xs text-txt dark:text-white/80 md:text-base'>
                      Visit <BsBoxArrowUpRight className='ml-1' size={"1rem"} />
                    </button>
                  </a>
                </section>
              </div>
              {/* Overview */}
              <p className='mt-3 leading-relaxed text-txt dark:text-white/80 md:hidden'>
                {movie.overview}
              </p>

              <section className='mt-5'>
                <p className='text-md w-fit rounded-sm border-b-[3px] border-purple py-1 pl-2 pr-5 font-black text-purple lg:text-lg'>
                  Images
                </p>
                <div className='no-scrollbar mt-4 flex overflow-x-scroll'>
                  {movieImage &&
                    movieImage.map((image, index) => (
                      <img
                        loading='lazy'
                        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                        key={index}
                        className='mx-3 h-32 rounded-md md:h-40 lg:h-52'
                        alt='movie-image'
                      />
                    ))}
                </div>
              </section>

              <section className='mt-5'>
                <p className='text-md w-fit rounded-sm border-b-[3px] border-purple py-1 pl-2 pr-5 font-black text-purple lg:text-lg'>
                  Recommendations
                </p>

                <div className='no-scrollbar mt-5 flex overflow-y-hidden overflow-x-scroll'>
                  {recommendations &&
                    recommendations.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => {
                          movieDetails(movie.id);
                        }}
                        className='mb-10 mr-4 min-h-fit w-40 flex-none overflow-clip rounded-md border-2 border-transparent bg-gray-100/80 transition-all duration-300 ease-linear hover:border-2 hover:border-purple dark:bg-txt/30'
                      >
                        <figure className='flex justify-center'>
                          <img
                            className='mt-5 h-40 rounded-md text-txt transition-all duration-500 hover:scale-110 dark:text-white/80 '
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt='movie_poster'
                          />
                        </figure>

                        {/* NAME */}
                        <article className='relative isolate z-0'>
                          <div className='absolute -top-6 ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple  bg-gray-100/80 dark:bg-txt/90 '>
                            <p className='text-xs text-txt dark:text-white/70'>
                              {Math.round(movie.vote_average * 10)}
                              <sup className='text-[0.4rem]'>%</sup>
                            </p>
                          </div>
                          <p className='ml-2 pt-2 font-medium text-txt dark:text-white/70'>
                            {movie.original_title}
                          </p>

                          <p className='ml-2 mt-3 font-medium text-txt/60 dark:text-white/40'>
                            {movie.release_date.slice(0, 4)}
                          </p>
                        </article>
                      </div>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Details;
