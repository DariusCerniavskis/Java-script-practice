// import Styles from "./styles.mode.css"
import Player from "./Player/Player.jsx";
import Mission from  "./Mission/Mission.jsx";
import { useEffect } from "react";

const Play = ({ player, mission }) => {

    
    const activeMissions=mission.filter((m)=>{
        return !m.isComplyted
    }).slice(0,5)
   
    
    return (
        <>
            <div>
                <div>
                <Player player={player}/>
                </div>
                
         
                <div>

                {activeMissions.map((a) => (
          <Mission key={a.id} mission={a} />
        ))}
    
                </div>
 
     
 


            </div>
        </>
    );
};

export default Play;


// const [mission, seMishon]=useState([
//     {
//     number:1,
//     countingSystem:2,
//     min:5,
//     max:10,
//     value:5,
//     isComplyted:false
// },



//    useEffect(()=>{
//     setShowTask(false)
//    },[setShowTask])     

 