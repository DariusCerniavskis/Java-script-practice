import styles from "./styles.module.css";

const topUserLine = () => {
    return (
        <>
            <div className={styles["top-user-line"]}>
                <h4 className={styles["number"]}>1. </h4>

                <h4 className={styles["name"]}>user1</h4>
                <h4 className={styles["date-time"]}>2026-03-05 16:00:00</h4>
                <h4 className={styles["result"]}>98%</h4>
            </div>
        </>
    );
};

export default topUserLine;
