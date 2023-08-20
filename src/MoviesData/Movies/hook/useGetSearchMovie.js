/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import useDebounceQuery from "./useDebounceQuery";

const useGetSearchMovie = ({ searchInput }) => {
    const [searchData, setSearchData] = useState([]);
    const [searchDataLoading, setSearchDataLoading] = useState(true);
    const { query = "", debounceQuery } = useDebounceQuery();

    useEffect(() => {
        debounceQuery(searchInput);
    }, [debounceQuery, searchInput]);

    const getSearchData = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=be3ee1b68f89d61c2300f82023585fbc&query=${query}`
            );
            setSearchData(response.data);
            setSearchDataLoading(false);
        } catch (error) {
            console.error(error, "Oops Somthing Went wrong");
            setSearchDataLoading(false);
        }
    };

    useEffect(() => {
        if (searchInput.trim() !== "") {
            getSearchData();
        }
    }, [query]);

    return {
        searchData,
        searchDataLoading,
        query,
    };
};
export default useGetSearchMovie;
