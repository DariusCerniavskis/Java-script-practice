import MainMenu from "@/components/MainMenu/MainMenu";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import cookie from "js-cookie";
import { validateJwtToken } from "@/api/user";
import { userNameKey } from "@/constants/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Index = () => {
    const router = useRouter();

    const [userName, setUserName] = useState(
        () => cookie.get(userNameKey) || "",
    );

    const [isMounted, setIsMounted] = useState(false);

    const validateJwt = async () => {
        try {
            const response = await validateJwtToken();

            if (response.status === 200) {
                console.log("validate Response   good    username");
                console.log(userName);

                router.push("/");
                return;
            }
        } catch (err) {
            console.log("validate Response   bad");
            console.log(err);
        }
        userLogout();
    };

    const onFormLogin = async () => {};

    const onFormNewUser = async () => {};

    const userLogout = async () => {
        cookie.remove(userNameKey);
        setUserName("");
        router.push("/login");
    };

    useEffect(() => {
        setIsMounted(true);
        validateJwt();
    }, []);

    console.log("main user name");
    console.log(userName);

    return (
        <PageTemplate
            userName={userName}
            isMounted={isMounted}
            onNavNewUser={onFormNewUser}
            onNavLogin={onFormLogin}
            onNavLogout={userLogout}
        >
            <MainMenu />
        </PageTemplate>
    );
};

export default Index;
