/* Shared site components for YRStudio */

const { useState, useEffect, useRef, useCallback } = React;

const WA = "6281215292767";
const WA_LINK = `https://wa.me/${WA}?text=${encodeURIComponent("Halo YR Studio, saya ingin tanya seputar layanan.")}`;
const ADDRESS = "Balong Timur, Beran, Kec. Ngawi, Kabupaten Ngawi, Jawa Timur 63216";
const EMAIL = "ucup.leader@gmail.com";
const PHONE = "081215292767";
const IG = "artrowcreative";

const NAV_ITEMS = [
{ href: "/", label: "Beranda", key: "home" },
{ href: "/jasa-fotografer-ngawi/", label: "Jasa Fotografer", key: "foto" },
{ href: "/jasa-videografer-ngawi/", label: "Jasa Videografer", key: "video" },
{ href: "/jasa-sewa-drone-ngawi/", label: "Sewa Drone", key: "drone" },
{ href: "/tentang-kami/", label: "Tentang Kami", key: "tentang" },
{ href: "/kontak-kami/", label: "Kontak", key: "kontak" }];


// Resolve relative path based on current location depth
function relPath(href, depth) {
  if (href.startsWith("http")) return href;
  if (href === "/") return depth === 0 ? "/" : "../".repeat(depth);
  const clean = href.replace(/^\//, "").replace(/\/$/, "");
  return (depth === 0 ? "/" : "../".repeat(depth)) + clean + "/";
}

function Nav({ active, depth = 0 }) {
  const [open, setOpen] = useState(false);
  const brandSrc = depth === 0 ? "brand.jpg" : "../".repeat(depth) + "brand.jpg";
  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <a href={relPath("/", depth)} className="nav-brand" aria-label="YR Studio">
            <img src={brandSrc} alt="" />
            <span className="nav-brand-text">YR<em>Studio</em></span>
          </a>
          <ul className="nav-links" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_ITEMS.map((it) =>
            <li key={it.key}>
                <a href={relPath(it.href, depth)} className={active === it.key ? "active" : ""}>{it.label}</a>
              </li>
            )}
          </ul>
          <a href={WA_LINK} className="nav-cta" target="_blank" rel="noopener">
            <span>Hubungi via WA</span>
            <span aria-hidden>→</span>
          </a>
          <button className="nav-burger" onClick={() => setOpen(true)} aria-label="Buka menu">
            <span></span>
          </button>
        </div>
      </nav>
      <div className={"mobile-menu" + (open ? " open" : "")}>
        <button className="close" onClick={() => setOpen(false)} aria-label="Tutup">×</button>
        {NAV_ITEMS.map((it) =>
        <a key={it.key} href={relPath(it.href, depth)} onClick={() => setOpen(false)}>{it.label}</a>
        )}
        <div style={{ marginTop: "auto", paddingTop: 32 }}>
          <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener">Chat WhatsApp →</a>
        </div>
      </div>
    </>);

}

function Footer({ depth = 0 }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="display">Mari abadikan momen yang <em>tak terulang</em>.</div>
            <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={WA_LINK} className="btn btn-primary" style={{ background: "var(--bg)", color: "var(--ink)" }} target="_blank" rel="noopener">Mulai obrolan</a>
            </div>
          </div>
          <div>
            <h4>Layanan</h4>
            <ul>
              <li><a href={relPath("/jasa-fotografer/", depth)}>Jasa Fotografer</a></li>
              <li><a href={relPath("/jasa-videografer/", depth)}>Jasa Videografer</a></li>
              <li><a href={relPath("/sewa-drone/", depth)}>Sewa Drone</a></li>
            </ul>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li><a href={relPath("/tentang/", depth)}>Tentang Kami</a></li>
              <li><a href={relPath("/kontak/", depth)}>Kontak</a></li>
              <li><a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontak</h4>
            <ul>
              <li>{PHONE}</li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li style={{ maxWidth: 240 }}>{ADDRESS}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 YR Studio · Ngawi, Jawa Timur</p>
          <p>Dibuat dengan ketelitian oleh Yusuf Rachmawan</p>
        </div>
      </div>
    </footer>);

}

