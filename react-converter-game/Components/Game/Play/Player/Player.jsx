import styles from "./styles.module.css"

const Player = ({player}) => {
    return (
        <>
            <div>
                <div>
                    <h3>Player name: </h3>
                    <h3>{player.name}</h3>
                </div>
                <div>
                    <h3>Accomplished missions: </h3>
                    <h3>{player.missionAcc}</h3>
                </div>
                <div>
                    <h3>Money: </h3>
                    <h3>{player.money}</h3>
                </div>
                <div>
                    <h3>Lives: </h3>
                    <h3>{player.lives}</h3>
                </div>
                <div>
                    <h3>Powers and prices: </h3>
                    <button>Open half digits</button>
                    <button>Restore live</button>                    
                </div>
                
                <div>
                    <h3>Super power and price: </h3>
                    <button>Flight to next mission</button>
                </div>



            </div>

        </>
    );
};

export default Player;

