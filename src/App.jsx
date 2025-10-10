// ===================================
// 🛣️ APP.JSX - ROUTER HYBRIDE
// ===================================
// Fichier : src/App.jsx

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import "../src/styles/main.scss";

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Page principale one-page */}
        <Route path="/" element={<Home />} />

        {/* Pages détail des projets */}
        <Route path="/project/:slug" element={<ProjectPage />} />

        {/* Route 404 (optionnel) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

// Composant 404 simple
const NotFound = () => (
  <div className="not-found section">
    <div className="container">
      <h1>404 - Page non trouvée</h1>
      <a href="/" className="btn btn-primary">
        Retour à l'accueil
      </a>
    </div>
  </div>
);

export default App;
