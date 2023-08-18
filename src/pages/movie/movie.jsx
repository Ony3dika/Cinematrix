import Navbar from "../../components/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
let API_KEY = import.meta.env.VITE_AUTH;
import { GiPreviousButton, GiNextButton } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import loader from "../../assets/loader.svg";
import { movieID } from "../../constants/store";
import Details from "../details/details";
import Footer from "../../components/footer";

function Movie() {
  const [popular, setPopular] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [validate, setValidate] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [retry, setRetry] = useState(false);
  const [id, setId] = useState(movieID);

  useEffect(() => {
    setLoading(true);
    const pop = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular",
      params: { language: "en-US", page: pageNo },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    const getPop = axios.request(pop);

    axios
      .all([getPop])
      .then(
        axios.spread((...allData) => {
          setPopular(allData[0].data.results);
          setLoading(false);
        })
      )

      .catch(function (error) {
        console.log(error);
        setValidate(true);
      });
  }, [retry, pageNo]);

  const getSearch = () => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: search,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization: API_KEY,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setPopular(response.data.results);
        console.log(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setValidate(true);
      });
  };

  // ClosePopUp

  const close = () => {
    setPopUp(false);
  };
  return (
    <main className='bg-primary dark:bg-primaryDark'>
      <div id='top' className='container mx-auto min-h-[110vh] px-5 lg:px-24'>
        <Navbar />
        <div>
          <div
            className={`${
              loading ? "hidden" : "block"
            } flex items-baseline justify-between md:pr-8`}
          >
            <p className='mt-5 w-fit rounded-sm border-b-[3px] border-purple pl-2 pr-5 text-xl font-black text-purple lg:text-2xl'>
              Movies
            </p>

            <div className='flex basis-1/5 items-center rounded-md border-2 border-purple py-1'>
              <input
                type='text'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='bg-transparent pl-2 text-txt outline-none dark:text-white/80 '
              />
              <button
                onClick={() => getSearch()}
                className='text-txt hover:text-purple  dark:text-white/80 dark:hover:text-purple md:pr-2'
              >
                <BiSearchAlt />
              </button>
            </div>
          </div>
          {popUp ? <Details id={id} close={close} /> : ""}

          {/* LOADING */}
          <section className='fixed left-0 right-0 top-10 z-50 mx-auto flex w-5/6 justify-center lg:w-2/3'>
            {loading ? (
              <div className='h-1/10 mt-10 flex w-full justify-center'>
                <div className='z-10 flex h-fit w-1/2 justify-center rounded-md border-[1px] border-purple bg-gray-400 backdrop-blur-md dark:bg-txt/70 lg:w-1/3'>
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

          {/* POPULAR */}

          <section className='mt-5 grid grid-cols-2 gap-y-5 gap-x-3 md:grid-cols-4 lg:grid-cols-5'>
            {popular &&
              popular.map((movie) => (
                <div
                  key={movie.id}
                  className='mr-4 min-h-fit w-44 flex-none overflow-clip rounded-md border-2 border-transparent bg-gray-100/80 transition-all duration-300 ease-linear hover:border-2 hover:border-purple dark:bg-txt/30'
                  onClick={() => {
                    setId(movie.id);
                    setPopUp(true);
                  }}
                >
                  <figure className='flex justify-center'>
                    <img
                      className='h-56 rounded-md transition-all duration-500 hover:scale-110 md:h-60 lg:h-64'
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt=''
                    />
                  </figure>

                  {/* NAME */}
                  <article className='relative isolate z-0'>
                    <div className='absolute -top-6 ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-purple  bg-gray-100/80 dark:bg-txt/90 '>
                      <p className='text-sm text-txt dark:text-white/70'>
                        {Math.round(movie.vote_average * 10)}
                        <sup className='text-[0.5rem]'>%</sup>
                      </p>
                    </div>
                    <p className='ml-2 pt-2 font-medium text-txt dark:text-white/70'>
                      {movie.title}
                    </p>

                    <p className='ml-2 mt-3 font-medium text-txt/60 dark:text-white/40'>
                      {movie.release_date.slice(0, 4)}
                    </p>
                  </article>
                </div>
              ))}
          </section>

          <div className='flex justify-center py-5'>
            {/* Previous Button */}
            <a href='#top'>
              <button
                onClick={() => {
                  if (pageNo > 1) {
                    setPageNo((prevNo) => prevNo - 1);
                  }
                }}
                className='mr-5 mt-5 flex justify-center rounded-xl border-[1px] border-purple bg-txt/30 px-7 py-4 text-purple/60 transition-all duration-300 ease-linear hover:text-purple md:px-9'
              >
                Previous
                <GiPreviousButton className='ml-2' size={"1.5rem"} />
              </button>
            </a>

            {/* Next Button */}
            <a href='#top'>
              <button
                onClick={() => {
                  setPageNo((prevNo) => prevNo + 1);
                }}
                className='mt-5 flex justify-center rounded-xl border-[1px] border-purple bg-txt/30 px-7 py-4 text-purple/60  transition-all duration-300 ease-linear hover:text-purple md:px-9'
              >
                Next
                <GiNextButton className='ml-2' size={"1.5rem"} />
              </button>
            </a>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default Movie;
