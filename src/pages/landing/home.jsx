import Nav from "../../Components/navbar";
import Hero from "./hero";
import Trend from "./trend";

function Home() {
  return (
    <main className='bg-primary dark:bg-primaryDark relative'>
      <div className='container mx-auto min-h-screen px-5 lg:px-24'>
        <Nav />
        <Hero/>
        <Trend/>
      </div>
    </main>
  );
}

export default Home;
