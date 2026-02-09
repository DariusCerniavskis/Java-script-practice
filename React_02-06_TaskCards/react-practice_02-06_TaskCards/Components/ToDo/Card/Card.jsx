

import styles from "../styles/main.module.css";

const Card = ({currTask}) => {
    return (
        <>
             <div
                key={currTask.id}
                className={styles.card}
                onClick={() => onCardClick(currTask.id)}
              >
                <h3>{currTask.title}</h3>
                <div
                  className={`${styles.indicator} ${currTask.isCompleted ? styles.completed : styles.notCompleted}`}
                ></div>
              </div>



        </>
    )}
export default Card;