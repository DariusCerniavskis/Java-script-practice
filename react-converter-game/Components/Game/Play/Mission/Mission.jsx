import { useEffect, useState } from "react";
// import Styles from "./styles.mode.css"

const Mission = ({mission}) => {

    
    
    const [number, setNumber]=useState()
    const [answer, setAnswer]=useState("")
    const [info, setInfo]=useState()

    const getRandomValue = (min, max) => {
        const valueRange = Math.abs(min) + Math.abs(max);
        const rndValue = min + Number(Math.floor(Math.random() * valueRange));
        return rndValue;
    };

    useEffect(()=>{
        setNumber(getRandomValue(mission.min,mission.max))
    },[mission.min,mission.max])
 

    
    return (
        <>
            <div>
                <div>
                    <h3>Mission number: </h3>
                    <h3>{mission.number}</h3>
                </div>
                <div>
                    <h3>Counting system: </h3>
                    <h3>{mission.countingSystem}</h3>
                </div>
                <div>
                    <h3>Decimal number: </h3>
                    <h3>{number}</h3>
                </div>
                <div>
                    <h3>Answer: </h3>
                    
                    <input
  type="text"
  placeholder="answer"
  value={answer ?? ""}     // fallback to empty string
  onChange={(e) => setAnswer(e.target.value)}
/>
                    <div>
                    <h3>Can earnt$: </h3>
                    <h3>{mission.value}</h3>

                </div> 
                <div>
                    <h3>Info: </h3>
                    <h3>{info}</h3>

                </div> 
                </div>
 
 
 
 
 
            </div>
        </>
    );
};

export default Mission;