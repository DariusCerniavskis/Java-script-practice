import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

type PageTemplateProps = {
    userName: string;
    isMounted: boolean;
    onNavNewUser: () => void;
    onNavLogin: () => void;
    onNavLogout: () => void;

    children: React.ReactNode;
};

const PageTemplate = ({
    userName,
    isMounted,
    onNavNewUser,
    onNavLogin,
    onNavLogout,
    children,
}: PageTemplateProps) => {
    console.log("page user name");
    console.log(userName);

    return (
        <div className={styles.wrapper}>
            <Header
                userName={userName}
                isMounted={isMounted}
                onNavNewUser={onNavNewUser}
                onNavLogin={onNavLogin}
                onNavLogout={onNavLogout}
            />
            <div className={styles.content}>{children}</div>
            <Footer />
        </div>
    );
};

export default PageTemplate;
