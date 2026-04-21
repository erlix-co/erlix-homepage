import { useEffect, useState } from "react";
import { CONTACT_EMAIL, homeContent, type Language } from "./content";

const emailHref = `mailto:${CONTACT_EMAIL}`;

export function HomePage() {
  const [language, setLanguage] = useState<Language>(
    navigator.language.toLowerCase().startsWith("he") ? "he" : "en"
  );
  const t = homeContent[language];

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home" dir={language === "he" ? "rtl" : "ltr"} lang={language}>
      <header className="home-nav">
        <a className="home-brand" href="#top" aria-label="Erlix home">
          <img src="/erlix-logo.png" alt="Erlix logo" />
        </a>

        <nav className="home-links" aria-label="Main navigation">
          <a href="#projects">{t.navProjects}</a>
          <a href="#about">{t.navAbout}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>

        <div className="home-lang" role="group" aria-label="Language switch">
          <button
            type="button"
            className={language === "he" ? "active" : ""}
            onClick={() => setLanguage("he")}
          >
            עב
          </button>
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </header>

      <main id="top" className="home-main">
        <section className="hero" data-reveal>
          <p className="hero-eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-sub">{t.heroSubtitle}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="http://localhost:5173">
              {t.heroPrimary}
            </a>
            <a className="btn btn-ghost" href={emailHref}>
              {t.heroSecondary}
            </a>
          </div>
        </section>

        <section id="about" className="about section-card" data-reveal>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </section>

        <section id="projects" className="projects" data-reveal>
          <div className="projects-head">
            <h2>{t.projectsTitle}</h2>
            <p>{t.projectsSubtitle}</p>
          </div>

          <div className="project-grid">
            <article className="project-card project-card-live">
              {t.projectLiveTag ? <span className="project-tag">{t.projectLiveTag}</span> : null}
              <h3>{t.projectLiveTitle}</h3>
              <p>{t.projectLiveText}</p>
              <a href="http://localhost:5173">{t.projectLiveCta}</a>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.projectSoonTag}</span>
              <h3>{t.projectSoonTitle}</h3>
              <p>{t.projectSoonText}</p>
            </article>
          </div>
        </section>

        <section id="contact" className="contact section-card" data-reveal>
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <a className="btn btn-primary" href={emailHref}>
            {t.ctaButton}
          </a>
        </section>
      </main>

      <footer className="home-footer">{t.footer}</footer>
    </div>
  );
}
