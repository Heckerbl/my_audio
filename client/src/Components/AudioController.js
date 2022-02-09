import React , {useState} from "react";
import "../Styles/AudioContainer.css";
import img from "../images/temp/Ghosts.jpg";

const AudioContainer = () =>{
const [Play , setPlay] =  useState(false);


    return  <div className="Audio">
                <div className="song">  
                    <div className="img">
                        <img src = {img} alt="no image found" />
                    </div>
                    <div className="details">
 <div className="title"> Perfect | By ed sheeran and saroj collab  😘</div>
                    <div className="author"> Saroj Regmi </div>
                    </div>
                   
                </div>
                <div className="customizable">
                <div className="play_head"> <input type="range"/> </div>
            <div className="controlls">
                <div className="backward"></div>
                <div className={Play ? "pause" : "play"} onClick={()=>{setPlay(!Play)}}></div>
                <div className="forward"></div>
            </div>
                </div>
                
        </div>
     
}

export default AudioContainer;
