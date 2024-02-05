import React, { useState } from 'react';
import ReactPlayer from "react-player";
import "../styles/components/_player.scss";

const Player = () => {

  const [songInfo, setSongInfo] = useState({
    title: 'Nombre de la Canción',
    artist: 'Artista',
  });

  return (
    <div className="player-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ReactPlayer
              url="https://live.radiovague.com:8443/blurfm04"
              playing={true}
              controls={true}
              width="100%"
              height="50px"
            />
            <h3>{songInfo.title}</h3>
            <p>{songInfo.artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
