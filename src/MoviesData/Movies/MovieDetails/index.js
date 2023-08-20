import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import useGetSelectedMovie from "../hook/useGetSelectedMovie";
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
    } = useGetSelectedMovie({
        movieId,
    });
    const { crew = [], cast = [] } = creditData;
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
                    <div className={styles.poster_container}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={title}
                            className={styles.poster}
                        />
                    </div>

                    <div className={styles.details}>
                        <div className={styles.title}>
                            <h3>{title} </h3>
                            <h4 className={styles.name}>
                                {" "}
                                ({vote_average}/10)
                            </h4>
                        </div>

                        <div className={styles.title}>
                            <span className={styles.text}>{release_date}</span>
                            <span className={styles.vr} />
                            <span className={styles.text}> {runtime} min </span>
                        </div>

                        <div className={styles.description}>
                            <span className={styles.cast}>Director : </span>
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
                            <span className={styles.cast}>Cast : </span>
                            {(actorName || []).map((name) => {
                                return (
                                    <span key={name} className={styles.text}>
                                        {name},
                                    </span>
                                );
                            })}
                        </div>

                        <div className={styles.description}>
                            <span className={styles.cast}> Description : </span>
                            <span className={styles.name}>{overview}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MovieDetails;
