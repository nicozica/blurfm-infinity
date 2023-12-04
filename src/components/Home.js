import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div>

         <div>
            <h1>Bienvenido a la Radio Online de Calidad!</h1>
            <p>Disfruta de nuestra programación en vivo.</p>
            <br />
            <Link className="btn btn-primary" to="/about">Acerca de</Link>
               <br />
            <Link to="/legal">Legales</Link>
         </div>
         
      </div>

   );
}

export default Home;