/* ========== Carousel ========== */
function Carousel({ images, variant = "slideshow", interval = 4500, label, tall = false }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (variant !== "slideshow" || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), interval);
    return () => clearInterval(t);
  }, [variant, paused, total, interval]);

  const go = (n) => setIdx((n + total) % total);

  if (variant === "mosaic") {
    return (
      <div className="carousel mosaic" aria-label={label}>
        <div className="carousel-track">
          {images.map((img, i) =>
          <div key={i} className="carousel-slide active">
              <img src={img.src} alt={img.alt || ""} loading="lazy" />
            </div>
          )}
        </div>
      </div>);

  }

  if (variant === "filmstrip") {
    return (
      <div className="carousel filmstrip" aria-label={label}>
        <div className="carousel-track">
          {images.map((img, i) =>
          <div key={i} className="carousel-slide">
              <img src={img.src} alt={img.alt || ""} loading="lazy" />
            </div>
          )}
        </div>
      </div>);

  }

  // default slideshow
  return (
    <div
      className={"carousel" + (tall ? " tall" : "")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={label}>
      
      <div className="carousel-track">
        {images.map((img, i) =>
        <div key={i} className={"carousel-slide" + (i === idx ? " active" : "")} aria-hidden={i !== idx}>
            <img src={img.src} alt={img.alt || ""} loading={i === 0 ? "eager" : "lazy"} />
          </div>
        )}
      </div>
      <div className="carousel-counter">
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
      <div className="carousel-arrows">
        <button className="carousel-arrow prev" onClick={() => go(idx - 1)} aria-label="Sebelumnya">←</button>
        <button className="carousel-arrow next" onClick={() => go(idx + 1)} aria-label="Berikutnya">→</button>
      </div>
      <div className="carousel-dots">
        {images.map((_, i) =>
        <button key={i} className={"carousel-dot" + (i === idx ? " active" : "")} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} />
        )}
      </div>
    </div>);

}

/* ========== Service Section (used on Beranda) ========== */
function ServiceSection({ index, title, italic, description, specs, images, ctaHref, ctaLabel = "Lihat layanan", carouselVariant }) {
  return (
    <section className="service-section">
      <div className="container">
        <div className="service-head">
          <div>
            {index && <span className="index">{index}</span>}
            <h2>{title} <em>{italic}</em></h2>
          </div>
          <p>{description}</p>
        </div>
        <Carousel images={images} variant={carouselVariant} label={`${title} portfolio`} />
        {specs &&
        <div className="specs">
            {specs.map((s, i) =>
          <div key={i}>
                <div className="label">{s.label}</div>
                <div className="value">{s.value}</div>
              </div>
          )}
          </div>
        }
        <div style={{ marginTop: 48, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href={ctaHref} className="btn-link">{ctaLabel}<span className="arrow">→</span></a>
        </div>
      </div>
    </section>);

}

/* ========== WhatsApp CTA ========== */
function WaCta({ headline, sub }) {
  return (
    <section className="wa-cta">
      <div className="container">
        <h2 className="display">
          {headline || <>Punya momen <em>besar</em> di depan mata?<br />Yuk obrolin sekarang.</>}
        </h2>
        <p className="sub">{sub || "Konsultasi gratis via WhatsApp. Ceritain kebutuhan kamu — paket akan kami sesuaikan dengan acara dan budget."}</p>
        <div className="actions">
          <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            Chat WhatsApp
          </a>
          <a href={`tel:+${WA}`} className="btn btn-ghost">Telepon langsung</a>
        </div>
      </div>
    </section>);

}

/* ========== Contact / Map block ========== */
function ContactBlock() {
  const mapSrc = "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";
  return (
    <section className="container" style={{ padding: 0 }}>
      <div className="contact-block">
        <div className="contact-map">
          <iframe src={mapSrc} loading="lazy" title="Lokasi YR Studio Ngawi" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className="contact-info">
          <div>
            <span className="eyebrow">Kontak Lengkap</span>
            <h3 style={{ fontSize: "clamp(28px, 3.6vw, 44px)", marginTop: 12 }}>Studio kami di Ngawi.</h3>
          </div>
          <div className="contact-row">
            <span className="label">Alamat</span>
            <div className="value" style={{ fontSize: 18, lineHeight: 1.4 }}>{ADDRESS}</div>
          </div>
          <div className="contact-row">
            <span className="label">WhatsApp / Telepon</span>
            <div className="value"><a href={WA_LINK} target="_blank" rel="noopener">{PHONE}</a></div>
          </div>
          <div className="contact-row">
            <span className="label">Email</span>
            <div className="value"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          </div>
          <div className="contact-row">
            <span className="label">Instagram</span>
            <div className="value"><a href={`https://instagram.com/${IG}`} target="_blank" rel="noopener">@{IG}</a></div>
          </div>
        </div>
      </div>
    </section>);

}

/* ========== Marquee ========== */
function Marquee({ items }) {
  const content =
  <span>
      {items.map((it, i) =>
    <React.Fragment key={i}>
          {it}
          <span className="star">
</span>
        </React.Fragment>)}
    </span>;

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {content}{content}{content}
      </div>
    </div>);

}

/* ========== Reveal hook ========== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {if (e.isIntersecting) {e.target.classList.add("in");io.unobserve(e.target);}});
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Export to window
Object.assign(window, {
  Nav, Footer, Carousel, ServiceSection, WaCta, ContactBlock, Marquee,
  useReveal,
  WA, WA_LINK, ADDRESS, EMAIL, PHONE, IG, NAV_ITEMS,
  relPath
});