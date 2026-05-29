import { useState } from "react";
import { FaBookOpen, FaChartLine, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";
import MarkdownModal from "./MarkdownModal";

const PILLARS = [
  {
    id: "devlog",
    badge: "DEVLOG",
    icon: <FaBookOpen />,
    title: "Dev Journal",
    description:
      "Chaque projet est documenté session par session — auto-évaluation initiale, notions acquises, notions faussement acquises et points fragiles. Une trace honnête de comment le code se construit vraiment.",
    cta: "Voir un exemple",
    url: "/devlogs/memory-game/progression.md",
    ctaLabel: "Dev Journal — Memory Game",
  },
  {
    id: "audit",
    badge: "AUDIT",
    icon: <FaChartLine />,
    title: "Code Audit",
    score: "3.9 / 5",
    description:
      "En fin de projet, audit structuré sur 12 axes — Structure, TypeScript, Accessibilité, Performance… Chaque axe est noté et tracké sur l'ensemble des projets. Les failles connues deviennent les priorités suivantes.",
    cta: "Voir le rapport",
    url: "/devlogs/memory-game/rapport.md",
    ctaLabel: "Rapport complet — Memory Game (7 reviews)",
  },
  {
    id: "socratic",
    badge: "AGENTS.md",
    icon: <FaComments />,
    title: "IA Socratique",
    description:
      "Apprentissage guidé via des fichiers AGENTS.md sur mesure — l'IA pose des questions plutôt que de donner des réponses, force la compréhension profonde. Chaque notion est soit maîtrisée, soit explicitement marquée comme fragile.",
    cta: null,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Methodology() {
  const [modal, setModal] = useState(null);

  return (
    <section className="methodology" id="methodology">
      <div className="methodology__container">
        <motion.header
          className="methodology__header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="methodology__title">Démarche</h2>
          <p className="methodology__subtitle">
            Apprendre en solo ne signifie pas apprendre sans rigueur. Chaque
            projet suit un cycle documenté — journal de session, audit de code
            structuré, feedback continu via IA guidée.
          </p>
        </motion.header>

        <motion.div
          className="methodology__pillars"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.id}
              className="methodology__pillar"
              variants={cardVariants}
            >
              <div className="methodology__pillar-top">
                <span className="methodology__badge">{pillar.badge}</span>
                <div className="methodology__icon">{pillar.icon}</div>
              </div>

              <h3 className="methodology__pillar-title">
                {pillar.title}
                {pillar.score && (
                  <span className="methodology__score">{pillar.score}</span>
                )}
              </h3>

              <p className="methodology__pillar-desc">{pillar.description}</p>

              {pillar.cta && (
                <button
                  className="methodology__cta"
                  onClick={() =>
                    setModal({ url: pillar.url, title: pillar.ctaLabel })
                  }
                >
                  {pillar.cta} →
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {modal && (
        <MarkdownModal
          url={modal.url}
          title={modal.title}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}

export default Methodology;
