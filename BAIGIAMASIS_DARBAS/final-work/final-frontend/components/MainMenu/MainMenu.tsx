import styles from "./styles.module.css";

const MainMenu = () => {
    return (
        <>
            <div className={styles["section-wrapper"]}>
                <h2>Pagrindinis meniu </h2>

                <div className={styles["main-section-wrapper"]}>
                    <div className={styles["top-list-wrapper"]}>
                        <h3>Geriausių topas </h3>

                        <div className={styles["top-user-line"]}>
                            <h4 className={styles["number"]}>1. </h4>

                            <h4 className={styles["name"]}>user1</h4>
                            <h4 className={styles["date-time"]}>
                                2026-03-05 16:00:00
                            </h4>
                            <h4 className={styles["result"]}>98%</h4>
                        </div>
                    </div>

                    <div className={styles["main-nav-wrapper"]}>
                        <ul>
                            <li>
                                <button>Spręsti tetą</button>
                            </li>
                            <li>
                                <button>Kurti testą</button>
                            </li>
                            <li>
                                <button>Rredaguoti testą</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainMenu;
