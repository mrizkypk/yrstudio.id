/* Beranda — landing page */
const { useState: useStateB, useEffect: useEffectB } = React;

const FOTO_PORTFOLIO = [
  { src: "assets/portfolio/p07.jpg", alt: "Prewedding adat Jawa" },
  { src: "assets/portfolio/p01.jpg", alt: "Wedding portrait" },
  { src: "assets/portfolio/p08.jpg", alt: "Pelaminan biru elegan" },
  { src: "assets/portfolio/p05.jpg", alt: "Akad nikah" },
  { src: "assets/portfolio/p09.jpg", alt: "Engagement" },
  { src: "assets/portfolio/p03.jpg", alt: "Wedding candid" },
];

const VIDEO_PORTFOLIO = [
  { src: "assets/portfolio/p04.jpg", alt: "Video pernikahan sinematik" },
  { src: "assets/portfolio/p06.jpg", alt: "Film prewedding" },
  { src: "assets/portfolio/p10.jpg", alt: "Film lamaran" },
  { src: "assets/portfolio/p02.jpg", alt: "Film pernikahan" },
  { src: "assets/images/foto2.jpg", alt: "Adegan sinematik" },
  { src: "assets/images/foto3.jpg", alt: "Adegan sinematik" },
];

const DRONE_PORTFOLIO = [
  { src: "assets/images/drone.jpg", alt: "Udara Ngawi" },
  { src: "assets/images/foto4.jpg", alt: "Venue pernikahan dari udara" },
  { src: "assets/portfolio/p06.jpg", alt: "Aerial sinematik" },
  { src: "assets/images/foto1.jpg", alt: "Potret dari udara" },
];

function useTweakState() {
  const [t, setT] = useStateB(window.__tweaks || {});
  useEffectB(() => {
    const h = (e) => setT({...e.detail});
    window.addEventListener("yr-tweaks", h);
    return () => window.removeEventListener("yr-tweaks", h);
  }, []);
  return t;
}

function HeroSplit() {
  return (
    <section className="hero-split">
      <div className="hero-split-inner">
        <div className="hero-split-text">
          <span className="eyebrow">Studio Foto · Video · Aerial · Ngawi</span>
          <h1>
            Cerita yang<br/>
            <em>tak berulang,</em><br/>
            kami abadikan.
          </h1>
          <p className="hero-lead">
            YR Studio adalah komunitas fotografer & videografer dari Ngawi, Jawa Timur. Sejak 2020 kami membantu pasangan, keluarga, dan jenama menyusun arsip visual yang sinematik dan jujur.
          </p>
          <div className="hero-actions">
            <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener">Konsultasi gratis →</a>
            <a href="#layanan" className="btn-link">Lihat tiga layanan utama<span className="arrow">↓</span></a>
          </div>
          <div className="hero-meta">
            <div><div className="num">120+</div><div className="lbl">Acara terdokumentasi</div></div>
            <div><div className="num">5★</div><div className="lbl">Rata-rata ulasan klien</div></div>
            <div><div className="num">2020</div><div className="lbl">Berdiri di Ngawi</div></div>
          </div>
        </div>
        <div className="hero-split-image">
          <img src="assets/portfolio/p01.jpg" alt="Karya YR Studio" />
          <div className="hero-image-tag mono">Pernikahan · Bukit Pinus, Ngawi</div>
        </div>
      </div>
    </section>
  );
}

