// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Legal from './components/Legal';
import Player from './components/Player';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>

      {/* Reproductor fijo en el footer */}
      <Player />
    </Router>
  );
}

export default App;