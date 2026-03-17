import axios from "axios";
import {
    API_BASE_URL,
    USER_URL,
    userTokenKey,
    userNameKey,
} from "@/constants/api";
import cookie from "js-cookie";

export const validateJwtToken = async () => {
    const token = cookie.get(userTokenKey);
    const userUrl = API_BASE_URL + USER_URL;

    console.log("VAalidate");
    console.log(userUrl);
    try {
        const response =
            (await axios.get(`${userUrl}/jwt/validate`, {
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
    const userUrl = API_BASE_URL + USER_URL;
    const data = {
        nameOrEmail: nameOrEmail,
        password: password,
    };

    try {
        const response = await axios.post(`${userUrl}/login`, {
            ...data,
        });

        if (response.status === 200) {
            cookie.set(userTokenKey, response.data.jwtToken);
            cookie.set(userNameKey, response.data.user.name);

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
    const userUrl = API_BASE_URL + USER_URL;
    const response = await axios.post(`${userUrl}/registration`, {
        ...data,
    });

    return response;
};
