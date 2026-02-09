import Task from "./Task/Task.jsx";
import { useState } from "react";

const Game = () => {
    const [isTaskOn, setIsTaskOn] = useState(false);
    const [isGameStart, setIsGameStart] = useState(false);

    const onTask = () => {
        setIsTaskOn(true);
    };

    const onStartGame = () => {
        setIsGameStart(true);
    };

    return (
        <>
            <div>
                <h1>Converter game</h1>

                <button onClick={onTask}>How to paly</button>

                {isTaskOn ? (
                    <Task />
                ) : (
                    <button onClick={onStartGame}>Start Game</button>
                )}
            </div>
        </>
    );
};

export default Game;
