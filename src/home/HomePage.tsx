import { useEffect, useState } from "react";
import { CONTACT_EMAIL, homeContent, type Language } from "./content";

const emailHref = `mailto:${CONTACT_EMAIL}`;

export function HomePage() {
  const [language, setLanguage] = useState<Language>(
    navigator.language.toLowerCase().startsWith("he") ? "he" : "en"
  );
  const t = homeContent[language];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

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
      <header className="home-header">
        <div className="home-nav">
          <div className="home-brand-panel">
            <div className="home-brand" role="img" aria-label="Erlix">
              <img src="/erlix-logo.png" alt="" />
            </div>
          </div>

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
              <a
                className="project-card__cta project-card__cta-with-logo project-card__cta-linkcheck"
                href="https://erlix.net/linkcheck/"
              >
                <img
                  className="project-card__logo-large project-card__logo-large-linkcheck"
                  src="/project-logos/linkcheck-logo.png"
                  alt="LinkCheck logo"
                />
                <span>{t.projectLiveCta}</span>
              </a>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.projectSoonTag}</span>
              <h3>{t.projectSoonTitle}</h3>
              <p>{t.projectSoonText}</p>
              <a
                className="project-card__cta project-card__cta-with-logo project-card__cta-bcc"
                href="https://erlix.net/bcc-alert/"
              >
                <img className="project-card__logo-large" src="/project-logos/bcc-alert-logo.png" alt="BCC Alert logo" />
                <span>{t.projectSoonCta}</span>
              </a>
            </article>

            <article className="project-card">
              <span className="project-tag project-tag-muted">{t.project03Tag}</span>
              <h3>{t.project03Title}</h3>
              <p>{t.project03Text}</p>
              <a
                className="project-card__cta project-card__cta-with-logo project-card__cta-sms"
                href="https://erlix.net/sms-sender/"
              >
                <img className="project-card__logo-large" src="/project-logos/sms-sender-logo.png" alt="SMS Sender logo" />
                <span>{t.project03Cta}</span>
              </a>
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
