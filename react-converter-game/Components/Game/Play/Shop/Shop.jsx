import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Shop = ({ player, shopGoods }) => {
    useEffect(() => {
        const getFilteredGoods = (isSuper) => {
            return shopGoods.filter((g) => {
                return g.isSuperPower === isSuper;
            });
        };
    }, [filteredGoods]);

    return (
        <>
            <div className={styles["shop-wrapper"]}>
                <h2>Shop</h2>
                <div className={styles["power-wrapper"]}>
                    <h3>Powers and prices: </h3>
                    {getFilteredGoods(false).map((fg) => {
                        <button>
                            `${fg.name} (${fg.price})`{" "}
                        </button>;
                    })}
                </div>

                <div className={styles["power-wrapper"]}>
                    <h3>Super power and price: </h3>

                    {getFilteredGoods(true).map((fg) => {
                        <button>
                            `${fg.name} (${fg.price})`{" "}
                        </button>;
                    })}
                </div>
            </div>
        </>
    );
};

export default Shop;
