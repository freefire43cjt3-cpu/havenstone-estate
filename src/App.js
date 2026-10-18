import React, { useEffect, useState } from "react";
import "./App.css";
// import "./upgrade.css";

const WHATSAPP_NUMBER = "2348136362066";
const WHATSAPP_DISPLAY = "+234 813 636 2066";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbgjjdqg";

const socialLinks = [
  { name: "Instagram", short: "ig", url: "https://www.instagram.com/" },
  { name: "Facebook", short: "f", url: "https://www.facebook.com/" },
  { name: "TikTok", short: "♪", url: "https://www.tiktok.com/" },
  { name: "LinkedIn", short: "in", url: "https://www.linkedin.com/" },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Sample listings: replace with your real properties before launch.
const properties = [
  {
    id: 1,
    name: "Signature Terrace",
    type: "Terrace",
    location: "GRA Phase 2, Port Harcourt",
    price: "₦85,000,000",
    beds: 4,
    baths: 4,
    size: "280 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description:
      "Contemporary architecture, elegant interiors and comfortable living spaces.",
    tag: "Featured",
  },
  {
    id: 2,
    name: "Executive Duplex",
    type: "Duplex",
    location: "Peter Odili Road, Port Harcourt",
    price: "₦150,000,000",
    beds: 5,
    baths: 5,
    size: "420 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    description:
      "A modern residence designed for privacy, comfort and entertaining.",
    tag: "Popular",
  },
  {
    id: 3,
    name: "Grand Detached Home",
    type: "Detached",
    location: "Trans Amadi, Port Harcourt",
    price: "₦220,000,000",
    beds: 6,
    baths: 6,
    size: "650 sqm",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    description: "Refined contemporary living with generous outdoor space.",
    tag: "Premium",
  },
  {
    id: 4,
    name: "The Garden Residence",
    type: "Detached",
    location: "Port Harcourt, Rivers State",
    price: "Price on request",
    beds: 4,
    baths: 4,
    size: "400 sqm",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
    description:
      "A welcoming home with natural light and timeless finishes.",
    tag: "New",
  },
  {
    id: 5,
    name: "Urban Living Terrace",
    type: "Terrace",
    location: "Port Harcourt, Rivers State",
    price: "Price on request",
    beds: 3,
    baths: 3,
    size: "220 sqm",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    description: "A stylish, practical option for modern city living.",
    tag: "Explore",
  },
  {
    id: 6,
    name: "The Modern Duplex",
    type: "Duplex",
    location: "Port Harcourt, Rivers State",
    price: "Price on request",
    beds: 4,
    baths: 5,
    size: "360 sqm",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=85",
    description:
      "Thoughtful spaces, modern design and room to make it your own.",
    tag: "Exclusive",
  },
];

/* Clean SVG arrow. Replaces the ↗️ emoji, which renders as a coloured
   emoji on phones and ignores your button colours. */
function Arrow() {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z" />
    </svg>
  );
}

