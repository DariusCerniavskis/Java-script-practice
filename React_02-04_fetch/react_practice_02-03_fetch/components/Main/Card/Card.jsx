import styles from "./styles.module.css";

const Card = ({ product }) => {
    return (
        <>
            <div className={styles["card-wrapper"]}>
                <div className={styles["card-head-wrapper"]}>
                    <h4>
                        R: <span>{product.rating.rate}</span>
                    </h4>
                    <h4>
                        C: <span>{product.rating.count}</span>
                    </h4>
                </div>

                <img
                    className={styles["image"]}
                    src={product.image}
                    alt="my image"
                />

                <div className={styles["card-bottom-wrapper"]}>
                    <h4 className={styles["title"]}>{product.title}</h4>

                    <h4 className={styles["price"]}>{product.price}</h4>
                    <h4 className={styles["description"]}>
                        {product.description}
                    </h4>
                </div>
            </div>
        </>
    );
};

export default Card;
