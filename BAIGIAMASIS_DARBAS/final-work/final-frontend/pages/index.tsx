import PageTemplate from "@/components/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import { validateJwtToken } from "@/api/user";
import { userNameKey } from "@/constants/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import QuestionList from "@/components/QuestionList/QuestionList";
import { getQuestions, deleteQuestion } from "@/api/question";

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

const Index = () => {
    const router = useRouter();

    const [userName, setUserName] = useState(
        () => cookie.get(userNameKey) || "",
    );

    const [isMounted, setIsMounted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);

    const validateJwt = async () => {
        try {
            const response = await validateJwtToken();
            router.push("/");
            return;
            console.log("VALIDATION");
            console.log(response);

            if (response.status === 201) {
                router.push("/");
                return;
            }
        } catch (err) {
            console.log(err);
        }
        userLogout();
    };

    const onNavAsk = async () => {
        router.push("/ask");
    };

    const onFormNewUser = async () => {};

    const userLogout = async () => {
        cookie.remove(userNameKey);
        setUserName("");
        router.push("/login");
    };

    const loadQuestions = async () => {
        const data = await getQuestions();
        setQuestions(data?.data);
    };

    const onClickQuestion = async () => {};

    const onClickRemoveQuestion = async (id: string) => {
        await deleteQuestion(id);
        loadQuestions();
    };

    useEffect(() => {
        validateJwt();
        setIsMounted(true);

        loadQuestions();
    }, []);

    return (
        <PageTemplate
            userName={userName}
            isMounted={isMounted}
            onNavNewUser={onFormNewUser}
            onNavAsk={onNavAsk}
            onNavLogout={userLogout}
        >
            <QuestionList
                question={questions}
                onClickQuestion={onClickQuestion}
                onClickRemoveQuestion={onClickRemoveQuestion}
            />
        </PageTemplate>
    );
};

export default Index;
