import cookie from "js-cookie";
import axios from "axios";
import { API_BASE_URL, QUESTIONS_URL, userTokenKey } from "@/constants/api";

export const getQuestions = async () => {
    const questionUrl = API_BASE_URL + QUESTIONS_URL;
    try {
        const response = await axios.get(`${questionUrl}/questions`);

        console.log("get question");
        console.log(response);

        return response;
    } catch (err) {
        console.log(err);
    }
};

export const createQuestion = async (question_text: string) => {
    const token = cookie.get(userTokenKey);
    const questionUrl = API_BASE_URL + QUESTIONS_URL;

    console.log("Question add");
    console.log(questionUrl);
    console.log(token);
    const response = await axios.post(
        `${questionUrl}/ask`,
        { question_text },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return response.data;
};

export const deleteQuestion = async (id: string) => {
    try {
        const token = cookie.get(userTokenKey);
        const questionUrl = API_BASE_URL + QUESTIONS_URL;
        await axios.delete(`${questionUrl}/question/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        getQuestions();
    } catch (err) {
        console.error(err);
    }
};
