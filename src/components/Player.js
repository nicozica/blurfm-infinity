import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';

import playIcon from '../assets/images/play.svg'; // Ruta a tu imagen SVG de play
import pauseIcon from '../assets/images/pause.svg'; // Ruta a tu imagen SVG de pause

import Rds from './Rds';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const lastPlayTimeRef = useRef(null);

  const handlePause = () => {
    // Guardar el tiempo de pausa
    lastPlayTimeRef.current = null;
  };

  const handleEnded = () => {
    // Restablecer el tiempo de reproducción
    lastPlayTimeRef.current = null;
  };

  const handlePlay = () => {
    // Guardar el tiempo de reproducción
    lastPlayTimeRef.current = Date.now();
  };

  // Función para alternar entre reproducir y pausar
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    // Verificar si el audio ha estado pausado durante un período prolongado
    const currentTime = Date.now();
    const timeSinceLastPlay = currentTime - lastPlayTimeRef.current;
    const maxPauseTime = 60000; // 60 segundos

    if (!isPlaying && timeSinceLastPlay > maxPauseTime) {
      // Reconectar automáticamente si ha pasado demasiado tiempo desde la última reproducción
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <div className="player-container">
      <div className="container" style={{ backgroundColor: 'red' }}>
        <div className="row">
          <div className="col-12">
            <div onClick={togglePlayPause}>
              {isPlaying ? (
                <img src={pauseIcon} alt="Pause" />
              ) : (
                <img src={playIcon} alt="Play" />
              )}
            </div>
            <ReactPlayer
              ref={playerRef}
              url="https://live.radiovague.com:8443/blurfm04"
              playing={isPlaying}
              controls={false}
              width="100%"
              height="50px"
              onPause={handlePause}
              onPlay={handlePlay}
              onEnded={handleEnded}
            />
            <Rds />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
