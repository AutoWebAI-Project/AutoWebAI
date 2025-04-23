import React from 'react';
import './App.css';
import CMSSelector from './CMSSelector';

function App() {
  return (
    <div className="App">
      <h1>Bienvenue sur AutoWebAI</h1>
      <p>
        Connecte ton site web à notre assistant intelligent, et laisse l’IA analyser et améliorer automatiquement ton contenu.
      </p>

      {/* Formulaire de connexion CMS */}
      <CMSSelector />
    </div>
  );
}

export default App;
