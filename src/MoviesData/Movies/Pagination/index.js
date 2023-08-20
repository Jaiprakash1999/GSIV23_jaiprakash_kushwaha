import styles from "./styles.module.css";

const Pagination = ({
    total_results,
    setCurrentPage,
    currentPage,
    total_pages,
}) => {
    const startItem = (currentPage - 1) * 20 + 1;
    let endItem = startItem - 1 + 20;
    if (endItem > total_results) {
        endItem = total_results;
    }

    return (
        <div className={styles.container}>
            <span>
                <strong>
                    Showing Results {startItem} - {endItem} out of{" "}
                    {total_results}{" "}
                </strong>
            </span>
            <div className={styles.button}>
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={styles.icon}
                    disabled={currentPage === 1}
                >
                    <svg
                        height="16px"
                        id="svg2"
                        version="1.1"
                        viewBox="0 0 32 32"
                        width="16px"
                    >
                        <g id="background">
                            <rect fill="none" height="32" width="32" />
                        </g>
                        <g id="play_x5F_back">
                            <polygon points="22,4 10,15.999 22,28  " />
                        </g>
                    </svg>
                </button>
                <strong className={styles.text}>{currentPage} </strong>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={styles.icon}
                    disabled={currentPage === total_pages}
                >
                    <svg
                        height="16px"
                        id="svg2"
                        version="1.1"
                        viewBox="0 0 32 32"
                        width="16px"
                    >
                        <g id="backbord">
                            <rect fill="none" height="32" width="32" />
                        </g>
                        <g id="play">
                            <polygon points="10,4 22,15.999 10,28  " />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
    );
};
export default Pagination;
