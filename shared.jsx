// shared.jsx — Navbar (customer), barber sidebar, icons, common bits
// All components are exposed on window for cross-script use.

// ─────────────── Icons (inline SVG, monochrome) ───────────────
function Icon({ name, size = 16, stroke = 1.6, color }) {
  const s = size,sw = stroke;
  const c = color || 'currentColor';
  const common = {
    width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
    stroke: c, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round'
  };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    pin: <><path d="M12 21s-7-7.5-7-12a7 7 0 0114 0c0 4.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
    star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6L12 17l-5.4 2.8 1-6L3.2 9.5l6.1-.9z" />,
    bell: <><path d="M6 9a6 6 0 0112 0v4l1.5 3h-15L6 13z" /><path d="M10 19a2 2 0 004 0" /></>,
    chev: <path d="M6 9l6 6 6-6" />,
    chevL: <path d="M15 6l-6 6 6 6" />,
    chevR: <path d="M9 6l6 6-6 6" />,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="M5 12l5 5L20 7" />,
    close: <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>,
    cal: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c1-3.5 3.5-5 7-5s6 1.5 7 5" /><circle cx="17" cy="9" r="2.8" /><path d="M16 14.5c2.6 0 4.4 1.3 6 4.5" /></>,
    scissors: <><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><path d="M9 9l11 11M9 15L20 4" /></>,
    razor: <><path d="M3 14l7-7 4 4-7 7H3z" /><path d="M14 7l4-4 3 3-4 4" /></>,
    map: <><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>,
    list: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    grid: <><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></>,
    home: <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" />,
    compass: <><circle cx="12" cy="12" r="9" /><path d="M15 9l-1.5 4.5L9 15l1.5-4.5z" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 01-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 012.8-2.8l.1.1a1.7 1.7 0 001.8.3h0a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 012.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v0a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z" /></>,
    heart: <path d="M12 21s-7-4.5-9.5-9A5 5 0 0112 6.5 5 5 0 0121.5 12c-2.5 4.5-9.5 9-9.5 9z" />,
    phone: <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />,
    sliders: <><path d="M4 7h10M18 7h2M4 12h2M10 12h10M4 17h12M20 17h0" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="12" r="2" /><circle cx="18" cy="17" r="2" /></>,
    trend: <path d="M3 17l6-6 4 4 8-9" />,
    money: <><circle cx="12" cy="12" r="9" /><path d="M9 9c0-1.1 1.3-2 3-2s3 .9 3 2-1 1.5-3 2-3 1-3 2 1.3 2 3 2 3-.9 3-2M12 6v2M12 16v2" /></>,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" /></>,
    arrowR: <path d="M5 12h14M13 5l7 7-7 7" />,
    bookmark: <path d="M6 4h12v17l-6-4-6 4z" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 8v.01M12 11v5" /></>,
    block: <><circle cx="12" cy="12" r="9" /><path d="M5.6 5.6l12.8 12.8" /></>
  };
  return <svg {...common}>{paths[name]}</svg>;
}

