import styles from "./styles.module.css";
import Navigation from "./Navigation/Navigation";
import { useState } from "react";

const Header = () => {
    const [logo, setLogo] = useState("CodeAcademy");

    const [navNames, setNavNames] = useState([
        {
            id: "0",
            name: "About",
        },
        {
            id: "1",
            name: "Portfolio",
        },
        {
            id: "2",
            name: "Contacts",
        },
    ]);

    return (
        <header>
            <div className={styles.header}>
                <h3>{logo}</h3>

                <div className={styles.navigationWrapper}>
                    {navNames.map((n) => {
                        return <Navigation navName={n.name} />;
                    })}
                </div>
            </div>
        </header>
    );
};

export default Header;
