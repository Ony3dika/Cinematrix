import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className='mt-5 flex items-center justify-between rounded-t-xl border-t-2 border-t-purple bg-gray-100/80 p-5 dark:bg-txt/10 lg:py-10'>
      <section className='basis-1/4'>
        <p className='head bg-gradient-to-r from-sub to-purple bg-clip-text text-lg font-bold  text-transparent md:text-3xl '>
          Cinematrix
        </p>
      </section>

      <p className='hidden basis-1/2 md:block text-center text-txt dark:text-white/80'>
        All Data Sourced From <a className="text-purple" href='https://www.themoviedb.org/' target="_blank" rel="noreferrer">TheMovieDb</a>
      </p>

      <section className='flex basis-2/5 justify-around md:basis-1/4'>
        <a
          className='text-txt transition-all duration-300 ease-linear hover:text-purple dark:text-white/80 dark:hover:text-purple'
          href='https://github.com/Ony3dika'
          target='_blank'
          rel='noreferrer'
        >
          <FaGithub size={"1.4rem"} />
        </a>
        <a
          className='text-txt transition-all duration-300 ease-linear hover:text-purple dark:text-white/80 dark:hover:text-purple'
          href='https://twitter.com/Ony3dikaa/'
          target='_blank'
          rel='noreferrer'
        >
          <FaTwitter size={"1.4rem"} />
        </a>
        <a
          className='text-txt transition-all duration-300 ease-linear hover:text-purple dark:text-white/80 dark:hover:text-purple'
          href='https://www.linkedin.com/in/onyedikachukwu-akpa-127360248'
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedin size={"1.4rem"} />
        </a>
      </section>
    </footer>
  );
}

export default Footer