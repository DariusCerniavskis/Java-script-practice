import styles from "./styles.module.css";

type RegistrationFormProps = {
    userName: string;
    setUserName: (x: string) => void;
    email: string;
    setEmail: (x: string) => void;
    password: string;
    setPassword: (x: string) => void;
    confirmPassword: string;
    setConfirmPassword: (x: string) => void;
    avatarUrl: string;
    setAvatarUrl: (x: string) => void;
    infoMessage: string;
    onFormRegistration: () => void;
    onFormLogin: () => void;
};

const RegistrationForm = ({
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    avatarUrl,
    setAvatarUrl,
    infoMessage,
    onFormRegistration,
    onFormLogin,
}: RegistrationFormProps) => {
    return (
        <div className={styles.main}>
            <div className={styles["main-section-wrapper"]}>
                <h2>User registration </h2>

                <div className={styles["line-wrapper"]}>
                    <h3>Name: </h3>

                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className={styles["line-wrapper"]}>
                    <h3>Email: </h3>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <h3>Confirm password: </h3>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className={styles["line-wrapper"]}>
                    <h3>Avatar URL: </h3>

                    <input
                        type="text"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                    />
                </div>

                <div className={styles["line-wrapper"]}>
                    <h3>Information: </h3>

                    <div className={styles["info-message"]}>{infoMessage}</div>
                </div>

                <div className={styles["line-wrapper"]}>
                    <button
                        className={styles["button-style"]}
                        onClick={onFormRegistration}
                    >
                        Registration
                    </button>

                    <button
                        className={styles["button-style"]}
                        onClick={onFormLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
