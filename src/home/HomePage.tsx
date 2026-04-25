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

        <div className="home-nav__bottom">
          <nav className="home-links" aria-label="Main navigation">
            <a href="#projects">{t.navProjects}</a>
            <a href="#about">{t.navAbout}</a>
            <a href={emailHref}>{t.navContact}</a>
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
        </div>
      </header>

      <main id="top" className="home-main">
        <section className="hero" data-reveal>
          <p className="hero-eyebrow">{t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-sub">{t.heroSubtitle}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="https://erlix.net/linkcheck/">
              {t.heroPrimary}
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
              <a href="https://erlix.net/linkcheck/">{t.projectLiveCta}</a>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.projectSoonTag}</span>
              <h3>{t.projectSoonTitle}</h3>
              <p>{t.projectSoonText}</p>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.project03Tag}</span>
              <h3>{t.project03Title}</h3>
              <p>{t.project03Text}</p>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.project04Tag}</span>
              <h3>{t.project04Title}</h3>
              <p>{t.project04Text}</p>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.project05Tag}</span>
              <h3>{t.project05Title}</h3>
              <p>{t.project05Text}</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="home-footer">{t.footer}</footer>
    </div>
  );
}
