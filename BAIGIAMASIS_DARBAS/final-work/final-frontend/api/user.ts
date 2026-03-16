import axios from "axios";
import { API_BASE_URL, userTokenKey, userNameKey } from "@/constants/api";
import cookie from "js-cookie";

export const validateJwtToken = async () => {
    const token = cookie.get(userTokenKey);
    try {
        const response =
            (await axios.get(`${API_BASE_URL}/jwt/validate`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })) || {};

        return { status: response.status, data: response.data };
    } catch (err) {
        return { status: err, data: null };
    }
};

// --------------------------------------------------------------------------------------
// Login, Logout, Registration

export const userLogin = async (nameOrEmail: string, password: string) => {
    const data = {
        nameOrEmail: nameOrEmail,
        password: password,
    };

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            ...data,
        });

        if (response.status === 200) {
            cookie.set(userTokenKey, response.data.jwtToken);
            cookie.set(userNameKey, response.data.user.name);

            console.log("Loginininmas response 200");
            console.log(response);

            return response.data.user.name;
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

type RegistrationDataProps = {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    avatarUrl: string;
};

export const registration = async (data: RegistrationDataProps) => {
    const response = await axios.post(`${API_BASE_URL}/registration`, {
        ...data,
    });

    return response;
};
