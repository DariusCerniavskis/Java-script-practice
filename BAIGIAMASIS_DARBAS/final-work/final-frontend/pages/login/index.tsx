import { useState } from "react";
import LoginForm from "@/components/LoginForm/LoginForm";
import { userNameKey } from "@/constants/api";

import cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import { userLogin } from "@/api/user";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();

    const [nameOrEmail, setNameOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const [infoMessage, setInfoMessage] = useState("");

    const [userName, setUserName] = useState(
        () => cookie.get(userNameKey) || "",
    );

    const onFormLogin = async () => {
        const loginedUser = await userLogin(nameOrEmail, password);

        if (loginedUser) {
            router.push("/");
            setInfoMessage("");
            setUserName(loginedUser);
        } else {
            setInfoMessage("Bad username, email or password");
        }

        return;
    };

    const onFormNewUser = async () => {
        router.push("/registration");
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
            <LoginForm
                nameOrEmail={nameOrEmail}
                setNameOrEmail={setNameOrEmail}
                password={password}
                setPassword={setPassword}
                infoMessage={infoMessage}
                onFormLogin={onFormLogin}
                onFormNewUser={onFormNewUser}
            />
        </PageTemplate>
    );
};

export default Index;
