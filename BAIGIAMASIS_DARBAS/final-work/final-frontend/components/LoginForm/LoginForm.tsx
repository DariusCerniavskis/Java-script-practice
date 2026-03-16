import styles from "./styles.module.css";

type LoginFormProps = {
    nameOrEmail: string;
    setNameOrEmail: (x: string) => void;
    password: string;
    infoMessage: string;
    setPassword: (x: string) => void;
    onFormLogin: () => void;
    onFormNewUser: () => void;
};

const LoginForm = ({
    nameOrEmail,
    setNameOrEmail,
    password,
    setPassword,
    infoMessage,
    onFormLogin,
    onFormNewUser,
}: LoginFormProps) => {
    return (
        <div className={styles.main}>
            <div className={styles["main-section-wrapper"]}>
                <h2>User login </h2>

                <div className={styles["line-wrapper"]}>
                    <h3>Name or email: </h3>

                    <input
                        type="text"
                        value={nameOrEmail}
                        onChange={(e) => setNameOrEmail(e.target.value)}
                    />
                </div>

                <div className={styles["line-wrapper"]}>
                    <h3>Password: </h3>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={styles["line-wrapper"]}>
                    <h3>Information: </h3>

                    <div className={styles["info-message"]}>{infoMessage}</div>
                </div>

                <div className={styles["line-wrapper"]}>
                    <button
                        className={styles["button-style"]}
                        onClick={onFormLogin}
                    >
                        Login
                    </button>

                    <button
                        className={styles["button-style"]}
                        onClick={onFormNewUser}
                    >
                        New user
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
