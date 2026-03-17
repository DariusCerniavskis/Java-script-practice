import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
    getAnswers,
    createAnswer,
    likeAnswer,
    dislikeAnswer,
} from "@/api/answer";

const QuestionPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [answers, setAnswers] = useState([]);
    const [text, setText] = useState("");

    const loadAnswers = async () => {
        if (!id) return;

        const data = await getAnswers(id as string);

        setAnswers(data);
    };

    useEffect(() => {
        loadAnswers();
    }, [id]);

    const submit = async () => {
        await createAnswer(text, id as string);

        setText("");

        loadAnswers();
    };

    const like = async (id: string) => {
        await likeAnswer(id);

        loadAnswers();
    };

    const dislike = async (id: string) => {
        await dislikeAnswer(id);

        loadAnswers();
    };

    return (
        <div>
            <h2>Answers</h2>

            {answers.map((a) => (
                <div
                    key={a._id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        margin: "10px",
                    }}
                >
                    <p>{a.answer_text}</p>

                    <button onClick={() => like(a._id)}>
                        👍 {a.likes.length}
                    </button>

                    <button onClick={() => dislike(a._id)}>
                        👎 {a.dislikes.length}
                    </button>
                </div>
            ))}

            <h3>Add answer</h3>

            <textarea value={text} onChange={(e) => setText(e.target.value)} />

            <br />

            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default QuestionPage;
