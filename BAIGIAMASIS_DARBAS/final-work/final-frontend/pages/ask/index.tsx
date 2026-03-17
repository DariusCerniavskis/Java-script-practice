import { useState } from "react";
import { createQuestion } from "@/api/question";
import { useRouter } from "next/router";

const Ask = () => {
    const [text, setText] = useState("");
    const router = useRouter();

    const submit = async () => {
        await createQuestion(text);

        router.push("/");
    };

    return (
        <div>
            <h2>Ask question</h2>

            <textarea value={text} onChange={(e) => setText(e.target.value)} />

            <br />

            <button onClick={submit}>Submit</button>
        </div>
    );
};

export default Ask;
