import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div>
         <h1>Bienvenido a la Radio Online de Calidad de primeras!</h1>
         <p>Disfruta de nuestra programación en vivo y en directo.</p>

         <Link to="/about">Acerca de</Link>
            <br />
        <Link to="/legal">Legales</Link>
      </div>
   );
}

export default Home;