import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">???</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/blog">
            Lire le blog
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Site officiel`}
      description="Crazy Teacher — Présentation, fonctionnalités, captures d’écran et actualités du jeu."
    >
      <HomepageHeader />
      <main>
        {/* Features en colonne (vertical) */}
        <section
          className="margin-vert--lg"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="container">
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8">
                <div className="card">
                  <div className="card__image" style={{ padding: 16 }}>
                    <img
                      src="https://via.placeholder.com/600x340?text=Gameplay"
                      alt="gameplay"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </div>
                  <div className="card__body">
                    <Heading as="h3">Gameplay</Heading>
                    <p>explication gameplay</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8 margin-top--lg">
                <div className="card">
                  <div className="card__image" style={{ padding: 16 }}>
                    <img
                      src="https://via.placeholder.com/600x340?text=Personnages"
                      alt="Personnages principal"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </div>
                  <div className="card__body">
                    <Heading as="h3">nom</Heading>
                    <p>desc du perso ou de son histoire mais du lore quoi</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8 margin-top--lg">
                <div className="card">
                  <div className="card__image" style={{ padding: 16 }}>
                    <img
                      src="https://via.placeholder.com/600x340?text=Defis"
                      alt="Défis et niveaux"
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </div>
                  <div className="card__body">
                    <Heading as="h3">Défis variés</Heading>
                    <p>Explications des niveaux, du jeu en lui même.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Captures d’écran en pile verticale */}
        <section
          className="margin-vert--lg"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="container">
            <Heading
              as="h2"
              className="margin-bottom--md "
              style={{ textAlign: "center" }}
            >
              Le jeu en images
            </Heading>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8">
                <img
                  src="https://via.placeholder.com/800x450?text=Screenshot+1"
                  alt="Capture d’écran du jeu 1"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8 margin-top--md">
                <img
                  src="https://via.placeholder.com/800x450?text=Screenshot+2"
                  alt="Capture d’écran du jeu 2"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </div>
            </div>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8 margin-top--md">
                <img
                  src="https://via.placeholder.com/800x450?text=Screenshot+3"
                  alt="Capture d’écran du jeu 3"
                  style={{ width: "100%", height: "auto", borderRadius: 8 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Récompenses */}
        <section
          className="margin-vert--lg"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <Heading as="h2" className="margin-bottom--md">
              Récompenses
            </Heading>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--8">
                <div className="card">
                  <div className="card__body">
                    <ul
                      style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}
                    >
                      <li className="margin-bottom--sm">
                        🏆 Meilleur jeu étudiant — IndieCampus Awards 2025
                      </li>
                      <li className="margin-bottom--sm">
                        🥇 Prix de l’Innovation — GameDev Festival Lyon 2025
                      </li>
                      <li className="margin-bottom--sm">
                        ⭐ Coup de cœur du jury — Pixel Expo Paris 2025
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plateformes (fictives) */}
        <section
          className="margin-vert--lg"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <Heading as="h2" className="margin-bottom--md">
              Disponible sur
            </Heading>
            <div className="row" style={{ justifyContent: "center" }}>
              <div className="col col--10">
                <div className="row" style={{ alignItems: "center" }}>
                  <div className="col col--3 margin-bottom--md">
                    <a href="#" title="Steam (faux)">
                      <img
                        src="img/steam.png"
                        alt="Steam logo (placeholder)"
                        style={{ maxWidth: "100%", height: "150px" }}
                      />
                    </a>
                  </div>
                  <div className="col col--3 margin-bottom--md">
                    <a href="#" title="Epic Games (faux)">
                      <img
                        src="/img/epic-game.svg"
                        alt="Epic Games logo (placeholder)"
                        style={{ maxWidth: "100%", height: "150px" }}
                      />
                    </a>
                  </div>
                  <div className="col col--3 margin-bottom--md">
                    <a href="#" title="Xbox (faux)">
                      <img
                        src="/img/xbox.png"
                        alt="Xbox logo (placeholder)"
                        style={{ maxWidth: "100%", height: "150px" }}
                      />
                    </a>
                  </div>
                  <div className="col col--3 margin-bottom--md">
                    <a href="#" title="PlayStation (faux)">
                      <img
                        src="/img/playstation.png"
                        alt="PlayStation logo (placeholder)"
                        style={{ maxWidth: "100%", height: "150px" }}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restez informé + CTA blog */}
        <section
          className="margin-vert--lg"
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <div className="container" style={{ textAlign: "center" }}>
            <Heading as="h2" className="margin-bottom--md">
              Restez informé
            </Heading>
            <p style={{ marginBottom: 0 }}>
              Consultez nos actualités, développeurs logs et annonces
              importantes sur le blog.
            </p>
          </div>

          <div
            className="container margin-top--md"
            style={{ textAlign: "center" }}
          >
            <Link className="button button--primary" to="/blog">
              Accéder au blog
            </Link>
            <Link
              className="button button--secondary margin-horiz--sm margin-vert--sm"
              to="#"
            >
              Twitter (X)
            </Link>
            <Link
              className="button button--secondary margin-horiz--sm margin-vert--sm"
              to="#"
            >
              Instagram
            </Link>
            <Link
              className="button button--secondary margin-horiz--sm margin-vert--sm"
              to="#"
            >
              TikTok
            </Link>
            <Link
              className="button button--secondary margin-horiz--sm margin-vert--sm"
              to="#"
            >
              YouTube
            </Link>
            <Link
              className="button button--secondary margin-horiz--sm margin-vert--sm"
              to="#"
            >
              Discord
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
