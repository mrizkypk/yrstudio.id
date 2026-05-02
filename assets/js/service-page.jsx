/* Service-page React shell — used by jasa-fotografer/videografer/sewa-drone */

const { useEffect: useEffectS } = React;

function ServicePage({ index, eyebrow, title, italic, lead, heroImage, portfolio, packages, process, faq, ctaSubtitle, active }) {
  useReveal();
  return (
    <>
      <Nav active={active} depth={1} />

      <section className="page-hero">
        <div className="container">
          <div className="index">{index}</div>
          <span className="eyebrow" style={{display:"block", marginBottom: 16}}>{eyebrow}</span>
          <h1>{title} <em>{italic}</em></h1>
          <p className="lead">{lead}</p>
        </div>
      </section>

      <section style={{padding: "0"}}>
        <div className="container reveal" style={{paddingTop: 60, paddingBottom: 60}}>
          <Carousel images={portfolio} variant={(window.__tweaks && window.__tweaks.carouselStyle) || "slideshow"} />
        </div>
      </section>

      <section className="service-section" style={{paddingTop: 0, borderTop: 0}}>
        <div className="container reveal">
          <div className="service-head">
            <div>
              <span className="index">Paket</span>
              <h2>Pilih sesuai <em>cerita</em> kamu.</h2>
            </div>
            <p>Setiap paket bersifat fleksibel — kami senang menyesuaikan deliverable, durasi, dan ukuran tim sesuai acara.</p>
          </div>
          <div className="price-table">
            {packages.map((p, i) => (
              <div key={i} className="price-row">
                <div className="num">{String(i+1).padStart(2,"0")}</div>
                <div>
                  <div className="name">{p.name}</div>
                  <div className="desc">{p.desc}</div>
                </div>
                <div className="price">{p.price}</div>
              </div>
            ))}
          </div>
          <p style={{marginTop: 24, fontSize: 13, color:"var(--muted)"}}>Harga sebagai panduan — bisa berubah berdasarkan lokasi, durasi, dan kebutuhan tambahan. Konsultasi via WhatsApp untuk paket khusus.</p>
        </div>
      </section>

      <section className="service-section" style={{paddingTop: 0, borderTop: 0}}>
        <div className="container reveal">
          <div className="service-head">
            <div>
              <span className="index">Proses</span>
              <h2>Empat langkah, <em>sederhana.</em></h2>
            </div>
          </div>
          <div className="steps">
            {process.map((s, i) => (
              <div key={i}>
                <div className="num">0{i+1}</div>
                <div className="name">{s.name}</div>
                <div className="desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-section" style={{paddingTop: 0, borderTop: 0}}>
        <div className="container reveal" style={{maxWidth: 920}}>
          <div className="service-head">
            <div>
              <span className="index">Pertanyaan</span>
              <h2>Yang sering <em>ditanyakan.</em></h2>
            </div>
          </div>
          <div className="faq">
            {faq.map((q, i) => (
              <details key={i} {...(i === 0 ? {open: true} : {})}>
                <summary>{q.q}</summary>
                <p>{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <WaCta sub={ctaSubtitle} />
      <ContactBlock />
      <Footer depth={1} />
      <YrTweaksPanel />
    </>
  );
}

window.ServicePage = ServicePage;
