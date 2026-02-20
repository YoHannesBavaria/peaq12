import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <section className="footer-block">
          <Image
            src="/assets/images/logo-light.png"
            alt="peaq GmbH"
            width={114}
            height={35}
            className="footer-logo"
          />
          <p>peaq GmbH</p>
          <p>Analytics &amp; automation</p>
          <p className="footer-muted">© 2026 peaq GmbH. All rights reserved.</p>
        </section>

        <section className="footer-block">
          <h2>Contact</h2>
          <p>Neugutstrasse 12</p>
          <p>8304 Wallisellen</p>
          <p>Switzerland</p>
          <p>
            <a href="mailto:info@peaq.ch">info@peaq.ch</a>
          </p>
        </section>

        <section className="footer-block">
          <h2>Links</h2>
          <ul>
            <li>
              <Link href="/solutions/sam4h">SAM4H</Link>
            </li>
            <li>
              <Link href="/solutions/ioportal">IOportal</Link>
            </li>
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <a href="https://service-desk.peaq.ch/help/en-us/23-support-resources" target="_blank" rel="noreferrer">
                Support
              </a>
            </li>
          </ul>
        </section>

        <section className="footer-block">
          <h2>Legal</h2>
          <ul>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz">Datenschutz</Link>
            </li>
            <li>
              <Link href="/agb">AGB</Link>
            </li>
            <li>
              <Link href="/cookie">Cookie</Link>
            </li>
          </ul>
          <p className="footer-muted">Twitter: @peaq_ch</p>
          <p className="footer-muted">LinkedIn: peaq-gmbh</p>
        </section>
      </div>
    </footer>
  );
}
