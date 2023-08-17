import Hero from "./hero";
import Navbar from "../../components/navbar";
import Popular from "../landing/popular"
import Footer from "../../components/footer";

function Home() {
  return (
    <main className='bg-primary dark:bg-primaryDark relative'>
      <div className='container mx-auto min-h-screen px-5 lg:px-24'>
        <Navbar />
        <Hero/>
        <Popular/>
        <Footer/>
      </div>
    </main>
  );
}

export default Home;
