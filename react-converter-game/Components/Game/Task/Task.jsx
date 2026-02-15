import styles from "./styles.module.css";

const Task = () => {
    return (
        <>
            <div>
                <div className={styles["p-wrapper"]}>
                    <h2>Užduotis:</h2>
                    <p>
                        Pateiktą 10-tainės skaičiavimo sistemos (toliau: SKS)
                        skaičių paversti kitos skačiavimo sistemos skačiumi.
                        Žaidėjas turi galimybę 3 kartus suklysti. Tesingai
                        atlikus užduotis, gaunami pinigėliai.
                    </p>
                </div>
                <div className={styles["p-wrapper"]}>
                    <h3>Pinigėlius galima panaudoti:</h3>
                    <ul>
                        <li>atstatyti prarastą gyvybę ($100)</li>
                        <li>
                            atskleisti 4 pirmus skaitmenis 2-tainėje SKS ($100)
                        </li>
                        <li>
                            atskleisti pirmą skaitmenį 16-tainėje SKS ($100)
                        </li>
                        <li>šuolis į kitą užduotį ($200)</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Task;
