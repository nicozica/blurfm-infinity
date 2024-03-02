import React, { useState, useEffect } from 'react';
import coverDefault from "../assets/images/cover-default.png"; // Ruta a tu imagen predeterminada

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

const Rds = () => {
  const [songInfo, setSongInfo] = useState({ artist: '', title: '' });
  const [coverUrl, setCoverUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.blurfm.com/icecast-proxy.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        // Verificar si la propiedad 'source' está definida en el objeto 'icestats'
        if (data.icestats && data.icestats.source) {
          // Obtener el título completo
          const rawTitle = data.icestats.source.title;
          
          // Dividir el título en artista y título de la canción
          const [artist, title] = rawTitle.split(' - ');

          // Actualizar el estado con el artista y el título de la canción
          setSongInfo({ artist, title });
          // Llamar a la función para obtener la portada del álbum
          getCover(artist, title);
        } else {
          console.error('Error: Source data not found in response');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData(); // Llamar a fetchData una vez al montar el componente

    const intervalId = setInterval(fetchData, 10000); // Realizar la solicitud cada 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []); // Ejecutar solo una vez al montar el componente

  // Función para obtener la portada del álbum
  const getCover = async (artist, title) => {
    try {
      // Formatear el artista y el título
      artist = formatArtist(artist);
      title = formatTitle(title);

      // Codificar artist y title para la URL
      artist = encodeURIComponent(artist);
      title = encodeURIComponent(title);

      // Construir la URL de la solicitud a iTunes
      const url = `https://itunes.apple.com/search?term=${artist}-${title}&media=music&limit=1`;

      // Realizar la solicitud a iTunes
      const response = await fetch(url);
      const data = await response.json();

      // Verificar si se encontró una portada del álbum
      if (data.results.length === 1) {
        let cover = data.results[0].artworkUrl100;
        cover = cover.replace('100x100', '600x600');
        setCoverUrl(cover);
      } else {
        // Si no se encuentra una portada, puedes establecer una imagen predeterminada
        // o dejar coverUrl vacío para no mostrar ninguna imagen
        setCoverUrl(coverDefault);
      }
    } catch (error) {
      console.error('Error fetching album cover:', error);
    }
  };

  return (
    <div className="player-container">
      <div className="container" style={{ backgroundColor: 'red' }}>
        <div className="row">
          <div className="col-12">
            <h3>{songInfo.title}</h3>
            <p>{songInfo.artist}</p>
            {coverUrl && <img src={coverUrl} alt="Album Cover" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rds;