// ===================================
// 📄 PROJECTPAGE.JSX - PAGE PROJET
// ===================================
// Fichier : src/pages/ProjectPage.jsx
// Placeholder en attendant le design des pages projets

import { useParams, Link } from "react-router-dom";

const ProjectPage = () => {
  const { slug } = useParams();

  return (
    <div style={{ padding: "6rem 1.5rem", textAlign: "center" }}>
      <h1>Page du projet : {slug}</h1>
      <p>Design en cours de création...</p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          backgroundColor: "#6366f1",
          color: "white",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        ← Retour à l'accueil
      </Link>
    </div>
  );
};

export default ProjectPage;
