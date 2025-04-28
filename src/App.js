import React, { useState } from 'react';
import './App.css';
import VisionForm from './VisionForm'; // <-- IMPORT OK ✅

function App() {
  const [url, setUrl] = useState("");
  const [cms, setCms] = useState("auto");
  const [goal, setGoal] = useState("vente");
  const [tone, setTone] = useState("professionnel");
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
        body: JSON.stringify({ url, cms, goal, tone }),
      });

      const data = await response.json();
      console.log("Réponse de l'API :", data);

      if (data.error) {
        setError(data.error);
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

  const handleCopy = () => {
    if (suggestion) {
      navigator.clipboard.writeText(suggestion)
        .then(() => alert("Contenu copié dans le presse-papiers"))
        .catch(() => alert("Erreur lors de la copie"));
    }
  };

  const handleEmail = () => {
    if (suggestion) {
      const subject = encodeURIComponent("Suggestion IA pour votre site");
      const body = encodeURIComponent(suggestion);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  const handleApplyCMS = () => {
    alert("Fonctionnalité bientôt disponible 😉");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      
      {/* FORMULAIRE DE CONFIGURATION CLIENT */}
      <VisionForm />

      {/* ANALYSEUR AUTO WEBAI */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img
            src="/logo-autowebai.png"
            alt="Logo AutoWebAI"
            className="h-28"
          />
        </div>

        <p className="text-center text-gray-700 mb-6">
          Entrez l'URL de votre site pour générer une version optimisée par IA :
        </p>

        <div className="grid gap-4 mb-4">
          {/* CMS */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Quel est votre CMS ?</label>
            <select
              value={cms}
              onChange={(e) => setCms(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="auto">Détection automatique</option>
              <option value="wordpress">WordPress</option>
              <option value="shopify">Shopify</option>
              <option value="wix">Wix</option>
              <option value="webflow">Webflow</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          {/* OBJECTIF */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Objectif du site :</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="vente">Vendre un produit</option>
              <option value="lead">Obtenir des contacts</option>
              <option value="blog">Partager des infos</option>
              <option value="portfolio">Montrer un projet / CV</option>
            </select>
          </div>

          {/* TON */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">Ton du texte :</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300"
            >
              <option value="professionnel">Professionnel</option>
              <option value="convivial">Convivial</option>
              <option value="persuasif">Persuasif</option>
              <option value="créatif">Créatif</option>
            </select>
          </div>

          {/* INPUT URL */}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemple.com"
            className="w-full p-3 rounded-lg border border-gray-300"
          />

          {/* BOUTON ANALYSER */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <span>Analyse en cours...</span>
              </div>
            ) : (
              "Analyser le site"
            )}
          </button>
        </div>

        {/* ERREUR */}
        {error && (
          <div className="text-red-600 text-sm mt-4">
            <strong>Erreur :</strong> {error}
          </div>
        )}

        {/* RESULTATS */}
        {original && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Contenu extrait :</h2>
            <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap">
              {original}
            </div>
          </div>
        )}

        {suggestion && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Suggestion IA :</h2>
            <div className="bg-green-50 border rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap mb-4">
              {suggestion}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleCopy}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                ✅ Copier
              </button>
              <button
                onClick={handleEmail}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                📧 Envoyer par email
              </button>
              <button
                onClick={handleApplyCMS}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                🔧 Appliquer au CMS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
