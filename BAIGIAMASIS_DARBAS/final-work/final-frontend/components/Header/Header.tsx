import styles from "./styles.module.css";
import Image from "next/image";
import logo from "./assets/logo.jpg";

type HeaderProps = {
    userName: string;
    isMounted: boolean;
    onNavNewUser: () => void;
    onNavAsk: () => void;
    onNavLogout: () => void;
};

const Header = ({
    userName,
    isMounted,
    onNavNewUser,
    onNavAsk,
    onNavLogout,
}: HeaderProps) => {
    return (
        <>
            <div className={styles["header-wrapper"]}>
                <div className={styles["logo-wrapper"]}>
                    <Image
                        src={logo}
                        alt="Krašto apsaugos ministerijos emblema"
                        width={100}
                        height={100}
                    />
                </div>

                <div className={styles["title-group"]}>
                    <div>
                        <h1>Forumas: </h1>
                    </div>
                    <div>
                        <h1>Ką žinai apie Lietuvos kariuomenę?</h1>
                    </div>
                </div>

                <div className={styles["nav-wrapper"]}>
                    <div className={styles["nav-user-wrapper"]}>
                        {isMounted && <h4>{String(userName)}</h4>}
                    </div>

                    {isMounted && (
                        <nav>
                            <ul>
                                {!userName ? (
                                    <>
                                        <li>
                                            <a href="#" onClick={onNavNewUser}>
                                                Register
                                            </a>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <a href="#" onClick={onNavAsk}>
                                                Ask question
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" onClick={onNavLogout}>
                                                Logout
                                            </a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;
