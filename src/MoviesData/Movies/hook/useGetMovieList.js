/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

const useGetMovieList = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const getMovieList = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/upcoming?api_key=be3ee1b68f89d61c2300f82023585fbc&page=${currentPage}`
            );
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err || "Opps Somthing went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovieList();
    }, [currentPage]);

    return {
        data,
        movieListLoading: loading,
        currentPage,
        setCurrentPage,
    };
};

export default useGetMovieList;
