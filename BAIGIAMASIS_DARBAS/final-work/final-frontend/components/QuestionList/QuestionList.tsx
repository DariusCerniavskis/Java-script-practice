import styles from "./styles.module.css";

type Answer = {
    _id: string;
    answer_text: string;
    user_id: string;
    likes: string[]; // masyvas userId
    dislikes: string[];
    createdAt: string;
};

type Question = {
    id: string;
    questionText: string;
    userId: string;
    createdAt: string;
    answers?: Answer[];
};

type questionListProps = {
    question: Question[];
    onClickQuestion: (id: string) => void;
    onClickRemoveQuestion: (id: string) => void;
};

const QuestionList = ({
    question,
    onClickQuestion,
    onClickRemoveQuestion,
}: questionListProps) => {
    return (
        <div>
            <h2>Klausimai</h2>
            {question.length === 0 && <p>Dar nėra klausimų.</p>}
            {question.map((q) => (
                <div className={styles["question-wrapper"]} key={q.id}>
                    <h3
                        className={styles["question-text"]}
                        onClick={() => onClickQuestion(q.id)}
                    >
                        {q.questionText}
                    </h3>

                    <p className={styles["date-text"]}>
                        Sukurtas: {new Date(q.createdAt).toLocaleString()}
                    </p>

                    <button
                        className={styles["button-style"]}
                        onClick={() => onClickRemoveQuestion(q.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default QuestionList;

//    onClick={() => router.push(`/questions/${q.id}`)}
