// barber.jsx — Barber panel screens
// 7. Barber dashboard  8. Appointment detail (modal)  9. Schedule management

const TODAY_APPOINTMENTS = [
  { time: '09:00', dur: 30, customer: 'Ali Demir', service: 'Klasik Kesim', staff: 'EM', status: 'done', initials: 'AD', price: 350 },
  { time: '09:30', dur: 50, customer: 'Mert Yılmaz', service: 'Saç + Sakal Kombo', staff: 'EM', status: 'done', initials: 'MY', price: 500 },
  { time: '10:30', dur: 30, customer: 'Burak Aksoy', service: 'Sakal Tasarımı', staff: 'KA', status: 'done', initials: 'BA', price: 200 },
  { time: '11:00', dur: 40, customer: 'Cem Öztürk', service: 'Sıcak Havlu Tıraş', staff: 'EM', status: 'now', initials: 'CÖ', price: 400 },
  { time: '13:00', dur: 30, customer: 'Deniz K.', service: 'Klasik Kesim', staff: 'OZ', status: 'next', initials: 'DK', price: 350 },
  { time: '13:30', dur: 50, customer: 'Eren Ş.', service: 'Saç + Sakal Kombo', staff: 'EM', status: 'upcoming', initials: 'EŞ', price: 500 },
  { time: '14:30', dur: 25, customer: 'Furkan B.', service: 'Çocuk Kesimi', staff: 'KA', status: 'upcoming', initials: 'FB', price: 250 },
  { time: '15:30', dur: 35, customer: 'Gökhan T.', service: 'Yüz Bakımı', staff: 'EM', status: 'upcoming', initials: 'GT', price: 450 },
];

// ═══════════════════════════════════════════════════════════════
// 7. BARBER DASHBOARD — today's timeline
// ═══════════════════════════════════════════════════════════════
function BarberDashScreen() {
  return (
    <div className="clippr" style={{ display: 'flex' }}>
      <BarberSidebar active="appts" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* topbar */}
        <header style={{
          height: 64, padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)', flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: 22, lineHeight: 1.1 }}>Bugün</h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.05em', marginTop: 2 }}>
              ÇARŞAMBA · 6 MAYIS 2026
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ position: 'relative' }}>
              <input
                placeholder="Müşteri ara…"
                style={{
                  background: 'var(--surface-1)', border: '1px solid var(--line)',
                  borderRadius: 8, color: 'var(--text)', fontSize: 13,
                  padding: '9px 14px 9px 36px', width: 240, outline: 0, fontFamily: 'inherit',
                }}
              />
              <Icon name="search" size={14} color="var(--text-dim)" />
              <span style={{ position: 'absolute', left: 12, top: 11, pointerEvents: 'none' }}>
                <Icon name="search" size={14} color="var(--text-dim)" />
              </span>
            </div>
            <button style={iconBtn2}><Icon name="bell" size={17} /><span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 4, background: 'var(--gold-light)', boxShadow: '0 0 0 2px var(--bg)' }}/></button>
            <button className="btn-gold sm"><Icon name="plus" size={13} color="#1a1408"/> Yeni Randevu</button>
          </div>
        </header>

        <main className="scroll-y" style={{ flex: 1, padding: 32 }}>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
            <StatCard label="Bugün" value="8" sub="randevu" icon="cal" trend="+2" trendDir="up" />
            <StatCard label="Bu hafta" value="42" sub="randevu" icon="users" trend="+12%" trendDir="up" />
            <StatCard label="Tamamlanan" value="3 / 8" sub="bugün" icon="check" gold/>
            <StatCard label="Tahmini ciro" value="₺3.200" sub="bugün" icon="money" trend="+8%" trendDir="up"/>
          </div>

          {/* Timeline */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '20px 24px', borderBottom: '1px solid var(--line)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <h3 style={{ fontSize: 18 }}>Günlük Akış</h3>
                <span className="badge gold">8 randevu</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="chip active" style={{ fontSize: 12 }}>Tüm Ustalar</span>
                <span className="chip" style={{ fontSize: 12 }}>Emirhan</span>
                <span className="chip" style={{ fontSize: 12 }}>Kaan</span>
                <span className="chip" style={{ fontSize: 12 }}>Ozan</span>
              </div>
            </div>

            <Timeline />
          </div>
        </main>
      </div>
    </div>
  );
}

