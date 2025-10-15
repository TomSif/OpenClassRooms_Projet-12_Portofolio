import React from "react";
import { FaMapMarkerAlt, FaLinkedin, FaFileDownload } from "react-icons/fa";

const PersonalDetails = () => {
  return (
    <div className="personal-details">
      <h3 className="personal-details__title">Informations complémentaires</h3>

      <div className="personal-details__grid">
        {/* Localisation */}
        <div className="detail">
          <div className="detail__icon detail__icon--location">
            <FaMapMarkerAlt />
          </div>
          <div className="detail__content">
            <p className="detail__label">Localisation</p>
            <p className="detail__value">Traenheim, Bas-Rhin</p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="detail">
          <div className="detail__icon detail__icon--linkedin">
            <FaLinkedin />
          </div>
          <div className="detail__content">
            <p className="detail__label">Profil LinkedIn</p>
            <a
              href="https://linkedin.com/in/thomas-sifferle"
              target="_blank"
              rel="noopener noreferrer"
              className="detail__link"
            >
              Voir mon profil
            </a>
          </div>
        </div>

        {/* CV */}
        <div className="detail">
          <div className="detail__icon detail__icon--cv">
            <FaFileDownload />
          </div>
          <div className="detail__content">
            <p className="detail__label">Curriculum Vitae</p>
            <a href="/CV_TonNom.pdf" download className="detail__link">
              Télécharger mon CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
