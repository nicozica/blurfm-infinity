import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import "../styles/components/_player.scss";

// Función para formatear el nombre del artista
function formatArtist(artist) {
  artist = artist.toLowerCase().trim();
  if (artist.includes("&")) {
      artist = artist.split(' &')[0];
  } else if (artist.includes("feat")) {
      artist = artist.split(' feat')[0];
  } else if (artist.includes("ft.")) {
      artist = artist.split(' ft.')[0];
  }
  return artist;
}

// Función para formatear el título de la canción
function formatTitle(title) {
  title = title.toLowerCase().trim();
  if (title.includes("&")) {
      title = title.replace('&', 'and');
  } else if (title.includes("(")) {
      title = title.split(' (')[0];
  } else if (title.includes("ft")) {
      title = title.split(' ft')[0];
  }
  return title;
}


const Player = () => {
  const [songInfo, setSongInfo] = useState({ artist: '', title: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.blurfm.com/icecast-proxy.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Imprimir los datos en la consola para inspeccionar su estructura
  
        // Verificar si la propiedad 'source' está definida en el objeto 'icestats'
        if (data.icestats && data.icestats.source) {
          // Obtener el título completo
          const rawTitle = data.icestats.source.title;
          
          // Dividir el título en artista y título de la canción
          const [artist, title] = rawTitle.split(' - ');

          // Actualizar el estado con el artista y el título de la canción
          setSongInfo({ artist, title });
        } else {
          console.error('Error: Source data not found in response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 10000); // Realizar la solicitud cada 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Ejecutar solo una vez al montar el componente



  return (
    <div className="player-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <ReactPlayer
              url="https://live.radiovague.com:8443/blurfm04"
              playing={false}
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
