// ===================================
// 🏠 HOME.JSX - PAGE PRINCIPALE
// ===================================
// Fichier : src/pages/Home/Home.jsx

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Portfolio from "../components/Portfolio";
import Works from "../components/Works";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
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
