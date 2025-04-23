import CMSSelector from './CMSSelector';
import React from 'react';
import './App.css';

function App() {
  const handleClick = async () => {
    try {
      const response = await fetch('https://autowebai-api.onrender.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: "Accueil",
          content: "Bienvenue sur notre site. Nous sommes une entreprise familiale depuis 1999."
        }),
      });

      const data = await response.json();
      alert(data.suggested_update); // Affiche la réponse de l'IA
    } catch (error) {
      alert("Erreur lors de la communication avec l'IA 😕");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Bienvenue sur AutoWebAI</h1>
      <p>L’assistant intelligent pour améliorer automatiquement votre site web.</p>
      <button className="cta" onClick={handleClick}>
        Essayer gratuitement
      </button>
    </div>
  );
}

export default App;
