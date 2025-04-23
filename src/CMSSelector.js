import React, { useState } from 'react';

function CMSSelector() {
  const [cms, setCMS] = useState('');
  const [siteURL, setSiteURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('https://autowebai-api.onrender.com/connect-site', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cms, siteURL }),
    });

    alert("Merci ! Nous allons vous guider pour connecter votre site.");
  };

  return (
    <div className="cms-selector">
      <h2>Connecte ton site à AutoWebAI</h2>
      <form onSubmit={handleSubmit}>
        <label>Type de site :</label>
        <select value={cms} onChange={(e) => setCMS(e.target.value)} required>
          <option value="">-- Sélectionner --</option>
          <option value="wordpress">WordPress</option>
          <option value="shopify">Shopify</option>
          <option value="wix">Wix</option>
          <option value="webflow">Webflow</option>
          <option value="autre">Autre / HTML</option>
        </select>

        <label>URL de ton site :</label>
        <input
          type="url"
          value={siteURL}
          onChange={(e) => setSiteURL(e.target.value)}
          placeholder="https://monsite.com"
          required
        />

        <button type="submit">Continuer</button>
      </form>
    </div>
  );
}

export default CMSSelector;
