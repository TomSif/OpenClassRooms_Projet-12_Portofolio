// ===================================
// 🏠 HOME.JSX - PAGE PRINCIPALE
// ===================================
// Fichier : src/pages/Home/Home.jsx

import { useEffect } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Works from "../components/Works";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  // Restaurer la position de scroll au retour d'une page projet
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("homeScrollPosition");

    if (savedScrollPosition) {
      // Attendre que le DOM soit complètement chargé
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        sessionStorage.removeItem("homeScrollPosition");
      }, 0);
    }
  }, []);

  return (
    <main className="home">
      <Navbar />
      <section id="hero" className="section">
        <Hero />
      </section>

      <section id="about" className="section section-light">
        <About />
      </section>

      <section id="portfolio" className="section">
        <Portfolio />
      </section>

      <section id="works" className="section section-lavender">
        <Works />
      </section>

      <section id="contact" className="section">
        <Contact />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
