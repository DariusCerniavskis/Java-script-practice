import cookie from "js-cookie";
import axios from "axios";
import { API_BASE_URL, ANSWER_URL, userTokenKey } from "@/constants/api";

export const getAnswers = async (questionId: string) => {
    const answerUrl = API_BASE_URL + ANSWER_URL;
    const res = await axios.get(`${answerUrl}/answers/${questionId}`);
    return res.data;
};

export const createAnswer = async (
    answer_text: string,
    question_id: string,
) => {
    const token = cookie.get(userTokenKey);
    const answerUrl = API_BASE_URL + ANSWER_URL;
    const res = await axios.post(
        `${answerUrl}/answer`,
        { answer_text, question_id },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return res.data;
};

export const likeAnswer = async (id: string) => {
    const token = cookie.get(userTokenKey);
    const answerUrl = API_BASE_URL + ANSWER_URL;
    const res = await axios.post(
        `${answerUrl}/answer/${id}/like`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return res.data;
};

export const dislikeAnswer = async (id: string) => {
    const token = cookie.get(userTokenKey);
    const answerUrl = API_BASE_URL + ANSWER_URL;
    const res = await axios.post(
        `${answerUrl}/answer/${id}/dislike`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    return res.data;
};
