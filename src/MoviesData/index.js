import { BrowserRouter, Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import MovieDetails from "./Movies/MovieDetails";

const MoviesData = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movieDetails/*" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
};
export default MoviesData;