// ─────────────── Customer Navbar ───────────────
function Navbar({ active = 'home', city = 'Kütahya' }) {
  const link = (key, label) =>
  <a href="#" onClick={(e) => e.preventDefault()}
  style={{
    textDecoration: 'none',
    color: active === key ? 'var(--text)' : 'var(--text-muted)',
    fontSize: 14, fontWeight: active === key ? 600 : 500,
    position: 'relative', padding: '6px 2px'
  }}>
      {label}
      {active === key &&
    <span style={{
      position: 'absolute', left: 0, right: 0, bottom: -16,
      height: 2, background: 'var(--gold-grad)'
    }} />
    }
    </a>;


  return (
    <header style={{
      height: 64,
      borderBottom: '1px solid var(--line)',
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', flexShrink: 0,
      position: 'relative', zIndex: 10
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <Logo />
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {link('home', 'Ana Sayfa')}
          {link('explore', 'Keşfet')}
          {link('appts', 'Randevularım')}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon name="pin" size={13} />
          <span>{city}</span>
          <Icon name="chev" size={13} />
        </button>
        <button style={iconBtn}><Icon name="bell" size={17} /><span style={notifDot} /></button>
        <button style={{
          background: 'transparent',
          border: '1px solid var(--line)',
          borderRadius: 999,
          color: 'var(--text-muted)',
          height: 38,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '3px 10px 3px 3px',
        }}>
          <span className="av" style={{ width: 30, height: 30, fontSize: 11, lineHeight: 1, fontWeight: 600 }}>MY</span>
          <Icon name="chev" size={13} />
        </button>
      </div>
    </header>);

}

const iconBtn = {
  background: 'transparent', border: '1px solid var(--line)',
  borderRadius: 999, color: 'var(--text-muted)',
  width: 38, height: 38, display: 'inline-flex',
  alignItems: 'center', justifyContent: 'center', position: 'relative'
};
const notifDot = {
  position: 'absolute', top: 9, right: 10,
  width: 7, height: 7, borderRadius: 4,
  background: 'var(--gold-light)',
  boxShadow: '0 0 0 2px var(--bg)'
};

// ─────────────── Logo (wordmark) ───────────────
function Logo({ small } = {}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {/* mark — abstract scissor blade */}
      <svg width={small ? 22 : 26} height={small ? 22 : 26} viewBox="0 0 26 26" fill="none">
        <defs>
          <linearGradient id="lg-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8c66a" />
            <stop offset="1" stopColor="#a88a3a" />
          </linearGradient>
        </defs>
        <circle cx="13" cy="13" r="12" stroke="url(#lg-gold)" strokeWidth="1" />
        <path d="M7 7l12 12M19 7L7 19" stroke="url(#lg-gold)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="13" r="2.4" fill="url(#lg-gold)" />
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontSize: small ? 18 : 22,
        fontWeight: 500,
        letterSpacing: '-0.03em',
        color: 'var(--text)'
      }}>
        Clippr
      </span>
    </div>);

}

// ─────────────── Barber sidebar ───────────────
function BarberSidebar({ active = 'appts' }) {
  const items = [
  { k: 'appts', label: 'Randevular', icon: 'cal', count: 8 },
  { k: 'sched', label: 'Takvim', icon: 'clock' },
  { k: 'profile', label: 'Profil', icon: 'user' },
  { k: 'settings', label: 'Ayarlar', icon: 'settings' }];

  return (
    <aside style={{
      width: 260, flexShrink: 0,
      background: 'var(--surface-1)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      padding: '24px 16px'
    }}>
      <div style={{ padding: '4px 8px 24px' }}>
        <Logo />
        <div className="mono" style={{
          fontSize: 10, letterSpacing: '0.12em',
          color: 'var(--gold-light)', marginTop: 4, textTransform: 'uppercase'
        }}>
          Salon Paneli
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((it) => {
          const on = it.k === active;
          return (
            <a key={it.k} href="#" onClick={(e) => e.preventDefault()}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10,
              background: on ? 'var(--surface-3)' : 'transparent',
              color: on ? 'var(--text)' : 'var(--text-muted)',
              fontSize: 14, fontWeight: on ? 600 : 500,
              textDecoration: 'none',
              position: 'relative'
            }}>
              {on && <span style={{
                position: 'absolute', left: 0, top: 8, bottom: 8, width: 2,
                background: 'var(--gold-grad)', borderRadius: 2
              }} />}
              <Icon name={it.icon} size={17} />
              <span style={{ flex: 1 }}>{it.label}</span>
              {it.count != null &&
              <span className="badge gold" style={{ fontSize: 10 }}>{it.count}</span>
              }
            </a>);

        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* salon card at bottom */}
      <div style={{
        padding: 14, background: 'var(--surface-2)', borderRadius: 12,
        border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10
      }}>
        <span className="av" style={{ width: 36, height: 36, fontSize: 13 }}>EM</span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Emirhan K.</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>Üstad kuaför</div>
        </div>
        <Icon name="chev" size={14} color="var(--text-dim)" />
      </div>
    </aside>);

}

// ─────────────── Star rating ───────────────
function Stars({ value = 4.8, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon name="star" size={size} color="var(--gold-light)" />
      <span style={{ fontWeight: 600, fontSize: 13 }}>{value.toFixed(1)}</span>
    </span>);

}

// ─────────────── Photo placeholder ───────────────
function Photo({ label = 'foto', height = 160, radius, style }) {
  return (
    <div className="ph" style={{ height, borderRadius: radius, ...style }}>
      {label}
    </div>);

}

Object.assign(window, { Icon, Navbar, Logo, BarberSidebar, Stars, Photo });