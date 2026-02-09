import Input from "@/Components/Input/Input";
import { useState } from "react";

const Main = () => {
    const [text, setText] = useState("");

    console.log(text);

    return (
        <>
            <Input />
        </>
    );
};

export default Main;
