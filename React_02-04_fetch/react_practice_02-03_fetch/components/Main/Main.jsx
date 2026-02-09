import styles from "./styles.module.css";
import Card from "./Card/Card";

const Main = ({ data, setData }) => {
    const mainTitle = "My products";

    return (
        <>
            <div className={styles["main-wrapper"]}>
                <h2 className={styles["main-header"]}>{mainTitle}</h2>
                <div className={styles["cards-wrapper"]}>
                    {data
                        ? data.map((d) => {
                              return <Card product={d} />;
                          })
                        : "spinner"}
                </div>
            </div>
        </>
    );
};

export default Main;
