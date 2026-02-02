// javascript
import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap');

  :root {
    --bg:#0b0f17;--panel:#0f1626;--panel2:#0c1322;--text:#e9eefc;--muted:#a9b5d1;
    --line:rgba(255,255,255,.10);--accent:#7aa7ff;--accent2:#6ee7ff;--good:#7CFFB2;
    --shadow:0 18px 50px rgba(0,0,0,.45);--radius:18px;
    --nav-height:64px;
  }

  *{box-sizing:border-box}
  html{min-height:100%}
  body{
    margin:0;
    font-family:'Rajdhani',ui-sans-serif,system-ui,-apple-system,sans-serif;
    color:var(--text);line-height:1.45;
    min-height:100vh;min-height:100dvh;

    background:
      radial-gradient(1200px 600px at 15% 0%,rgba(122,167,255,.22),transparent 55%),
      radial-gradient(1000px 700px at 85% 10%,rgba(110,231,255,.18),transparent 55%),
      radial-gradient(900px 600px at 60% 90%,rgba(124,255,178,.08),transparent 55%),
      repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(122,167,255,.015) 2px,rgba(122,167,255,.015) 4px),
      var(--bg);
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-size:cover;
    position:relative;
  }
  body::before{} body::after{}

  #root{position:relative;z-index:2;min-height:100vh;min-height:100dvh}
  main{min-height:calc(100vh - var(--nav-height));min-height:calc(100dvh - var(--nav-height));padding-top:var(--nav-height)}

  /* Container: remove max-width so header can span full width */
  .container{width:100%;max-width:none;margin:0;padding:0 20px}

  /* NAV should stretch the full viewport width */
  .nav{
    position:sticky;top:0;z-index:50;width:100%;
    backdrop-filter:blur(12px);
    background:linear-gradient(to bottom,rgba(11,15,23,.85),rgba(11,15,23,.70));
    border-bottom:1px solid rgba(122,167,255,.20);
    box-shadow:0 4px 20px rgba(0,0,0,.3);
  }
  .nav .container{max-width:none} /* explicit override in case of inherited styles */
  .nav::before{
    content:'';position:absolute;bottom:-1px;left:0;right:0;height:1px;
    background:linear-gradient(to right,transparent,var(--accent),var(--accent2),transparent);opacity:.5;
  }
  .nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;gap:12px}

  .brand{display:flex;align-items:center;gap:12px;font-weight:700;letter-spacing:.2px;cursor:pointer}
  .brand-text{display:flex;flex-direction:column;gap:2px}
  .brand-title{font-size:16px;line-height:1.1;text-transform:uppercase;letter-spacing:1px;font-weight:800;font-family:'Orbitron',sans-serif}
  .brand-subtitle{font-size:10px;color:var(--accent);line-height:1.1;text-transform:uppercase;letter-spacing:1.2px;font-weight:600}
  .logo{width:120px;height:auto;display:flex;align-items:center}
  .logo svg{width:100%;height:auto;filter:drop-shadow(0 4px 12px rgba(33,150,243,.3))}

  .burger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;z-index:50;background:none;border:none}
  .burger span{width:24px;height:2px;background:var(--accent);transition:all .3s ease;box-shadow:0 0 8px rgba(122,167,255,.5);display:block}
  .burger.active span:nth-child(1){transform:rotate(45deg) translate(7px,7px)}
  .burger.active span:nth-child(2){opacity:0}
  .burger.active span:nth-child(3){transform:rotate(-45deg) translate(7px,-7px)}

  .nav-links{display:flex;align-items:center;gap:14px;flex-wrap:wrap}
  .nav-links button{
    color:var(--muted);font-size:13px;padding:10px 14px;
    clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);
    border:1px solid transparent;text-transform:uppercase;letter-spacing:.5px;font-weight:600;
    background:none;cursor:pointer;font-family:inherit;transition:all .15s ease;
  }
  .nav-links button:hover{color:var(--text);border-color:rgba(122,167,255,.30);background:rgba(122,167,255,.08)}

  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:40;opacity:0;pointer-events:none;transition:opacity .3s ease}
  .overlay.active{opacity:1;pointer-events:auto}

  /* BUTTONS */
  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:10px;
    padding:11px 20px;
    clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);
    border:1px solid var(--line);background:rgba(255,255,255,.04);color:var(--text);
    font-weight:600;font-size:14px;box-shadow:0 10px 30px rgba(0,0,0,.22);
    transition:transform .08s ease,background .15s ease,border-color .15s ease,box-shadow .15s ease;
    white-space:nowrap;position:relative;text-transform:uppercase;letter-spacing:.5px;
    cursor:pointer;font-family:inherit;
  }
  .btn:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.20);box-shadow:0 0 20px rgba(122,167,255,.2),0 10px 30px rgba(0,0,0,.3)}
  .btn:active{transform:translateY(1px)}
  .btn.primary{border-color:rgba(122,167,255,.50);background:linear-gradient(135deg,rgba(122,167,255,.18),rgba(110,231,255,.10));box-shadow:0 0 20px rgba(122,167,255,.15),0 10px 30px rgba(0,0,0,.3)}
  .btn.primary:hover{border-color:rgba(122,167,255,.70);box-shadow:0 0 25px rgba(122,167,255,.25),0 10px 30px rgba(0,0,0,.3)}
  .btn.small{padding:9px 16px;font-size:12px}

  /* HERO */
  .hero{padding:52px 0 20px}
  .hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:22px;align-items:start}

  .kicker{
    display:inline-flex;gap:10px;align-items:center;padding:10px 16px;
    clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);
    border:1px solid rgba(124,255,178,.25);background:rgba(124,255,178,.06);color:var(--good);
    font-size:12px;margin-bottom:18px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;
  }
  .dot{width:10px;height:10px;border-radius:999px;background:var(--good);box-shadow:0 0 0 5px rgba(124,255,178,.10);animation:pulse 2s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.6}}

  h1{
    font-size:46px;line-height:1.06;margin:0 0 14px;letter-spacing:-.6px;text-transform:uppercase;font-weight:900;
    background:linear-gradient(135deg,var(--text),var(--accent));
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
    font-family:'Orbitron',sans-serif;
  }
  .lead{margin:0 0 18px;color:var(--muted);font-size:16px;max-width:62ch}
  .hero-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:14px}
  .fineprint{margin-top:12px;color:rgba(233,238,252,.62);font-size:12.5px}
  .mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}

  /* CARDS */
  .card{
    border:1px solid var(--line);
    clip-path:polygon(12px 0,100% 0,100% calc(100% - 12px),calc(100% - 12px) 100%,0 100%,0 12px);
    background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.02));
    box-shadow:var(--shadow);position:relative;
  }
  .card::before{content:'';position:absolute;top:0;left:0;width:3px;height:40px;background:linear-gradient(to bottom,var(--accent),transparent)}
  .card::after{content:'';position:absolute;bottom:0;right:0;width:40px;height:3px;background:linear-gradient(to left,var(--accent2),transparent)}
  .card.pad{padding:16px}
  .card-title{font-weight:700;margin:0 0 10px;letter-spacing:.5px;text-transform:uppercase;font-size:15px;color:var(--accent);font-family:'Orbitron',sans-serif}

  /* VIDEO */
  .iframe-box{
    position:relative;width:100%;padding-top:56.25%;
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
    overflow:hidden;border:1px solid rgba(122,167,255,.30);background:rgba(0,0,0,.50);
  }
  .iframe-box iframe{position:absolute;inset:0;width:100%;height:100%;border:0}

  /* GRIDS */
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}

  .badge{
    display:inline-flex;padding:7px 14px;
    clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);
    border:1px solid rgba(122,167,255,.30);font-size:11px;color:var(--accent);
    background:rgba(122,167,255,.08);font-weight:600;text-transform:uppercase;letter-spacing:.8px;
  }

  /* SECTIONS */
  .section{padding:22px 0}
  .section h2{font-size:24px;margin:0 0 10px;letter-spacing:.5px;text-transform:uppercase;font-weight:800;font-family:'Orbitron',sans-serif}
  .section p{margin:0;color:var(--muted)}
  .stack{display:flex;flex-direction:column;gap:12px}
  .list{margin:10px 0 0;padding:0 0 0 18px;color:var(--muted)}
  .list li{margin:6px 0}
  .divider{height:1px;background:linear-gradient(to right,transparent,var(--accent),var(--accent2),transparent);margin:20px 0;box-shadow:0 0 10px rgba(122,167,255,.3)}

  /* STEPS */
  .step{
    padding:18px;
    clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
    background:rgba(255,255,255,.04);border:1px solid var(--line);position:relative;
  }
  .step::before{content:'';position:absolute;top:-1px;left:-1px;width:20px;height:20px;border-top:2px solid var(--accent);border-left:2px solid var(--accent)}
  .step::after{content:'';position:absolute;bottom:-1px;right:-1px;width:20px;height:20px;border-bottom:2px solid var(--accent2);border-right:2px solid var(--accent2)}
  .step .num{
    width:32px;height:32px;
    clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px);
    display:inline-flex;align-items:center;justify-content:center;
    background:rgba(122,167,255,.18);border:1px solid rgba(122,167,255,.40);
    font-weight:700;margin-bottom:12px;font-size:15px;
  }
  .step h3{margin:0 0 6px;font-size:16px}
  .step p{margin:0;font-size:14px}

  .step.soon{opacity:.55;border-color:rgba(110,231,255,.25)!important;border-style:dashed}
  .step.soon::before{border-color:rgba(110,231,255,.4)!important}
  .step.soon::after{border-color:rgba(110,231,255,.4)!important}
  .soon-badge{
    display:inline-flex;padding:4px 10px;
    clip-path:polygon(5px 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%,0 5px);
    background:rgba(110,231,255,.10);border:1px solid rgba(110,231,255,.35);color:var(--accent2);
    font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;margin-bottom:10px;
  }

  /* HUB / HOW GRIDS */
  .hub-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
  .how-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px}

  /* ORDER STEPS ROW */
  .order-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .order-step{display:flex;align-items:center;gap:14px;padding:14px 18px;flex-direction:row}
  .order-step .num{margin-bottom:0;flex-shrink:0}

  /* CTA */
  .cta{
    padding:26px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;
    background:
      radial-gradient(700px 280px at 20% 0%,rgba(122,167,255,.18),transparent 55%),
      radial-gradient(700px 280px at 90% 0%,rgba(110,231,255,.14),transparent 55%),
      rgba(255,255,255,.04);
    border:1px solid rgba(122,167,255,.30);position:relative;
  }
  .cta::before{content:'';position:absolute;top:-1px;left:-1px;width:40px;height:40px;border-top:3px solid var(--accent);border-left:3px solid var(--accent)}
  .cta::after{content:'';position:absolute;bottom:-1px;right:-1px;width:40px;height:40px;border-bottom:3px solid var(--accent2);border-right:3px solid var(--accent2)}
  .cta h2{margin:0 0 6px;text-transform:uppercase;letter-spacing:.5px;font-family:'Orbitron',sans-serif}
  .cta p{margin:0}

  /* FOOTER */
  footer{padding:30px 0 44px;color:rgba(233,238,252,.55);font-size:12.5px}
  .foot-grid{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;border-top:1px solid var(--line);padding-top:16px}

  /* ROUTE FADE */
  .route-view{animation:fadeIn .28s ease}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}

  /* ─── RESPONSIVE ─── */
  @media(max-width:980px){
    .hero-grid,.grid-3,.hub-grid,.how-grid,.order-steps{grid-template-columns:1fr}
    .burger{display:flex}
    .nav-links{
      position:fixed;top:0;left:-100%;width:320px;max-width:85vw;height:100vh;
      flex-direction:column;align-items:stretch;gap:0;
      background:linear-gradient(to bottom,rgba(11,15,23,.98),rgba(11,15,23,.95));
      backdrop-filter:blur(20px);padding:80px 20px 20px;
      border-right:1px solid rgba(122,167,255,.30);box-shadow:4px 0 30px rgba(0,0,0,.5);
      transition:left .3s ease;z-index:45;overflow-y:auto;
    }
    .nav-links::before{content:'';position:absolute;top:0;right:-1px;width:1px;height:100%;background:linear-gradient(to bottom,var(--accent),var(--accent2));opacity:.7}
    .nav-links.active{left:0}
    .nav-links button{width:100%;padding:16px 20px;border-left:3px solid transparent;clip-path:none;text-align:left}
    .nav-links button:hover,.nav-links button.btn{border-left-color:var(--accent);background:rgba(122,167,255,.12)}
    .nav-links .btn{margin-top:10px;clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
    .order-step{flex-direction:column;align-items:flex-start;gap:8px}
  }
  @media(max-width:520px){h1{font-size:30px}}
`;

function injectStyles() {
  if (document.getElementById("ardco-spa-styles")) return;
  const el = document.createElement("style");
  el.id = "ardco-spa-styles";
  el.textContent = CSS;
  document.head.appendChild(el);
}

// ─── Shared Logo SVG ──────────────────────────────────────────────────────────
const LogoSVG = () => (
    <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="150" fontFamily="Orbitron, Arial Black, sans-serif" fontSize="160" fontWeight="900" fill="#2196F3">ARDCO</text>
      <circle cx="720" cy="100" r="70" fill="none" stroke="#2196F3" strokeWidth="10" />
      <ellipse cx="720" cy="100" rx="25" ry="40" fill="#2196F3" opacity="0.8" />
      <ellipse cx="720" cy="100" rx="40" ry="25" fill="#2196F3" opacity="0.8" />
    </svg>
);

// ─── Shared scroll helper — offsets by the sticky nav height ─────────────────
function scrollToId(id) {
  if (id === "top") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector(".nav");
  const offset = nav ? nav.getBoundingClientRect().height : 0;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// ─── Nav Component ────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggle = () => {
    setMenuOpen((o) => !o);
    document.body.style.overflow = menuOpen ? "" : "hidden";
  };
  const close = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const go = (id) => {
    close();
    scrollToId(id);
  };

  const links = [
    { anchor: "service", label: "Service" },
    { anchor: "order",   label: "How To Order" },
    { anchor: "hubs",    label: "Distribution Hubs" },
    { anchor: "recruit", label: "Recruitment" },
  ];

  return (
      <header className="nav">
        <div className="container">
          <div className="nav-inner">
            <div className="brand" onClick={() => go("top")}>
              <div className="logo"><LogoSVG /></div>
              <div className="brand-text">
                <div className="brand-title">Fuel</div>
                <div className="brand-subtitle">Manufacture • Delivery</div>
              </div>
            </div>

            <button className={`burger${menuOpen ? " active" : ""}`} onClick={toggle} aria-label="Toggle menu">
              <span /><span /><span />
            </button>

            <nav className={`nav-links${menuOpen ? " active" : ""}`} aria-label="Primary">
              {links.map((l) => (
                  <button key={l.label} className="btn-nav" onClick={() => go(l.anchor)}>
                    {l.label}
                  </button>
              ))}
              <button className="btn small primary" onClick={() => go("order")}>Request Delivery</button>
            </nav>
          </div>
        </div>
        <div className={`overlay${menuOpen ? " active" : ""}`} onClick={close} />
      </header>
  );
}

// ─── Page: Home (Hero + How to Order + Hubs) ─────────────────────────────────
function Home() {
  const orderSteps = [
    "Select your fuel type & volume",
    "Pick a delivery station",
    "Receive quote & contract ref",
  ];

  const hubs = [
    { name: "Sinq Laison",   desc: "Regional stock for consistent fulfillment and scalable supply.",                            soon: false },
    { name: "The Forge",     desc: "Rapid turnaround for high-demand areas and market access.",                                 soon: false },
    { name: "Khanid Kingdom",desc: "Coverage and redundancy to support routes across New Eden.",                                soon: false },
    { name: "Minmatar",      desc: "Expanding into Minmatar space to serve the wider northern regions of New Eden.",           soon: true  },
  ];

  return (
      <>
        {/* ── Hero ── */}
        <section className="hero route-view">
          <div className="container">
            <div className="hero-grid">
              <div className="stack">
                <div className="kicker"><span className="dot" />&nbsp;Reliable fuel supply for structures &amp; reactions</div>
                <h1>Fuel blocks, delivered.<br />Fast. Reliable. Competitive.</h1>
                <p className="lead">
                  ARDCO is an EVE Online industrial corporation with one singular focus:{" "}
                  <strong>reliable, competitively priced fuel block manufacture and delivery throughout New Eden.</strong>{" "}
                  Order once or set up a monthly recurring supply plan and keep your operations running without interruption.
                </p>
                <div className="hero-ctas">
                  <a className="btn primary" href="https://discord.gg/ZRrZawDSyP" target="_blank" rel="noopener noreferrer">Contact on Discord</a>
                  <button className="btn" onClick={() => scrollToId("order")}>Place an Order</button>
                </div>
                <div className="fineprint">
                  Prefer in-game? Join <span className="mono">"ARDCO Fuel"</span> for delivery requests or <span className="mono">"ARDCO Recruitment"</span> if you want to join the project.
                </div>
              </div>

              <div className="card pad" style={{ overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div>
                    <div className="card-title">See ARDCO in action</div>
                    <div className="badge">Operations &amp; progress series</div>
                  </div>
                  <a className="btn small" href="https://www.youtube.com/watch?v=wOUjS0Fgc_I" target="_blank" rel="noopener noreferrer">Open on YouTube</a>
                </div>
                <div className="iframe-box" aria-label="Embedded YouTube video">
                  <iframe
                      src="https://www.youtube-nocookie.com/embed/wOUjS0Fgc_I"
                      title="ARDCO Operations & Progress"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Service ── */}
        <section className="section" id="service">
          <div className="container">
            <div className="grid-3">
              {[
                {
                  title: "Fuel Blocks",
                  desc: "Supply for structures and reactions — manufactured with consistency and delivered with care.",
                  items: ["Single deliveries", "Monthly recurring orders", "Volume-friendly support"],
                },
                {
                  title: "Fast Delivery",
                  desc: "We're set up to move fuel efficiently, so you spend less time sourcing and more time building.",
                  items: ["Clear communication", "Dependable logistics", "Built for uptime"],
                },
                {
                  title: "Competitive Pricing",
                  desc: "Our model is designed for long-term operators who value predictable supply and fair rates.",
                  items: ["Contract-friendly terms", "Simple, no-drama service", "Focused on repeat customers"],
                },
              ].map((c) => (
                  <div className="card pad" key={c.title}>
                    <div className="card-title">{c.title}</div>
                    <p>{c.desc}</p>
                    <ul className="list">
                      {c.items.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to Order ── */}
        <section className="section" id="order">
          <div className="container">
            <div className="card pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                <div className="stack" style={{ gap: 8 }}>
                  <div className="badge">Place Your Order</div>
                  <h2 style={{ margin: 0 }}>How to Order</h2>
                  <p>
                    Tell us what you need and where you need it. You'll get an immediate quote based on ESI sales data and a reference for your in-game contract.
                  </p>
                </div>
              </div>

              <div className="divider" />

              <div className="order-steps">
                {orderSteps.map((txt, i) => (
                    <div className="step order-step" key={i}>
                      <div className="num" style={{ marginBottom: 0, flexShrink: 0 }}>{i + 1}</div>
                      <span style={{ color: "var(--muted)", fontSize: 14 }}>{txt}</span>
                    </div>
                ))}
              </div>

              <div className="divider" />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ color: "var(--muted)", fontSize: 14 }}>Ready to get started? Place your order now and we'll handle the rest.</span>
                <a className="btn primary" href="https://discord.gg/ZRrZawDSyP" target="_blank" rel="noopener noreferrer" style={{ fontSize: 15, padding: "14px 28px" }}>
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Distribution Hubs ── */}
        <section className="section" id="hubs">
          <div className="container">
            <div className="card pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                <div className="stack" style={{ gap: 8 }}>
                  <h2 style={{ margin: 0 }}>Distribution Hubs</h2>
                  <p>
                    To keep delivery times low and supply dependable, ARDCO operates regional fuel distribution hubs across key markets.
                  </p>
                </div>
                <div className="badge">Active hubs</div>
              </div>

              <div className="divider" />

              <div className="hub-grid">
                {hubs.map((h) => (
                    <div className={`step${h.soon ? " soon" : ""}`} key={h.name}>
                      {h.soon && <div className="soon-badge">Coming Soon</div>}
                      <div className="num" aria-hidden="true">◎</div>
                      <h3>{h.name}</h3>
                      <p>{h.desc}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* ── Recruitment ── */}
        <section className="section" id="recruit">
          <div className="container">
            <div className="card cta">
              <div style={{ maxWidth: "72ch" }}>
                <h2>Build the fuel network with us</h2>
                <p>
                  ARDCO's goal is to become <strong>THE supplier of fuel across New Eden</strong>.
                  We're looking for pilots drawn to mining, logistics, and manufacturing who want to work together toward a clear objective
                  inside a functioning framework. Experience level doesn't matter.
                </p>
                <p style={{ marginTop: 10, color: "var(--muted)" }}>
                  Note: Our progress is documented in an ongoing YouTube series — you should be comfortable with light publicity / being mentioned in videos.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="btn primary" href="https://discord.gg/ZRrZawDSyP" target="_blank" rel="noopener noreferrer">Talk to a recruiter</a>
                <a className="btn" href="https://www.youtube.com/watch?v=wOUjS0Fgc_I" target="_blank" rel="noopener noreferrer">Watch the series</a>
                <button className="btn" onClick={() => scrollToId("order")}>Request delivery</button>
              </div>
            </div>

            <footer>
              <div className="foot-grid">
                <div>
                  <div style={{ fontWeight: 700, color: "rgba(233,238,252,.78)" }}>ARDCO Fuel</div>
                  <div>Fuel block manufacture &amp; delivery service across New Eden.</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div>Discord: <a href="https://discord.gg/ZRrZawDSyP" target="_blank" rel="noopener noreferrer">discord.gg/ZRrZawDSyP</a></div>
                  <div>YouTube: <a href="https://www.youtube.com/watch?v=wOUjS0Fgc_I" target="_blank" rel="noopener noreferrer">wOUjS0Fgc_I</a></div>
                  <div>In-game: <span className="mono">"ARDCO Fuel"</span> • <span className="mono">"ARDCO Recruitment"</span></div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <span style={{ opacity: .85 }}>©</span> ARDCO • Not affiliated with CCP Games • EVE Online is a trademark of CCP Games.
              </div>
            </footer>
          </div>
        </section>
      </>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => { injectStyles(); }, []);

  return (
      <div id="root">
        <Nav />
        <main><Home /></main>
      </div>
  );
}