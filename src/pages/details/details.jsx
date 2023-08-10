import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";

function Details({ close, id }) {
  const movieDetails = () => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_AUTH,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response);
        console.log(id);
      })
      .catch(function (error) {
        console.error(error.response);
        console.log(id);
      });
  };

  return (
    <div className='absolute left-0 right-0 top-0 z-20 mx-auto min-h-screen overflow-hidden rounded-md border-[1px] border-sub bg-primaryDark lg:top-5 lg:w-[90%]'>
      <div className='flex justify-end p-4'>
        <button onClick={() => close()}>
          <IoIosCloseCircle size={"2rem"} className='text-white/80' />
        </button>
      </div>

      
    </div>
  );
}

export default Details;
