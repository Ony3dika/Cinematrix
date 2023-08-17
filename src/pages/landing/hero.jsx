import { FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import img1 from "../../assets/img1.webp";
import img2 from "../../assets/img2.webp";
import img3 from "../../assets/img3.webp";
import img4 from "../../assets/img4.webp";
import img5 from "../../assets/img5.webp";
import img6 from "../../assets/img6.webp";
import img7 from "../../assets/img7.webp";

function Hero() {
  return (
    <div className='mt-10'>
      <p className='mt-5 text-center text-2xl font-black text-txt dark:text-white/80 lg:text-4xl'>
        Your Gateway to Cinematic Adventures
      </p>

      <p className='mt-5 text-center text-base leading-relaxed text-txt/80 dark:text-white/60 lg:leading-loose'>
        From heart-pounding action to heartwarming romance, spine-chilling
        thrillers to side-splitting comedies, Cinematrix offers a diverse range
        of genres to suit every mood and taste. Whether you&apos;re a fan of
        epic blockbusters, thought-provoking dramas, or captivating
        documentaries, you&apos;ll find something that resonates with you.
      </p>

      <div className='mt-5 flex items-center justify-center'>
        <button className='mx-3 rounded-full bg-gradient-to-br from-sub to-purple px-5 py-3 font-semibold text-txt dark:text-white/80'>
          Get Started
        </button>

        <Link to={"/movie"}>
          <button className='flex items-center rounded-full border-[2px] border-purple px-2 py-3 font-semibold text-txt dark:text-white/80 lg:px-10'>
            Watch Now
            <FaGooglePlay className='ml-2' />
          </button>
        </Link>
      </div>
      {/* Images */}
      <div className='mt-6 grid grid-cols-3 gap-2 md:grid-cols-5 md:gap-3 lg:grid-cols-7 lg:gap-7'>
        <div className='block h-40 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 md:hidden lg:block lg:h-60 lg:w-36'>
          <img src={img1} className='h-full w-full object-cover' alt='img1' />
        </div>

        <div className='mt-10 h-40 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 lg:mt-10 lg:h-60 lg:w-36'>
          <img src={img2} className='h-full w-full object-cover' alt='img2' />
        </div>

        <div className='h-40 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 md:mt-16 lg:mt-16 lg:h-60 lg:w-36'>
          <img src={img3} className='h-full w-full object-cover' alt='img3' />
        </div>

        <div className='mt-24 hidden h-44 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 md:block lg:h-60 lg:w-36'>
          <img src={img4} className='h-full w-full object-cover' alt='img4' />
        </div>

        <div className='mt-16 hidden h-44 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 md:block lg:h-60 lg:w-36'>
          <img src={img5} className='h-full w-full object-cover' alt='img5' />
        </div>

        <div className='mt-10 hidden h-44 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 md:block lg:h-60 lg:w-36'>
          <img src={img6} className='h-full w-full object-cover' alt='img6' />
        </div>

        <div className='hidden h-44 w-fit overflow-hidden rounded-md shadow-lg shadow-txt dark:shadow-white/10 lg:block lg:h-60 lg:w-36'>
          <img src={img7} className='h-full w-full object-cover' alt='img7' />
        </div>
      </div>
    </div>
  );
}

export default Hero;
