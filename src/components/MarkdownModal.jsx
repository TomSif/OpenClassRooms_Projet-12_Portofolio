import { useState, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function MarkdownModal({ url, title, onClose }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Fichier introuvable");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <div
      className="md-modal__overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="md-modal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="md-modal__header">
          <h2 className="md-modal__title">{title}</h2>
          <button
            className="md-modal__close"
            onClick={onClose}
            aria-label="Fermer"
          >
            ✕
          </button>
        </header>

        <div className="md-modal__body">
          {loading && (
            <p className="md-modal__state">Chargement…</p>
          )}
          {error && (
            <p className="md-modal__state md-modal__state--error">{error}</p>
          )}
          {!loading && !error && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkdownModal;
