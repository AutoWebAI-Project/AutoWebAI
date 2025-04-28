import React, { useState } from 'react';

function VisionForm() {
  const [vision, setVision] = useState({
    objectif: '',
    ton: '',
    style: '',
    cibles: '',
    inspirations: '',
    valeurs: '',
    a_eviter: '',
    langues_voulues: '',
    autres_precisions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVision(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('visionClient', JSON.stringify(vision));
    alert('Votre vision a été enregistrée avec succès 🚀');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Définir votre Vision 🚀</h2>

      {Object.keys(vision).map((key) => (
        <div key={key} className="mb-4">
          <label className="block font-medium text-gray-700 capitalize">{key.replace('_', ' ')} :</label>
          <input
            type="text"
            name={key}
            value={vision[key]}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg mt-1"
            placeholder={`Entrez votre ${key.replace('_', ' ')}`}
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-4"
      >
        Sauvegarder ma Vision
      </button>
    </div>
  );
}

export default VisionForm;
