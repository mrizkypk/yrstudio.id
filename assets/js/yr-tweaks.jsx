/* YRStudio Tweaks application logic */
const { useEffect: useEffectT } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "skyblue",
  "fontPair": "cormorant-inter",
  "heroVariant": "split",
  "carouselStyle": "mosaic"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  skyblue:   { accent: "oklch(0.72 0.08 235)", ink: "oklch(0.42 0.09 235)" },
  bronze:    { accent: "oklch(0.55 0.05 60)",  ink: "oklch(0.30 0.05 60)" },
  terracotta:{ accent: "oklch(0.58 0.10 35)",  ink: "oklch(0.32 0.08 35)" },
  ink:       { accent: "oklch(0.45 0.05 250)", ink: "oklch(0.25 0.05 250)" },
  sage:      { accent: "oklch(0.55 0.05 145)", ink: "oklch(0.30 0.05 145)" },
  black:     { accent: "oklch(0.20 0.005 75)", ink: "oklch(0.20 0.005 75)" },
};

const FONT_MAP = {
  "cormorant-inter": { serif: '"Cormorant Garamond", Georgia, serif',  sans: '"Inter", system-ui, sans-serif' },
  "fraunces-inter":  { serif: '"Fraunces", Georgia, serif',            sans: '"Inter", system-ui, sans-serif' },
  "playfair-geist":  { serif: '"Playfair Display", Georgia, serif',    sans: '"Geist", "Inter", sans-serif' },
  "instrument-jakarta": { serif: '"Instrument Serif", Georgia, serif', sans: '"Plus Jakarta Sans", "Inter", sans-serif' },
};

function applyTweaks(t) {
  const root = document.documentElement;
  const a = ACCENT_MAP[t.accent] || ACCENT_MAP.bronze;
  root.style.setProperty("--accent", a.accent);
  root.style.setProperty("--accent-ink", a.ink);
  const f = FONT_MAP[t.fontPair] || FONT_MAP["cormorant-inter"];
  root.style.setProperty("--serif", f.serif);
  root.style.setProperty("--sans", f.sans);
  root.dataset.heroVariant = t.heroVariant;
  root.dataset.carouselStyle = t.carouselStyle;
  // broadcast for components
  window.__tweaks = t;
  window.dispatchEvent(new CustomEvent("yr-tweaks", { detail: t }));
}

function YrTweaksPanel() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffectT(() => { applyTweaks(t); }, [t.accent, t.fontPair, t.heroVariant, t.carouselStyle]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Aksen warna">
        <TweakRadio
          value={t.accent}
          onChange={v => setTweak("accent", v)}
          options={[
            { value: "skyblue", label: "Sky Blue" },
            { value: "bronze", label: "Bronze" },
            { value: "terracotta", label: "Terracotta" },
            { value: "ink", label: "Ink Blue" },
            { value: "sage", label: "Sage" },
            { value: "black", label: "Mono" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Pasangan font">
        <TweakSelect
          value={t.fontPair}
          onChange={v => setTweak("fontPair", v)}
          options={[
            { value: "cormorant-inter", label: "Cormorant + Inter" },
            { value: "fraunces-inter", label: "Fraunces + Inter" },
            { value: "playfair-geist", label: "Playfair + Geist" },
            { value: "instrument-jakarta", label: "Instrument + Jakarta" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Hero (Beranda)">
        <TweakRadio
          value={t.heroVariant}
          onChange={v => setTweak("heroVariant", v)}
          options={[
            { value: "split", label: "Split" },
            { value: "editorial", label: "Editorial" },
            { value: "fullbleed", label: "Full-bleed" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Carousel">
        <TweakRadio
          value={t.carouselStyle}
          onChange={v => setTweak("carouselStyle", v)}
          options={[
            { value: "slideshow", label: "Slideshow" },
            { value: "filmstrip", label: "Filmstrip" },
            { value: "mosaic", label: "Mosaic" },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// Apply ASAP from defaults so UI is consistent on load
applyTweaks(TWEAK_DEFAULTS);

window.YrTweaksPanel = YrTweaksPanel;
window.__tweaks = TWEAK_DEFAULTS;
