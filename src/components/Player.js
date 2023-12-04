import React from 'react';
import ReactPlayer from 'react-player';

const Player = () => {
   return (
     <div className="player-container">
       <ReactPlayer
         url="http://radio.dyne.org:8000/blurfm02"
         playing={true}
         controls={true}
         width="100%"
         height="50px"
       />
     </div>
   );
 };
 
 export default Player;