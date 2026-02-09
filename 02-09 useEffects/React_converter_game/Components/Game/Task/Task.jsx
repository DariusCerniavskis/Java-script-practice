const Task = () => {
    const onStartGame = () => {
        setIsGameStart(true);
    };

    return (
        <>
            <div>
                <h2>Užduotis:</h2>
                <p>
                    Pateiktą 10-tainės skaičiavimo sistemos (toliua: SKS)
                    skaičių pavaersti kitos skačiavimo sistemos skačiumi.
                    Žaidėjas turi galimybę 3 kartus suklysti. Tesingai atlikus
                    užduotis,gaunami pinigėliai.
                </p>

                <h3>Pinigėlius galima panaudoti:</h3>
                <ol>
                    <li>atstatyti prarastą gyvybę (100 pin)</li>
                    <li>
                        atskleisti 4 pirmus skaitmenis 2-tainėje SKS (100 pin)
                    </li>
                    <li>atskleisti pirmą skaitmenį 16-tainėje SKS (100 pin)</li>
                    <li>šuolis į kitą užfuotį (200 pin)</li>
                </ol>

                <button onClick={onStartGame}>Start Game</button>
            </div>
        </>
    );
};

export default Task;
