import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import useGetSelectedMovie from "../hook/useGetSelectedMovie";
import { formattedTime } from "./formatedTime";
const MovieDetails = () => {
    const navigate = useNavigate();
    const handleProfile = () => {
        navigate("/", {});
    };

    const location = useLocation();
    const { state = {} } = location || {};
    const { id: movieId } = state;

    const {
        searchResult = {},
        creditData = {},
        loadingSearchResult = false,
        creditDataLoading = false,
        movieTrailer = {},
        loadingMovieTrailer,
    } = useGetSelectedMovie({
        movieId,
    });

    const { crew = [], cast = [] } = creditData;
    const { results = [] } = movieTrailer;
    const trailer = results.find((video) => video.type === "Trailer");

    console.log(trailer, "trailer");

    const directorName = crew.reduce(
        (directorArray, director) =>
            director.job === "Director"
                ? [...directorArray, director.name]
                : [...directorArray],
        []
    );
    const actorName = cast.reduce(
        (actorNameArray, actor) =>
            actor.known_for_department === "Acting"
                ? [...actorNameArray, actor.name]
                : [...actorNameArray],
        []
    );

    const {
        poster_path,
        title,
        release_date,
        overview,
        runtime,
        vote_average,
        genres = [],
    } = searchResult;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.heading}>Movie Details</h3>
                <div onClick={() => handleProfile()} className={styles.home}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                    >
                        <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z" />
                    </svg>
                </div>
            </div>

            {loadingSearchResult || creditDataLoading ? (
                <div className={styles.loader}>
                    <strong>Loading...</strong>
                </div>
            ) : (
                <div className={styles.description_container}>
                    <div className={styles.trailer_poster}>
                        <div className={styles.poster_container}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={title}
                                className={styles.poster}
                            />
                        </div>
                        {loadingMovieTrailer ? (
                            <div className={styles.loader}>
                                <strong>Loading...</strong>
                            </div>
                        ) : (
                            <div>
                                {trailer?.key && (
                                    <iframe
                                        title="Movie Trailer"
                                        src={`https://www.youtube.com/embed/${trailer?.key}`}
                                        className={styles.trailer}
                                        allowFullScreen
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.title}>
                            <h3>{title} </h3>
                            <h4 className={styles.name}>
                                {" "}
                                ({vote_average}/10)
                            </h4>
                        </div>

                        <div>
                            <strong>Release Date : </strong>
                            <span className={styles.name}>{release_date}</span>
                            <span className={styles.vr} />
                            <strong>Runtime : </strong>
                            <span className={styles.name}>
                                {" "}
                                {formattedTime(runtime)} min{" "}
                            </span>
                        </div>

                        <div className={styles.description}>
                            <strong>Genre : </strong>
                            {genres.map((item) => {
                                return (
                                    <spna key={item.id} className={styles.text}>
                                        {item.name},
                                    </spna>
                                );
                            })}
                        </div>

                        <div className={styles.description}>
                            <strong>Director : </strong>
                            {(directorName || []).map((director) => {
                                return (
                                    <span
                                        key={director}
                                        className={styles.text}
                                    >
                                        {director},
                                    </span>
                                );
                            })}
                        </div>

                        <div className={styles.description}>
                            <strong>Cast : </strong>
                            {(actorName || []).map((name) => {
                                return (
                                    <span key={name} className={styles.text}>
                                        {name},
                                    </span>
                                );
                            })}
                        </div>

                        <div className={styles.description}>
                            <strong> Description : </strong>
                            <span className={styles.name}>{overview}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MovieDetails;
