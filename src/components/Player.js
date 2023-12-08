import React from 'react';
import ReactPlayer from 'react-player';

const Player = () => {
   return (
     <div className="player-container">
       <ReactPlayer
         url="https://live.radiovague.com:8443/blurfm04"
         playing={true}
         controls={true}
         width="100%"
         height="50px"
       />
     </div>
   );
 };
 
 export default Player;