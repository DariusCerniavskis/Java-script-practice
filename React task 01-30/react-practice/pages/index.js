import styles from "../styles/main.module.css";

const Main = () => {
    return (
        <>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <header>
                        <div className={styles.headerWrapper}>
                            <div className={styles.logoWrapper}>
                                <img
                                    src="./assets/icon/logo.png"
                                    alt="chair logo png"
                                />
                            </div>

                            <nav className={styles.navWrapper}>
                                <ul>
                                    <li>
                                        <a href="#">SHOP ALL</a>
                                    </li>
                                    <li>
                                        <a href="#">CANVASES</a>
                                    </li>

                                    <li>
                                        <a href="#">POSTERS</a>
                                    </li>

                                    <li>
                                        <a href="#">STICKERS</a>
                                    </li>
                                    <li>
                                        <a href="#">ABOUT US</a>
                                    </li>

                                    <li>
                                        <a href="#">CONTACTS</a>
                                    </li>

                                    <li>
                                        <div className={styles.eshopWrapper}>
                                            <h4 className="">0.00€</h4>
                                            <a href="#">
                                                <img
                                                    src="./assets/icon/eshop.png"
                                                    alt="eshop doing svg icon"
                                                />
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </header>
                </div>

                <section>
                    <h5>The most confortable chair for you home</h5>
                    <h1>CHAIR WORLD</h1>

                    <button>
                        <a href="#">
                            <h4>SHOP ALL</h4>
                        </a>
                    </button>
                </section>
            </main>

            <footer className={styles.footer}>
                <div>
                    <h3>CATEGORIES</h3>

                    <div>
                        <section>
                            <div>
                                <img
                                    src="./assets/img/cards/chair1.jpg"
                                    alt="Office chair"
                                />
                            </div>
                            <h4>OFFICE CHAIR</h4>
                        </section>

                        <section>
                            <div>
                                <img
                                    src="./assets/img/cards/chair2.jpg"
                                    alt="Blue chair"
                                />
                            </div>
                            <h4>BLUE CHAIR</h4>
                        </section>

                        <section>
                            <div>
                                <img
                                    src="./assets/img/cards/chair3.jpg"
                                    alt="Leather chair"
                                />
                            </div>
                            <h4>LEATHER CHAIR</h4>
                        </section>

                        <section>
                            <div>
                                <img
                                    src="./assets/img/cards/chair4.jpg"
                                    alt="Throne"
                                />
                            </div>
                            <h4>THRONE</h4>
                        </section>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Main;
