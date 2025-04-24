import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [original, setOriginal] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url.trim()) {
      alert("Merci d'entrer une URL valide.");
      return;
    }

    setLoading(true);
    setOriginal("");
    setSuggestion("");
    setError("");

    try {
      const response = await fetch("https://autowebai-api.onrender.com/analyze-url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      console.log("Réponse de l'API :", data);

      if (data.error) {
        setError(data.error);
        console.error("Erreur renvoyée par le backend :", data.error);
      } else {
        setOriginal(data.original);
        setSuggestion(data.suggestion);
      }
    } catch (err) {
      console.error("Erreur lors de la requête vers l'API :", err);
      setError("Une erreur est survenue lors de la connexion à l'IA.");
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour copier la suggestion dans le presse-papiers
  const handleCopy = () => {
    if(suggestion) {
      navigator.clipboard.writeText(suggestion)
        .then(() => alert("Contenu copié dans le presse-papiers"))
        .catch(err => alert("Erreur lors de la copie"));
    }
  };

  // Fonction pour envoyer le contenu par email (simulation via mailto)
  const handleEmail = () => {
    if(suggestion) {
      // Encodage du sujet et du corps du mail
      const subject = encodeURIComponent("Suggestion IA pour votre site");
      const body = encodeURIComponent(`Voici la suggestion générée par l'IA:\n\n${suggestion}`);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  // Fonction simulant "Appliquer au CMS" (bientôt disponible)
  const handleApplyCMS = () => {
    alert("Fonctionnalité 'Appliquer au CMS' bientôt disponible !");
  };

  return (
    <div className="App">
      <h1>Bienvenue sur AutoWebAI</h1>
      <p>Entrez l'URL de votre site pour générer une version optimisée par IA :</p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://exemple.com"
        style={{ width: "60%", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button className="cta" onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyse en cours..." : "Analyser le site"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "20px" }}>
          <strong>Erreur :</strong> {error}
        </div>
      )}

      {original && (
        <div className="result">
          <h2>Contenu extrait :</h2>
          <p>{original}</p>
        </div>
      )}

      {suggestion && (
        <div className="result">
          <h2>Suggestion IA :</h2>
          <p>{suggestion}</p>
          <ul>
            <li>
              <button onClick={handleCopy}>
                ✅ Copier le contenu
              </button>
            </li>
            <li>
              <button onClick={handleEmail}>
                📧 Recevoir par email
              </button>
            </li>
            <li>
              <button onClick={handleApplyCMS}>
                🔧 Appliquer automatiquement (bientôt disponible)
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
