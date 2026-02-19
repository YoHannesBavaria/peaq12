export function ContactView() {
  return (
    <main className="container page-flow">
      <section className="hero-panel">
        <p className="eyebrow">Contact</p>
        <h1>peaq GmbH</h1>
        <p className="lede">
          Reach out for SAM4H and IOportal evaluations, storage optimization workshops, and proactive monitoring
          services.
        </p>
      </section>

      <section className="contact-grid">
        <article className="contact-card">
          <h2>Address</h2>
          <p>Neugutstrasse 12</p>
          <p>8304 Wallisellen</p>
          <p>Switzerland</p>
        </article>

        <article className="contact-card">
          <h2>Email</h2>
          <p>
            <a href="mailto:info@peaq.ch">info@peaq.ch</a>
          </p>
          <p>
            <a href="https://service-desk.peaq.ch/help/en-us/23-support-resources" target="_blank" rel="noreferrer">
              Support resources
            </a>
          </p>
        </article>

        <article className="contact-card">
          <h2>Social</h2>
          <p>
            <a href="https://www.linkedin.com/company/peaq-gmbh" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <a href="https://twitter.com/peaq_ch" target="_blank" rel="noreferrer">
              X / Twitter
            </a>
          </p>
        </article>
      </section>
    </main>
  );
}