const iconBtn2 = {
  background: 'transparent', border: '1px solid var(--line)', borderRadius: 999,
  width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--text-muted)', position: 'relative',
};

function StatCard({ label, value, sub, icon, trend, trendDir, gold }) {
  return (
    <div className="card" style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
      {gold && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--gold-grad)' }}/>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
          {label}
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: gold ? 'var(--gold-soft)' : 'var(--surface-2)',
          color: gold ? 'var(--gold-light)' : 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={15} />
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, letterSpacing: '-0.03em' }}>{value}</div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{sub}</div>
      </div>
      {trend && (
        <div className="mono" style={{ fontSize: 11, color: trendDir === 'up' ? 'var(--status-ok)' : 'var(--status-bad)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="trend" size={12} /> {trend} <span style={{ color: 'var(--text-dim)', marginLeft: 4 }}>geçen haftadan</span>
        </div>
      )}
    </div>
  );
}

function Timeline() {
  const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const HOUR_H = 64;
  const startHour = 9;
  const NOW_MIN = (11 * 60) + 18 - (startHour * 60); // 11:18

  const colorFor = (status) => {
    if (status === 'done') return { bg: 'var(--surface-2)', border: 'var(--line)', text: 'var(--text-dim)' };
    if (status === 'now') return { bg: 'var(--gold-soft)', border: 'var(--gold)', text: 'var(--gold-light)' };
    if (status === 'next') return { bg: 'var(--surface-3)', border: 'var(--gold-dark)', text: 'var(--text)' };
    return { bg: 'var(--surface-3)', border: 'var(--line-strong)', text: 'var(--text)' };
  };

  return (
    <div style={{ position: 'relative', padding: '16px 24px 24px' }}>
      {/* hour grid */}
      <div style={{ position: 'relative', marginLeft: 64 }}>
        {hours.map((h, i) => (
          <div key={h} style={{
            position: 'absolute', left: 0, right: 0, top: i * HOUR_H,
            height: HOUR_H, borderTop: '1px solid var(--line)',
          }}/>
        ))}
        {hours.map((h, i) => (
          <div key={h} className="mono" style={{
            position: 'absolute', left: -54, top: i * HOUR_H - 6,
            fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.05em',
          }}>{String(h).padStart(2,'0')}:00</div>
        ))}

        {/* now line */}
        <div style={{
          position: 'absolute', left: -8, right: 0, top: NOW_MIN * (HOUR_H / 60),
          height: 2, background: 'var(--gold-grad)',
          boxShadow: '0 0 12px rgba(232,198,106,0.4)',
          zIndex: 5,
        }}>
          <span className="mono" style={{
            position: 'absolute', left: -54, top: -8,
            background: 'var(--gold-grad)', color: '#1a1408',
            fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
          }}>11:18</span>
        </div>

        {/* appointments */}
        <div style={{ position: 'relative', height: hours.length * HOUR_H, paddingLeft: 8 }}>
          {TODAY_APPOINTMENTS.map((a, i) => {
            const [h, m] = a.time.split(':').map(Number);
            const top = ((h - startHour) * 60 + m) * (HOUR_H / 60);
            const height = a.dur * (HOUR_H / 60);
            const c = colorFor(a.status);
            const col = a.staff === 'EM' ? 0 : a.staff === 'KA' ? 1 : 2;
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `calc(${col * 33.33}% + 4px)`,
                width: 'calc(33.33% - 8px)',
                top, height: height - 4,
                background: c.bg,
                border: '1px solid', borderColor: c.border,
                borderLeft: `3px solid ${a.status === 'now' ? '#e8c66a' : a.status === 'done' ? '#3a332b' : 'var(--gold-dark)'}`,
                borderRadius: 8, padding: '6px 10px',
                display: 'flex', flexDirection: 'column',
                fontSize: 12, color: c.text,
                opacity: a.status === 'done' ? 0.55 : 1,
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="mono" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>
                    {a.time} · {a.dur}DK
                  </span>
                  {a.status === 'now' && <span className="badge gold" style={{ fontSize: 9, padding: '2px 6px' }}>ŞİMDİ</span>}
                  {a.status === 'next' && <span className="badge info" style={{ fontSize: 9, padding: '2px 6px' }}>SIRADA</span>}
                </div>
                {height > 30 && (
                  <>
                    <div style={{ fontWeight: 600, color: a.status === 'done' ? 'var(--text-dim)' : 'var(--text)', fontSize: 12, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="av" style={{ width: 18, height: 18, fontSize: 8 }}>{a.initials}</span>
                      {a.customer}
                    </div>
                    {height > 50 && <div style={{ fontSize: 11, marginTop: 1, color: 'var(--text-dim)' }}>{a.service}</div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* staff legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 20, marginLeft: 64, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
        <span style={{ fontSize: 11, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>USTALAR:</span>
        {[['EM', 'Emirhan K.'], ['KA', 'Kaan D.'], ['OZ', 'Ozan B.']].map(([i, n]) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
            <span className="av" style={{ width: 18, height: 18, fontSize: 8 }}>{i}</span>{n}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 8. APPOINTMENT DETAIL (modal/side panel)
// ═══════════════════════════════════════════════════════════════
function ApptDetailScreen() {
  return (
    <div className="clippr" style={{ display: 'flex' }}>
      <BarberSidebar active="appts" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', minWidth: 0 }}>
        {/* dimmed dashboard underneath */}
        <div style={{ flex: 1, opacity: 0.45, filter: 'blur(2px)', pointerEvents: 'none' }}>
          <header style={{ height: 64, borderBottom: '1px solid var(--line)', padding: '0 32px', display: 'flex', alignItems: 'center' }}>
            <h2 style={{ fontSize: 22 }}>Bugün</h2>
          </header>
          <div style={{ padding: 32 }}>
            <div className="card" style={{ height: 600 }}/>
          </div>
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.5)', backdropFilter: 'blur(4px)' }}/>

        {/* detail panel */}
        <aside style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 460,
          background: 'var(--surface-1)',
          borderLeft: '1px solid var(--line-strong)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* header */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>RANDEVU #2841</div>
              <h2 style={{ fontSize: 20, marginTop: 4 }}>Cem Öztürk</h2>
            </div>
            <button style={{ ...iconBtnSm2, background: 'var(--surface-2)' }}><Icon name="close" size={16}/></button>
          </div>

          <div className="scroll-y" style={{ flex: 1, padding: '24px 28px' }}>
            {/* customer card */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: 'var(--surface-2)', borderRadius: 12, marginBottom: 20 }}>
              <span className="av" style={{ width: 56, height: 56, fontSize: 18 }}>CÖ</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>Cem Öztürk</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
                  +90 532 *** 47 21
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--gold-light)', letterSpacing: '0.06em' }}>SADIK MÜŞTERİ</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>14. ziyaret</div>
              </div>
            </div>

            <span className="badge gold" style={{ marginBottom: 12 }}>Şimdi · Devam ediyor</span>

            {/* service detail */}
            <div className="card" style={{ padding: 18, marginBottom: 16 }}>
              <DetailRow label="Hizmet" value="Sıcak Havlu Tıraşı"/>
              <DetailRow label="Tarih"  value="6 Mayıs Çarşamba"/>
              <DetailRow label="Saat"   value="11:00 — 11:40"/>
              <DetailRow label="Süre"   value="40 dakika"/>
              <DetailRow label="Usta"   value="Emirhan K."/>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 14, marginTop: 6, borderTop: '1px solid var(--line)' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Ücret</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold-light)' }}>₺400</span>
              </div>
            </div>

            {/* notes */}
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 8 }}>MÜŞTERİ NOTU</div>
            <div className="card" style={{ padding: 14, marginBottom: 20, background: 'var(--surface-2)' }}>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                "Sıcak havlu önce, sonra tıraş. Cilt hassas, alkollü losyon kullanmayalım lütfen."
              </p>
            </div>

            {/* history */}
            <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 8 }}>SON ZİYARETLER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
              {[
                ['22 Nis', 'Sıcak Havlu Tıraşı', '₺400'],
                ['8 Nis', 'Klasik Kesim + Sakal', '₺500'],
                ['25 Mar', 'Sakal Tasarımı', '₺200'],
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 8, fontSize: 12 }}>
                  <span className="mono" style={{ color: 'var(--text-dim)', width: 60 }}>{r[0].toUpperCase()}</span>
                  <span style={{ flex: 1, color: 'var(--text-muted)' }}>{r[1]}</span>
                  <span style={{ color: 'var(--gold-light)' }}>{r[2]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* actions */}
          <div style={{ padding: 20, borderTop: '1px solid var(--line)', display: 'flex', gap: 10 }}>
            <button className="btn-ghost" style={{ flex: 1 }}>İptal</button>
            <button className="btn-gold" style={{ flex: 2 }}>
              <Icon name="check" size={14} color="#1a1408"/> Tamamlandı
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

const iconBtnSm2 = {
  background: 'rgba(10,9,8,0.7)', border: '1px solid var(--line-strong)',
  borderRadius: 999, width: 36, height: 36,
  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
};

function DetailRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 9. SCHEDULE MANAGEMENT — weekly grid
// ═══════════════════════════════════════════════════════════════
function ScheduleScreen() {
  const days = ['Pzt 4', 'Sal 5', 'Çar 6', 'Per 7', 'Cum 8', 'Cmt 9', 'Paz 10'];
  const hours = [];
  for (let h = 9; h <= 20; h++) hours.push(h);

  // status grid: 'available' | 'blocked' | 'booked'
  // size: 7 days x 12 hours, 2 half-hour rows each = 24 rows
  const rng = (seed) => {
    let s = seed;
    return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  };
  const r = rng(7);
  const grid = days.map((_, di) => hours.flatMap(() => [0, 0]).map(() => {
    const x = r();
    if (x < 0.30) return 'booked';
    if (x < 0.42) return 'blocked';
    return 'available';
  }));
  // Sunday all closed
  grid[6] = grid[6].map(() => 'blocked');

  return (
    <div className="clippr" style={{ display: 'flex' }}>
      <BarberSidebar active="sched" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{
          height: 64, padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--line)', flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: 22, lineHeight: 1.1 }}>Takvim Yönetimi</h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2, letterSpacing: '0.05em' }}>
              4 — 10 MAYIS 2026 · 19. HAFTA
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', background: 'var(--surface-1)', borderRadius: 8, padding: 3, border: '1px solid var(--line)' }}>
              <button style={{ ...viewBtn2, background: 'transparent' }}>Gün</button>
              <button style={{ ...viewBtn2, background: 'var(--surface-3)' }}>Hafta</button>
              <button style={{ ...viewBtn2, background: 'transparent' }}>Ay</button>
            </div>
            <button style={iconBtn2}><Icon name="chevL" size={14}/></button>
            <button className="btn-ghost sm">Bugün</button>
            <button style={iconBtn2}><Icon name="chevR" size={14}/></button>
          </div>
        </header>

        <main className="scroll-y" style={{ flex: 1, padding: 32 }}>
          {/* legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ display: 'flex', gap: 18 }}>
              <Legend color="var(--surface-2)" border="var(--line)" label="Müsait"/>
              <Legend color="var(--surface-3)" border="var(--line-strong)" label="Bloklanmış"/>
              <Legend color="rgba(201,168,76,0.18)" border="var(--gold-dark)" label="Dolu" gold/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>Usta:</span>
              <select style={{
                background: 'var(--surface-1)', border: '1px solid var(--line)', borderRadius: 8,
                padding: '7px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit',
              }} defaultValue="EM">
                <option value="EM">Emirhan K.</option>
                <option value="KA">Kaan D.</option>
                <option value="OZ">Ozan B.</option>
              </select>
              <button className="btn-gold sm">
                <Icon name="block" size={13} color="#1a1408"/> Toplu Blokla
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {/* day header row */}
            <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)', borderBottom: '1px solid var(--line)' }}>
              <div/>
              {days.map((d, i) => {
                const today = i === 2;
                return (
                  <div key={d} style={{
                    padding: '14px 8px', textAlign: 'center',
                    borderLeft: '1px solid var(--line)',
                    background: today ? 'var(--gold-soft)' : 'transparent',
                  }}>
                    <div className="mono" style={{ fontSize: 10, color: today ? 'var(--gold-light)' : 'var(--text-dim)', letterSpacing: '0.05em' }}>
                      {d.split(' ')[0].toUpperCase()}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, color: today ? 'var(--gold-light)' : 'var(--text)' }}>
                      {d.split(' ')[1]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* hour rows */}
            <div style={{ position: 'relative' }}>
              {hours.map((h, hi) => (
                <div key={h} style={{
                  display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)',
                  borderBottom: hi < hours.length - 1 ? '1px solid var(--line)' : 0,
                  height: 56,
                }}>
                  <div className="mono" style={{
                    padding: '6px 10px', fontSize: 11, color: 'var(--text-dim)',
                    letterSpacing: '0.04em', display: 'flex', alignItems: 'flex-start',
                  }}>{String(h).padStart(2,'0')}:00</div>
                  {days.map((_, di) => {
                    const slotA = grid[di][hi * 2];
                    const slotB = grid[di][hi * 2 + 1];
                    return (
                      <div key={di} style={{
                        borderLeft: '1px solid var(--line)',
                        display: 'flex', flexDirection: 'column',
                      }}>
                        <ScheduleCell status={slotA}/>
                        <ScheduleCell status={slotB}/>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* footer info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 24 }}>
            <InfoCard label="Hafta toplam" value="42 / 84" sub="dolu / kapasite" pct={50}/>
            <InfoCard label="Bloklanmış slot" value="14" sub="bu hafta" />
            <InfoCard label="Doluluk oranı" value="68%" sub="ortalama 4 hafta" pct={68} gold/>
          </div>
        </main>
      </div>
    </div>
  );
}

const viewBtn2 = { background: 'transparent', border: 0, color: 'var(--text)', padding: '7px 14px', borderRadius: 6, fontSize: 12, fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' };

function ScheduleCell({ status }) {
  const styleMap = {
    available: { bg: 'transparent', text: '' },
    blocked:   { bg: 'var(--surface-3)', text: '' },
    booked:    { bg: 'rgba(201,168,76,0.18)', text: '' },
  };
  const s = styleMap[status];
  return (
    <div style={{
      flex: 1, background: s.bg, position: 'relative',
      borderTop: status === 'booked' ? '1px solid var(--gold-dark)' : (status === 'blocked' ? '1px solid var(--line-strong)' : 0),
      cursor: 'pointer',
      transition: 'filter .12s',
    }}>
      {status === 'blocked' && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0 5px, rgba(255,255,255,0.04) 5px 6px)`,
        }}/>
      )}
    </div>
  );
}

function Legend({ color, border, label, gold }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-muted)' }}>
      <span style={{ width: 16, height: 16, borderRadius: 4, background: color, border: `1px solid ${border}` }}/>
      {label}
    </span>
  );
}

function InfoCard({ label, value, sub, pct, gold }) {
  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: pct != null ? 12 : 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.02em', color: gold ? 'var(--gold-light)' : 'var(--text)' }}>
          {value}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>{sub}</div>
      </div>
      {pct != null && (
        <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: gold ? 'var(--gold-grad)' : 'var(--text-muted)' }}/>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  BarberDashScreen, ApptDetailScreen, ScheduleScreen,
});
