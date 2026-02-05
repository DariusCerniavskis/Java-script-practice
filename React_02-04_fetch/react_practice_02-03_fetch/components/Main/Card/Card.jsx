import styles from "./styles.module.css";

const Card = ({ pizza }) => {
    const infoOnClick = () => {
        console.log(pizza.description);
    };

    return (
        <>
            <div className={styles["card-wrapper"]} onClick={infoOnClick}>
                <img src={pizza.imgUrl} alt="my dish" />
                <h4>{pizza.title}</h4>
            </div>
        </>
    );
};

export default Card;

<button
    onClick={() => {
        setTravels([]);
    }}
>
    DELETE ALL
</button>;
