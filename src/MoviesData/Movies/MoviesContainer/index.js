import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import styles from "./styles.module.css";
import useGetSearchMovie from "../hook/useGetSearchMovie";
import useGetMovieList from "../hook/useGetMovieList";

const MoviesContainer = ({ searchInput }) => {
    const navigate = useNavigate();

    const handleProfile = (id) => {
        navigate("/movieDetails", { state: { id } });
    };

    const {
        data = {},
        movieListLoading = false,
        currentPage,
        setCurrentPage,
    } = useGetMovieList();

    const { results = [], total_results, total_pages } = data;

    const { searchData, query, searchDataLoading } = useGetSearchMovie({
        searchInput,
    });

    const {
        results: searchedMovieData = [],
        total_pages: total_searched_pages,
        total_results: total_searched_results,
    } = searchData || {};

    let filteredData = results;
    let totalPages = total_pages;
    let totalResults = total_results;
    let loading = movieListLoading;

    if (query.trim() !== "") {
        filteredData = searchedMovieData;
        totalPages = total_searched_pages;
        totalResults = total_searched_results;
        loading = searchDataLoading;
    }

    return (
        <>
            {loading ? (
                <div className={styles.no_data}>
                    <strong>Loading...</strong>
                </div>
            ) : (
                <>
                    {filteredData?.length > 0 ? (
                        <div className={styles.movie_container}>
                            {(filteredData || [])?.map((movie) => {
                                const {
                                    id,
                                    vote_average,
                                    title,
                                    poster_path,
                                    overview,
                                } = movie || {};
                                return (
                                    <div
                                        key={id}
                                        className={styles.movie_card}
                                        onClick={() => handleProfile(id)}
                                    >
                                        <div>
                                            <img
                                                src={
                                                    poster_path
                                                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                                                        : `https://via.placeholder.com/500x750?text=No+Poster+Available`
                                                }
                                                alt={title}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.bottom}>
                                            <div className={styles.heading}>
                                                <div>{title}</div>
                                                <div>{vote_average}/10</div>
                                            </div>
                                            <div>
                                                <div
                                                    className={
                                                        styles.desktop_view_description
                                                    }
                                                >{`${overview.substring(
                                                    0,
                                                    70
                                                )} ...`}</div>
                                                <div
                                                    className={
                                                        styles.mobile_view_description
                                                    }
                                                >{`${overview.substring(
                                                    0,
                                                    40
                                                )} ...`}</div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <footer className={styles.pagination}>
                                <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    total_results={totalResults}
                                    total_pages={totalPages}
                                />
                            </footer>
                        </div>
                    ) : (
                        <div className={styles.no_data}>
                            <strong>No results found</strong>
                            <span>Please try searching for somthing else!</span>
                        </div>
                    )}
                </>
            )}
        </>
    );
};
export default MoviesContainer;
