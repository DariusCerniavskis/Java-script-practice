import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Input = ({ myText }) => {
    const [inputText, setInputText] = useState("");
    const [isShowText, setIsShowText] = useState("");

    const isShow = () => {
        setIsShowText(inputText);
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("isShowText")) || [];
        setInputText(localData);
        console.log("First");
    }, []);

    useEffect(() => {
        localStorage.setItem("isShowText", JSON.stringify(isShowText));

        console.log("Second");
    }, [isShowText]);

    useEffect(() => {
        localStorage.setItem("isShowText", JSON.stringify(isShowText));

        console.log("Third");
    }, [inputText, isShowText]);

    return (
        <>
            <div className={styles.formWrapper}>
                <input
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }}
                    placeholder="text"
                    type="text"
                />
                <button onClick={isShow}>Add</button>
            </div>

            <div>
                <h3>{isShowText}</h3>
            </div>
        </>
    );
};

export default Input;
