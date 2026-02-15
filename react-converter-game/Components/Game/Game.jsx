import Task from "./Task/Task.jsx";
import Play from "./Play/Play.jsx";
import { v4 as uniqueID } from "uuid";
import styles from "./styles.module.css";

import { useState } from "react";

const Game = () => {
    const [showTask, setShowTask] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const [player, setPlayer] = useState({
        name: "Player",
        missionAcc: 0,
        money: 0,
        lives: 3,
        canOpenHalfDigit: false,
        canRestoreLive: false,
        canFlyNext: false,
    });

    const [shopGoods, setShopGoods] = useState([
        {
            name: "Show half digits",
            isBought: false,
            price: 100,
            isSuperPower: false,
        },
        {
            name: "Restore live",
            isBought: false,
            price: 150,
            isSuperPower: false,
        },
        {
            name: "Fly to next level",
            isBoughtFlyNext: false,
            priceFlyNext: 250,
            isSuperPower: true,
        },
    ]);

    const [mission, seMishon] = useState([
        {
            id: uniqueID(),
            number: 1,
            countingSystem: 2,
            min: 5,
            max: 10,
            value: 5,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 2,
            countingSystem: 16,
            min: 10,
            max: 32,
            value: 10,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 3,
            countingSystem: 2,
            min: 10,
            max: 20,
            value: 15,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 4,
            countingSystem: 16,
            min: 32,
            max: 64,
            value: 20,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 5,
            countingSystem: 2,
            min: 20,
            max: 50,
            value: 30,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 6,
            countingSystem: 16,
            min: 64,
            max: 128,
            value: 40,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 7,
            countingSystem: 2,
            min: 50,
            max: 100,
            value: 60,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 8,
            countingSystem: 16,
            min: 128,
            max: 256,
            value: 80,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 9,
            countingSystem: 2,
            min: 100,
            max: 200,
            value: 100,
            isComplyted: false,
        },
        {
            id: uniqueID(),
            number: 10,
            countingSystem: 16,
            min: 256,
            max: 512,
            value: 150,
            isComplyted: false,
        },
    ]);

    const onTask = () => {
        setShowTask(true);
    };

    const onStartGame = () => {
        setGameStarted(true);
    };

    const renderContent = () => {
        if (gameStarted) {
            //  setShowTask(false)
            return <Play player={player} mission={mission} />;
        }

        return (
            <>
                <div
                    className={
                        showTask
                            ? styles["task-wrapper"]
                            : styles["button-wrapper"]
                    }
                >
                    {showTask ? (
                        <Task />
                    ) : (
                        <button onClick={onTask}>How to play</button>
                    )}

                    <button
                        className={styles["btn-start"]}
                        onClick={onStartGame}
                    >
                        Start Game
                    </button>
                </div>
            </>
        );
    };

    return (
        <div className={styles["nav-wrapper"]}>
            <h1>Converter game</h1>
            {renderContent()}
        </div>
    );
};

export default Game;
