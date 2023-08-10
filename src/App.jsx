import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/landing/home";
import Movie from "./pages/movie/movie";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<Movie />} path='/movie' />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