function HeroEditorial() {
  return (
    <section className="hero-editorial">
      <div className="container">
        <div className="hero-ed-grid">
          <div className="hero-ed-meta">
            <span className="eyebrow">YR Studio — Berdiri 2020</span>
            <div className="hero-ed-loc mono">Ngawi · Jawa Timur · 63216</div>
          </div>
          <h1 className="hero-ed-display">
            <span>Untuk hari-hari</span><br/>
            <em>yang patut dikenang</em><br/>
            <span>seumur hidup.</span>
          </h1>
          <div className="hero-ed-foot">
            <p>Tim muda yang menggabungkan dokumentasi jujur dengan estetika sinematik. Foto, video, dan aerial — satu studio, satu visi.</p>
            <a href={WA_LINK} className="btn btn-primary" target="_blank" rel="noopener">Mulai konsultasi →</a>
          </div>
        </div>
        <div className="hero-ed-strip">
          <img src="assets/portfolio/p07.jpg" alt="" />
          <img src="assets/portfolio/p01.jpg" alt="" />
          <img src="assets/portfolio/p08.jpg" alt="" />
          <img src="assets/portfolio/p05.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}

function HeroFullBleed() {
  return (
    <section className="hero-full">
      <img src="assets/portfolio/p07.jpg" alt="" className="hero-full-bg"/>
      <div className="hero-full-overlay"/>
      <div className="container hero-full-content">
        <span className="eyebrow" style={{color:"color-mix(in oklab, var(--bg) 75%, transparent)"}}>YR Studio · Ngawi</span>
        <h1>
          Penuh rasa. <em>Jujur.</em><br/>Untuk hari yang berarti.
        </h1>
        <div style={{display:"flex", gap: 16, marginTop: 48, flexWrap:"wrap"}}>
          <a href={WA_LINK} className="btn btn-primary" style={{background:"var(--bg)", color:"var(--ink)"}} target="_blank" rel="noopener">Konsultasi via WA</a>
          <a href="#layanan" className="btn btn-ghost" style={{color:"var(--bg)", borderColor:"color-mix(in oklab, var(--bg) 50%, transparent)"}}>Lihat layanan ↓</a>
        </div>
      </div>
      <div className="hero-full-tag mono">Arsip pernikahan · Ngawi 2024</div>
    </section>
  );
}

function Hero() {
  const t = useTweakState();
  if (t.heroVariant === "editorial") return <HeroEditorial />;
  if (t.heroVariant === "fullbleed") return <HeroFullBleed />;
  return <HeroSplit />;
}

function Beranda() {
  useReveal();
  const t = useTweakState();
  const variant = t.carouselStyle || "slideshow";

  return (
    <>
      <Nav active="home" depth={0} />
      <Hero />

      <section id="layanan" style={{padding: "80px 0 0"}}>
        <div className="container">
          <div className="reveal" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap: 60, alignItems:"end"}}>
            <div>
              <span className="eyebrow">Tiga layanan inti</span>
              <h2 style={{marginTop: 24}}>Kami merangkai cerita lewat <em className="serif-it">cahaya, gerak, dan ketinggian.</em></h2>
            </div>
            <p style={{color:"var(--muted)", maxWidth: 460}}>Setiap layanan ditangani tim yang dikhususkan — fotografer, videografer, dan pilot drone bersertifikasi. Bisa dipilih satu atau dipaketkan.</p>
          </div>
        </div>
      </section>

      <ServiceSection
        title="Jasa"
        italic="Fotografer."
        description="Dari prewedding hingga dokumentasi acara — kami merangkum momen jadi cerita yang bisa dibuka berkali-kali."
        images={FOTO_PORTFOLIO}
        carouselVariant={variant}
        ctaHref="/jasa-fotografer-ngawi/"
        ctaLabel="Lihat paket fotografer"
        specs={[
          { label: "Format", value: "Digital + Cetak" },
          { label: "Durasi", value: "4–10 jam" },
          { label: "Tim", value: "1–3 fotografer" },
          { label: "Output", value: "100–500 foto" },
        ]}
      />

      <ServiceSection
        title="Jasa"
        italic="Videografer."
        description="Film yang menampilkan emosi, bukan sekadar urutan kejadian. Pewarnaan dan musik khas YR Studio."
        images={VIDEO_PORTFOLIO}
        carouselVariant={variant}
        ctaHref="/jasa-videografer-ngawi/"
        ctaLabel="Lihat paket videografer"
        specs={[
          { label: "Resolusi", value: "4K · 24fps" },
          { label: "Durasi film", value: "3–8 menit" },
          { label: "Tim", value: "2 videografer" },
          { label: "Output", value: "Film + Reels" },
        ]}
      />

      <ServiceSection
        title="Sewa"
        italic="Drone."
        description="Aerial footage untuk hari pernikahan, music video, atau dokumentasi area. Sudah termasuk pilot berpengalaman."
        images={DRONE_PORTFOLIO}
        carouselVariant={variant}
        ctaHref="/jasa-sewa-drone-ngawi/"
        ctaLabel="Cek ketersediaan drone"
        specs={[
          { label: "Drone", value: "DJI Mavic series" },
          { label: "Resolusi", value: "4K HDR" },
          { label: "Pilot", value: "Termasuk" },
          { label: "Cakupan", value: "Ngawi & sekitar" },
        ]}
      />

      <WaCta />

      <ContactBlock />

      <Footer depth={0} />
      <YrTweaksPanel />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Beranda />);
