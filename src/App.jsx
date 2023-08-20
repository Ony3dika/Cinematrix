import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/landing/home";
import Movie from "./pages/movie/movie";
import Series from "./pages/movie/series";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Movie />} path='/movie' />
            <Route element={<Series />} path='/series' />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
