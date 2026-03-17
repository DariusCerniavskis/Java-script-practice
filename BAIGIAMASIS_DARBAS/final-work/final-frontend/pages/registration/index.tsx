import { useState } from "react";
import Cookies from "js-cookie";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm";
import { userTokenKey } from "@/constants/api";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { registration } from "@/api/user";

const Index = () => {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [infoMessage, setInfoMessage] = useState("");

    // const [boardgames, setBoardgames] = useState(null);

    const onFormNewUser = async () => {
        const data = {
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            avatarUrl: avatarUrl,
        };
        let response;

        try {
            response = await registration(data);

            console.log("new usaer Response check:");
            console.log(response);

            if (response.status === 201) {
                console.log("new usaer Response good:");
                console.log(response);

                Cookies.set(userTokenKey, response.data.jwt);
                router.push("/");
                setInfoMessage("");
            } else {
                setInfoMessage(response.data.message);
            }

            console.log("new usaer response", response);
            return;
        } catch (err) {
            console.log("user Response error:");
            console.log(response?.data.message);
            console.log(err);
        }

        return;
    };

    const onFormLogin = async () => {
        router.push("/login");
        return;
    };

    const onNavLogout = async () => {};
    const onNavAsk = async () => {};

    return (
        <PageTemplate
            userName={userName}
            isMounted={true}
            onNavNewUser={onFormNewUser}
            onNavAsk={onNavAsk}
            onNavLogout={onNavLogout}
        >
            <RegistrationForm
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
                infoMessage={infoMessage}
                onFormRegistration={onFormNewUser}
                onFormLogin={onFormLogin}
            />
        </PageTemplate>
    );
};

export default Index;