function App() {
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");

  const filteredProperties =
    filter === "All"
      ? properties
      : properties.filter((property) => property.type === filter);

  // Sticky header shadow after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu with the Escape key
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function contactWhatsApp(propertyName = "") {
    const message = `Hello Havenstone Realty! I would like to enquire about ${
      propertyName || "your available properties"
    }. Please share more information.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormStatus("sending");
    setFormError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        setFormError(
          "We couldn't send your enquiry. Check your details and try again, or message us on WhatsApp."
        );
      }
    } catch (error) {
      setFormStatus("error");
      setFormError(
        "No connection. Check your internet and try again, or message us on WhatsApp."
      );
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="website">
      <div className="topbar">
        <span>Your next chapter starts here</span>
        <a href="#contact">
          Let's find your place <Arrow />
        </a>
      </div>

      <header className={scrolled ? "navbar is-stuck" : "navbar"}>
        <a className="logo" href="#home" onClick={closeMenu}>
          <span className="logo-mark">H</span>
          <span className="logo-copy">
            HAVENSTONE
            <small>REALTY</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav
          id="main-nav"
          className={menuOpen ? "nav-links open" : "nav-links"}
          aria-label="Main"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <button
            className="nav-cta nav-cta-mobile"
            type="button"
            onClick={() => {
              closeMenu();
              contactWhatsApp();
            }}
          >
            Chat on WhatsApp <Arrow />
          </button>
        </nav>

        <button
          className="nav-cta"
          type="button"
          onClick={() => contactWhatsApp()}
        >
          Let's talk <Arrow />
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" />
          <div className="hero-shade" />

          <div className="hero-content">
            <p className="eyebrow light-eyebrow">
              <span /> Property, with purpose
            </p>

            <h1>
              Find a place
              <br />
              to call <em>home.</em>
            </h1>

            <p className="hero-description">
              Discover exceptional homes in Port Harcourt and take your next
              step with confidence. Your search for the right space starts
              here.
            </p>

            <div className="hero-actions">
              <a className="button button-gold" href="#properties">
                Explore properties <Arrow />
              </a>
              <a className="button button-glass" href="#about">
                Our story
              </a>
            </div>

            <div className="hero-note">
              <span className="status-dot" />
              Your property journey, made personal.
            </div>
          </div>

          <div className="hero-bottom">
            <span>Port Harcourt, Nigeria</span>
            <a href="#properties">Scroll to explore ↓</a>
          </div>

          <div className="hero-stamp">
            <span>H</span>
            <small>
              Your place.
              <br />
              Your future.
            </small>
          </div>
        </section>

        <section className="trust-strip" aria-label="Why choose us">
          <div>
            <strong>✓</strong>
            <span>Personalised guidance</span>
          </div>
          <div>
            <strong>✓</strong>
            <span>Carefully chosen properties</span>
          </div>
          <div>
            <strong>✓</strong>
            <span>A smoother search</span>
          </div>
        </section>

        <section className="intro section" id="about">
          <div className="intro-grid">
            <div className="intro-visual">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                alt="Bright, contemporary living room"
                loading="lazy"
              />
              <div className="intro-image-caption">
                <span>The art of living well</span>
              </div>
            </div>

            <div className="intro-content">
              <p className="eyebrow">More than four walls</p>
              <h2>
                A better way to
                <br />
                find <em>your place.</em>
              </h2>
              <p>
                At Havenstone Realty, we believe finding a property is about
                more than an address. It is about the lifestyle,
                opportunities and new beginnings that come with it.
              </p>
              <p>
                We make your search informed, personal and straightforward,
                from your first enquiry to your next big decision.
              </p>
              <a className="text-link" href="#contact">
                Start a conversation <Arrow />
              </a>
            </div>
          </div>
        </section>

        <section className="properties section" id="properties">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Spaces worth discovering</p>
              <h2>
                Find your <em>next home.</em>
              </h2>
            </div>
            <p className="section-description">
              Browse a selection of homes and enquire about the details that
              matter to you.
            </p>
          </div>

          <div className="filters" role="group" aria-label="Filter properties">
            {["All", "Terrace", "Duplex", "Detached"].map((type) => (
              <button
                key={type}
                type="button"
                className={filter === type ? "filter active" : "filter"}
                onClick={() => setFilter(type)}
                aria-pressed={filter === type}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="property-grid">
            {filteredProperties.map((property) => (
              <article className="property-card" key={property.id}>
                <div className="property-image">
                  <img
                    src={property.image}
                    alt={`${property.name}, ${property.type} in ${property.location}`}
                    loading="lazy"
                  />
                  <span className="property-tag">{property.tag}</span>
                  <span className="property-type">{property.type}</span>
                </div>

                <div className="property-info">
                  <p className="property-location">{property.location}</p>
                  <h3>{property.name}</h3>
                  <p className="property-description">
                    {property.description}
                  </p>

                  <ul className="property-specs" aria-label="Property details">
                    <li>{property.beds} beds</li>
                    <li>{property.baths} baths</li>
                    <li>{property.size}</li>
                  </ul>

                  <div className="property-bottom">
                    <div>
                      <span className="price-label">Indicative price</span>
                      <strong>{property.price}</strong>
                    </div>
                    <button
                      className="property-arrow"
                      type="button"
                      aria-label={`Enquire about ${property.name} on WhatsApp`}
                      onClick={() => contactWhatsApp(property.name)}
                    >
                      <Arrow />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="statement">
          <div className="statement-image" />
          <div className="statement-overlay" />

          <div className="statement-inner">
            <p className="eyebrow light-eyebrow">The Havenstone approach</p>
            <h2>
              Every great story
              <br />
              begins <em>somewhere.</em>
            </h2>
            <p>Let your next chapter begin with a space that feels right.</p>
            <a className="button button-gold" href="#contact">
              Begin your search <Arrow />
            </a>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-grid">
            <div className="contact-copy">
              <p className="eyebrow">Your next move starts here</p>
              <h2>
                Let's find
                <br />
                your <em>haven.</em>
              </h2>
              <p className="contact-description">
                Tell us your preferred location, budget and property type,
                and we'll start the conversation.
              </p>

              <button
                className="contact-whatsapp"
                type="button"
                onClick={() => contactWhatsApp()}
              >
                <span className="whatsapp-symbol">
                  <WhatsAppIcon />
                </span>
                <span>
                  <small>Chat with us on WhatsApp</small>
                  <strong>{WHATSAPP_DISPLAY}</strong>
                </span>
                <span className="contact-arrow">
                  <Arrow />
                </span>
              </button>

              <div className="social-area">
                <p>Follow our journey</p>
                <div className="social-links">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.name}
                      title={social.name}
                    >
                      {social.short}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-card">
              <div className="form-heading">
                <span>Property enquiry</span>
              </div>

              <h3>Tell us what you need.</h3>
              <p className="form-intro">
                Fill in the details below and we'll get back to you.
              </p>

              {formStatus === "success" ? (
                <div className="form-success" role="status">
                  <span>✓</span>
                  <h3>Enquiry sent</h3>
                  <p>
                    Thank you for contacting Havenstone Realty. We'll be in
                    touch soon.
                  </p>
                  <button
                    type="button"
                    className="button button-dark"
                    onClick={() => setFormStatus("idle")}
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <label>
                      Full name *
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label>
                      Email address *
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      Phone number *
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+234..."
                        autoComplete="tel"
                        inputMode="tel"
                        pattern="[0-9+\s\-]{7,20}"
                        title="Enter a valid phone number"
                        required
                      />
                    </label>

                    <label>
                      Property type
                      <select name="property_type" defaultValue="">
                        <option value="">Select type</option>
                        <option value="Terrace">Terrace</option>
                        <option value="Duplex">Duplex</option>
                        <option value="Detached">Detached house</option>
                        <option value="Land">Land</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Other">Other</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Preferred location
                    <input
                      type="text"
                      name="preferred_location"
                      placeholder="e.g. GRA, Port Harcourt"
                    />
                  </label>

                  <label>
                    Budget range
                    <select name="budget" defaultValue="">
                      <option value="">Choose your budget</option>
                      <option value="Under ₦50 million">Under ₦50 million</option>
                      <option value="₦50m–₦100m">₦50m–₦100m</option>
                      <option value="₦100m–₦200m">₦100m–₦200m</option>
                      <option value="Above ₦200 million">Above ₦200 million</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </label>

                  <label>
                    Your message *
                    <textarea
                      name="message"
                      placeholder="Tell us a little about the property you need..."
                      rows="4"
                      required
                    />
                  </label>

                  <input
                    type="hidden"
                    name="_subject"
                    value="New Havenstone Realty property enquiry"
                  />

                  {/* Honeypot: hidden from people, catches spam bots */}
                  <input
                    type="text"
                    name="_gotcha"
                    tabIndex="-1"
                    autoComplete="off"
                    className="hp-field"
                    aria-hidden="true"
                  />

                  {formStatus === "error" && (
                    <p className="form-error" role="alert">
                      {formError}
                    </p>
                  )}

                  <button
                    className="button button-dark submit-button"
                    type="submit"
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending" ? "Sending..." : "Send enquiry"}
                    <Arrow />
                  </button>

                  <p className="form-privacy">
                    We only use your details to respond to your enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div>
            <a className="logo footer-logo" href="#home">
              <span className="logo-mark">H</span>
              <span className="logo-copy">
                HAVENSTONE
                <small>REALTY</small>
              </span>
            </a>
            <p className="footer-tagline">
              Find your place. Begin your next chapter.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              {WHATSAPP_DISPLAY}
            </a>
            <span>Port Harcourt, Rivers State</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Havenstone Realty</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>

      <button
        className="floating-whatsapp"
        type="button"
        aria-label="Chat on WhatsApp"
        onClick={() => contactWhatsApp()}
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}

export default App;