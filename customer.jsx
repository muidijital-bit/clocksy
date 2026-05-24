// customer.jsx — All 6 customer-side screens
// 1. Hero/landing  2. Listing  3. Profile  4. Booking flow  5. Dashboard
// (Navbar is its own component, screen 6.)

const SAMPLE_BUSINESSES = [
  { id: 1, name: 'Atelier 41', type: 'Premium kuaför', rating: 4.9, reviews: 412, dist: '0.4 km', price: '₺350–800', tags: ['Sakal', 'Saç'], cover: 'kapak · vintage barbershop', avatar: 'A4' },
  { id: 2, name: 'Tahta Barber Co.', type: 'Klasik kuaför', rating: 4.8, reviews: 287, dist: '0.7 km', price: '₺200–500', tags: ['Tıraş'], cover: 'ahşap interior', avatar: 'TB' },
  { id: 3, name: 'Kütahya Saç Tasarım', type: 'Kuaför', rating: 4.7, reviews: 526, dist: '1.1 km', price: '₺250–1200', tags: ['Boya', 'Kesim'], cover: 'modern salon', avatar: 'KS' },
  { id: 4, name: 'Çini Lounge', type: 'Premium Kuaför', rating: 4.9, reviews: 198, dist: '1.4 km', price: '₺400–1500', tags: ['Bakım'], cover: 'çini desenli salon', avatar: 'ÇL' },
  { id: 5, name: 'Beyaz Salon', type: 'Erkek Kuaförü', rating: 4.6, reviews: 312, dist: '1.8 km', price: '₺150–400', tags: ['Saç', 'Sakal'], cover: 'minimal', avatar: 'BS' },
  { id: 6, name: 'Germiyan Stüdyo', type: 'Kuaför', rating: 4.8, reviews: 245, dist: '2.2 km', price: '₺300–900', tags: ['Renk'], cover: 'studio shot', avatar: 'GS' },
];

// ═══════════════════════════════════════════════════════════════
// 1. HERO / LANDING
// ═══════════════════════════════════════════════════════════════
function HeroScreen() {
  return (
    <div className="clippr" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar active="home" />
      <main className="scroll-y" style={{ flex: 1 }}>
        {/* Hero */}
        <section style={{
          position: 'relative',
          minHeight: 620,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '80px 32px',
          overflow: 'hidden',
        }}>
          {/* Blurry barbershop collage backdrop */}
          <div className="hero-bg">
            <div className="hero-tile t1"/>
            <div className="hero-tile t2"/>
            <div className="hero-tile t3"/>
            <div className="hero-tile t4"/>
            <div className="hero-tile t5"/>
          </div>

          <div style={{ position: 'relative', maxWidth: 880, width: '100%', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 86, lineHeight: 0.95, fontWeight: 400,
              letterSpacing: '-0.04em', marginBottom: 24,
            }}>
              Şehrinin <em className="gold-grad-text" style={{ fontStyle: 'italic' }}>en iyi</em><br/>
              kuaförünü bul.
            </h1>
            <p style={{
              fontSize: 18, color: 'var(--text-muted)', maxWidth: 560,
              margin: '0 auto 40px', lineHeight: 1.5,
            }}>
              Kütahya'nın seçkin kuaför ve kuaförleri Clippr'da. Tek tıkla müsait saat,
              gerçek puanlar ve şeffaf fiyatlar.
            </p>

            {/* Search bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(24,22,19,0.08)',
              borderRadius: 999, padding: 6,
              maxWidth: 640, margin: '0 auto 20px',
              boxShadow: '0 20px 60px rgba(24,22,19,0.12), 0 1px 2px rgba(24,22,19,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderRight: '1px solid var(--line)', flex: '0 0 auto' }}>
                <Icon name="pin" size={16} color="var(--text)" />
                <span style={{ fontSize: 14, fontWeight: 500 }}>Kütahya</span>
                <Icon name="chev" size={13} color="var(--text-dim)" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, padding: '8px 14px' }}>
                <Icon name="search" size={16} color="var(--text-muted)" />
                <input
                  placeholder="kuaför, hizmet veya semt ara…"
                  defaultValue=""
                  style={{
                    background: 'transparent', border: 0, outline: 0,
                    color: 'var(--text)', fontSize: 14, flex: 1,
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <button className="btn-gold">
                Şehrini Seç ve Randevu Al
                <Icon name="arrowR" size={14} color="#fafaf7" />
              </button>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'center', gap: 28,
              fontSize: 12, color: 'var(--text-dim)',
              fontFamily: 'var(--font-mono)',
            }}>
              <span><span className="gold">240+</span> kuaför</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span><span className="gold">12.4K</span> randevu / ay</span>
              <span style={{ opacity: 0.4 }}>·</span>
              <span><span className="gold">4.8</span> ortalama puan</span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '120px 32px', background: 'var(--surface-1)', borderTop: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 72, gap: 48 }}>
              <div style={{ maxWidth: 560 }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ width: 24, height: 1, background: 'var(--text)' }}/>
                  Nasıl çalışır
                </div>
                <h2 style={{ fontSize: 56, lineHeight: 1, letterSpacing: '-0.035em', marginBottom: 18 }}>
                  Üç adımda <em style={{ fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>koltuğa</em> otur.
                </h2>
                <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.55, maxWidth: 460 }}>
                  Saat ayarlamak için telefona sarılma. Birkaç tıkla şehrindeki en iyi ustayı bul, müsait saati seç, tamam.
                </p>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'right' }}>
                Ortalama süre<br/>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--text)', letterSpacing: '-0.02em', textTransform: 'none', lineHeight: 1.1 }}>42 sn</span>
              </div>
            </div>

            {/* Step rail */}
            <div style={{ position: 'relative' }}>
              {/* connector line */}
              <div style={{
                position: 'absolute', top: 28, left: '8.33%', right: '8.33%',
                height: 1, background: 'var(--line-strong)',
                backgroundImage: 'repeating-linear-gradient(90deg, var(--line-strong) 0 6px, transparent 6px 12px)',
                backgroundColor: 'transparent',
              }}/>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, position: 'relative' }}>
                {/* STEP 01 — Şehrini seç */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--surface-1)', border: '1px solid var(--line-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', fontWeight: 600,
                    marginBottom: 28, position: 'relative', zIndex: 2,
                    boxShadow: '0 2px 8px rgba(24,22,19,0.04)',
                  }}>01</div>
                  <div className="card" style={{ padding: 0, width: '100%', overflow: 'hidden' }}>
                    {/* Mini map mockup */}
                    <div style={{
                      height: 160, position: 'relative',
                      background: 'linear-gradient(135deg, #f4f3ee 0%, #ebe9e2 100%)',
                      borderBottom: '1px solid var(--line)',
                    }}>
                      {/* faux roads */}
                      <svg width="100%" height="100%" viewBox="0 0 320 160" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                        <path d="M0 40 Q 80 50 160 70 T 320 90" stroke="#d3cfc2" strokeWidth="14" fill="none" opacity="0.6"/>
                        <path d="M0 40 Q 80 50 160 70 T 320 90" stroke="#fafaf7" strokeWidth="2" fill="none"/>
                        <path d="M60 0 Q 90 60 110 110 T 140 160" stroke="#d3cfc2" strokeWidth="10" fill="none" opacity="0.5"/>
                        <path d="M60 0 Q 90 60 110 110 T 140 160" stroke="#fafaf7" strokeWidth="1.5" fill="none"/>
                        <path d="M220 0 L 250 160" stroke="#d3cfc2" strokeWidth="8" fill="none" opacity="0.5"/>
                        <path d="M220 0 L 250 160" stroke="#fafaf7" strokeWidth="1.5" fill="none"/>
                      </svg>
                      {/* pins */}
                      <div style={{ position: 'absolute', left: 80, top: 48 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--text)', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(24,22,19,0.25)' }}/>
                      </div>
                      <div style={{ position: 'absolute', left: 178, top: 80, opacity: 0.55 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--text-muted)', border: '2px solid #fff' }}/>
                      </div>
                      <div style={{ position: 'absolute', left: 240, top: 110, opacity: 0.55 }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--text-muted)', border: '2px solid #fff' }}/>
                      </div>
                      <div style={{ position: 'absolute', left: 130, top: 30, opacity: 0.55 }}>
                        <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--text-muted)', border: '2px solid #fff' }}/>
                      </div>
                      {/* radius circle */}
                      <div style={{
                        position: 'absolute', left: 50, top: 18,
                        width: 88, height: 88, borderRadius: '50%',
                        border: '1px dashed rgba(24,22,19,0.25)',
                        background: 'rgba(24,22,19,0.04)',
                      }}/>
                      {/* search chip overlay */}
                      <div style={{
                        position: 'absolute', left: 14, top: 14,
                        background: '#fff', border: '1px solid var(--line)',
                        borderRadius: 999, padding: '6px 12px',
                        display: 'flex', alignItems: 'center', gap: 6,
                        fontSize: 11, fontWeight: 500, color: 'var(--text)',
                        boxShadow: '0 4px 12px rgba(24,22,19,0.08)',
                      }}>
                        <Icon name="pin" size={11} color="var(--text)"/> Kütahya, Merkez
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontSize: 22, marginBottom: 8, letterSpacing: '-0.02em' }}>Şehrini seç</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 14 }}>
                        Konumunu paylaş ya da semt ara. Yakındaki en iyi seçenekleri mesafeye göre sıralayalım.
                      </p>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                        ~10 sn
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 02 — Müsait saati bul */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--surface-1)', border: '1px solid var(--line-strong)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text)', fontWeight: 600,
                    marginBottom: 28, position: 'relative', zIndex: 2,
                    boxShadow: '0 2px 8px rgba(24,22,19,0.04)',
                  }}>02</div>
                  <div className="card" style={{ padding: 0, width: '100%', overflow: 'hidden' }}>
                    {/* Mini calendar mockup */}
                    <div style={{
                      height: 160, padding: '18px 18px 0',
                      background: '#fff', borderBottom: '1px solid var(--line)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pzt 14 Eki</span>
                        <span className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>›</span>
                      </div>
                      {/* day chips row */}
                      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                        {[
                          { d: '14', l: 'Pzt', on: true },
                          { d: '15', l: 'Sal' },
                          { d: '16', l: 'Çar' },
                          { d: '17', l: 'Per' },
                          { d: '18', l: 'Cum' },
                        ].map((x) => (
                          <div key={x.d} style={{
                            flex: 1, padding: '6px 0', borderRadius: 8,
                            textAlign: 'center',
                            background: x.on ? 'var(--text)' : 'var(--surface-2)',
                            color: x.on ? '#fff' : 'var(--text-muted)',
                          }}>
                            <div className="mono" style={{ fontSize: 8, opacity: 0.7, letterSpacing: '0.05em' }}>{x.l}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 1 }}>{x.d}</div>
                          </div>
                        ))}
                      </div>
                      {/* time slots */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
                        {[
                          { t: '09:30', av: false },
                          { t: '10:00', av: true },
                          { t: '10:30', av: true, sel: true },
                          { t: '11:00', av: false },
                          { t: '11:30', av: true },
                          { t: '13:00', av: true },
                          { t: '13:30', av: false },
                          { t: '14:00', av: true },
                        ].map((x, i) => (
                          <div key={i} style={{
                            padding: '5px 0', borderRadius: 6, textAlign: 'center',
                            fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 500,
                            border: x.sel ? '1px solid var(--text)' : '1px solid var(--line)',
                            background: x.sel ? 'var(--text)' : (x.av ? '#fff' : 'var(--surface-2)'),
                            color: x.sel ? '#fff' : (x.av ? 'var(--text)' : 'var(--text-dim)'),
                            textDecoration: x.av ? 'none' : 'line-through',
                            opacity: x.av ? 1 : 0.5,
                          }}>{x.t}</div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontSize: 22, marginBottom: 8, letterSpacing: '-0.02em' }}>Müsait saati bul</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 14 }}>
                        Usta, hizmet ve saat seç. Onaylanmış puanlar ve gerçek yorumlarla doğru kararı ver.
                      </p>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                        ~25 sn
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 03 — Koltuğa otur */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: 'var(--text)', border: '1px solid var(--text)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fafaf7', fontWeight: 600,
                    marginBottom: 28, position: 'relative', zIndex: 2,
                    boxShadow: '0 8px 20px rgba(24,22,19,0.18)',
                  }}>03</div>
                  <div className="card" style={{ padding: 0, width: '100%', overflow: 'hidden' }}>
                    {/* Confirmation ticket mockup */}
                    <div style={{
                      height: 160, padding: 18,
                      background: 'var(--text)', color: '#fafaf7',
                      borderBottom: '1px solid var(--line)',
                      position: 'relative', overflow: 'hidden',
                    }}>
                      {/* perforated edge */}
                      <div style={{
                        position: 'absolute', left: 0, right: 0, bottom: 26,
                        height: 1, borderTop: '1px dashed rgba(255,255,255,0.2)',
                      }}/>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                        <div>
                          <div className="mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 4 }}>Onaylandı</div>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.15 }}>
                            Mert Usta · Saç + Sakal
                          </div>
                        </div>
                        <div style={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: 'rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7l3 3 5-6" stroke="#fafaf7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 18, marginBottom: 14 }}>
                        <div>
                          <div className="mono" style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Tarih</div>
                          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>14 Eki</div>
                        </div>
                        <div>
                          <div className="mono" style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Saat</div>
                          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>10:30</div>
                        </div>
                        <div>
                          <div className="mono" style={{ fontSize: 9, opacity: 0.5, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Süre</div>
                          <div className="mono" style={{ fontSize: 12, fontWeight: 500 }}>45 dk</div>
                        </div>
                      </div>
                      {/* notification toast */}
                      <div style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 8, padding: '6px 10px',
                        display: 'flex', alignItems: 'center', gap: 8,
                        position: 'absolute', left: 18, right: 18, bottom: 8,
                      }}>
                        <Icon name="bell" size={11} color="#fafaf7"/>
                        <span style={{ fontSize: 10, opacity: 0.85 }}>SMS hatırlatma 1 saat önce</span>
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <h3 style={{ fontSize: 22, marginBottom: 8, letterSpacing: '-0.02em' }}>Koltuğa otur</h3>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 14 }}>
                        Onayını anında al. SMS ve uygulama bildirimiyle randevuna kadar her şey hatırlanır.
                      </p>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.06em' }}>
                        ~7 sn
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footnote / trust strip */}
            <div style={{
              marginTop: 56, paddingTop: 28, borderTop: '1px solid var(--line)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
              fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>
              <span>Ücretsiz iptal · randevudan 2 saat öncesine kadar</span>
              <span>iyzico güvencesi</span>
              <span>Onaylanmış 4.8 ★ ortalama</span>
            </div>
          </div>
        </section>

        {/* Featured cities */}
        <section style={{ padding: '80px 32px', borderTop: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
              <h2 style={{ fontSize: 36, letterSpacing: '-0.03em' }}>Öne çıkan şehirler</h2>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--gold-light)', fontSize: 14, textDecoration: 'none' }}>
                Tüm şehirler →
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { c: 'Kütahya', n: 24, badge: 'merkez' },
                { c: 'İstanbul', n: 142 },
                { c: 'Ankara', n: 98 },
                { c: 'İzmir', n: 76 },
              ].map((city) => (
                <div key={city.c} className="card hov" style={{ position: 'relative', height: 180, overflow: 'hidden', cursor: 'pointer' }}>
                  <div className="ph" style={{ position: 'absolute', inset: 0 }}>{city.c} fotoğrafı</div>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(10,9,8,0.85))',
                  }}/>
                  <div style={{ position: 'absolute', left: 16, right: 16, bottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ fontSize: 22, color: '#fff' }}>{city.c}</h3>
                      {city.badge && <span className="badge gold">{city.badge}</span>}
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                      {city.n} kuaför · {city.n * 18} randevu / ay
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 2. LISTING
// ═══════════════════════════════════════════════════════════════
function ListingScreen({ mapView = false }) {
  return (
    <div className="clippr" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar active="explore" />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar filters */}
        <aside style={{
          width: 280, flexShrink: 0,
          borderRight: '1px solid var(--line)',
          padding: '24px 24px 32px',
        }} className="scroll-y">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <h3 style={{ fontSize: 18 }}>Filtreler</h3>
            <button style={{ background: 'transparent', border: 0, color: 'var(--text-dim)', fontSize: 12, fontFamily: 'var(--font-mono)' }}>SIFIRLA</button>
          </div>

          <FilterGroup title="Mesafe">
            <RangeSlider value={45} unit="km" max="20 km" />
          </FilterGroup>

          <FilterGroup title="Puan">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[4.5, 4.0, 3.5, 3.0].map((v, i) => (
                <label key={v} style={fRow}>
                  <input type="checkbox" defaultChecked={i === 0} style={fCb}/>
                  <Stars value={v} /> <span style={{ color: 'var(--text-dim)', fontSize: 13 }}>ve üzeri</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Hizmet">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Saç kesimi', 'Sakal', 'Tıraş', 'Boya', 'Bakım', 'Yıkama'].map((s, i) => (
                <span key={s} className={`chip ${i < 2 ? 'active' : ''}`} style={{ fontSize: 12, padding: '5px 10px' }}>{s}</span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Fiyat aralığı">
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <PriceTier label="₺" active />
              <PriceTier label="₺₺" active />
              <PriceTier label="₺₺₺" />
              <PriceTier label="₺₺₺₺" />
            </div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
              ₺150 — ₺600 arası
            </div>
          </FilterGroup>

          <FilterGroup title="Müsaitlik" last>
            <label style={fRow}><input type="checkbox" defaultChecked style={fCb}/>Bugün müsait</label>
            <label style={fRow}><input type="checkbox" style={fCb}/>Yarın müsait</label>
            <label style={fRow}><input type="checkbox" style={fCb}/>Hafta sonu</label>
          </FilterGroup>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '20px 32px', borderBottom: '1px solid var(--line)',
          }}>
            <div>
              <h2 style={{ fontSize: 22 }}>Kütahya, Merkez</h2>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
                24 SONUÇ · ORTALAMA 4.8 ★
              </div>
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="chip active">En Yakın</span>
              <span className="chip">En Yüksek Puan</span>
              <span className="chip">Müsait</span>
              <span className="chip">Ekonomik</span>
            </div>
            <div style={{ width: 1, height: 24, background: 'var(--line)' }}/>
            <div style={{ display: 'flex', background: 'var(--surface-1)', borderRadius: 8, padding: 3, border: '1px solid var(--line)' }}>
              <button style={{ ...viewBtn, background: !mapView ? 'var(--surface-3)' : 'transparent' }}>
                <Icon name="grid" size={15} />
              </button>
              <button style={{ ...viewBtn, background: mapView ? 'var(--surface-3)' : 'transparent' }}>
                <Icon name="map" size={15} />
              </button>
            </div>
          </div>

          {/* Content area */}
          {mapView ? <ListingMap /> : <ListingGrid />}
        </div>
      </div>
    </div>
  );
}

const fRow = { display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', padding: '4px 0' };
const fCb = { accentColor: '#c9a84c', width: 14, height: 14 };
const viewBtn = { background: 'transparent', border: 0, color: 'var(--text)', padding: '7px 12px', borderRadius: 6, display: 'flex', alignItems: 'center' };

function FilterGroup({ title, children, last }) {
  return (
    <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: last ? 0 : '1px solid var(--line)' }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--text-dim)', marginBottom: 12,
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function RangeSlider({ value = 50, unit }) {
  return (
    <div>
      <div style={{ position: 'relative', height: 4, background: 'var(--surface-3)', borderRadius: 4, marginBottom: 10 }}>
        <div style={{ position: 'absolute', left: 0, width: `${value}%`, height: '100%', background: 'var(--gold-grad)', borderRadius: 4 }}/>
        <div style={{ position: 'absolute', left: `calc(${value}% - 8px)`, top: -6, width: 16, height: 16, background: 'var(--gold-light)', borderRadius: 999, boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }}/>
      </div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between' }}>
        <span>0 km</span><span style={{ color: 'var(--gold-light)' }}>9 {unit}</span>
      </div>
    </div>
  );
}

function PriceTier({ label, active }) {
  return (
    <button style={{
      flex: 1, padding: '8px 0', borderRadius: 6,
      border: '1px solid', borderColor: active ? 'var(--gold-dark)' : 'var(--line)',
      background: active ? 'var(--gold-soft)' : 'transparent',
      color: active ? 'var(--gold-light)' : 'var(--text-muted)',
      fontFamily: 'var(--font-mono)', fontSize: 12,
    }}>
      {label}
    </button>
  );
}

function ListingGrid() {
  return (
    <div className="scroll-y" style={{ flex: 1, padding: '24px 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {SAMPLE_BUSINESSES.map((b) => <BizCard key={b.id} biz={b} />)}
        {/* Skeleton card */}
        <SkeletonCard />
      </div>
    </div>
  );
}

function ListingMap() {
  return (
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      <div className="scroll-y" style={{ width: '50%', borderRight: '1px solid var(--line)', padding: '20px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {SAMPLE_BUSINESSES.slice(0, 4).map((b) => <BizCardCompact key={b.id} biz={b} />)}
        </div>
      </div>
      <div style={{ flex: 1, position: 'relative', background: 'var(--surface-1)' }}>
        <MapMock />
      </div>
    </div>
  );
}

function BizCard({ biz }) {
  return (
    <div className="card hov">
      <div style={{ position: 'relative' }}>
        <Photo label={biz.cover} height={180} radius={0} />
        <button style={{
          position: 'absolute', top: 12, right: 12,
          width: 34, height: 34, borderRadius: 999,
          background: 'rgba(10,9,8,0.7)', border: '1px solid var(--line-strong)',
          color: 'var(--text-muted)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(6px)',
        }}>
          <Icon name="heart" size={15} />
        </button>
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span className="badge gold">Müsait bugün</span>
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 6 }}>
          <h3 style={{ fontSize: 18 }}>{biz.name}</h3>
          <Stars value={biz.rating} />
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 14, letterSpacing: '0.05em' }}>
          {biz.type.toUpperCase()} · {biz.dist} · {biz.reviews} DEĞ.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, color: 'var(--text)' }}>{biz.price}</div>
          <button className="btn-gold sm">Randevu Al</button>
        </div>
      </div>
    </div>
  );
}

function BizCardCompact({ biz }) {
  return (
    <div className="card hov" style={{ display: 'flex', gap: 14, padding: 12 }}>
      <div className="ph" style={{ width: 100, height: 100, borderRadius: 10, fontSize: 9 }}>{biz.cover}</div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
            <h3 style={{ fontSize: 16 }}>{biz.name}</h3>
            <Stars value={biz.rating} />
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>
            {biz.type.toUpperCase()} · {biz.dist}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{biz.price}</span>
          <button className="btn-gold sm" style={{ padding: '6px 10px', fontSize: 11 }}>Randevu</button>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="skel" style={{ height: 180, borderRadius: 0 }}/>
      <div style={{ padding: 18 }}>
        <div className="skel" style={{ height: 18, width: '70%', marginBottom: 10 }}/>
        <div className="skel" style={{ height: 12, width: '50%', marginBottom: 18 }}/>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="skel" style={{ height: 14, width: 80 }}/>
          <div className="skel" style={{ height: 30, width: 100, borderRadius: 8 }}/>
        </div>
      </div>
    </div>
  );
}

function MapMock() {
  // mock map: dotted grid + pins
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          radial-gradient(circle, rgba(201,168,76,0.08) 1px, transparent 1px),
          linear-gradient(135deg, #161310, #0d0a08)
        `,
        backgroundSize: '24px 24px, 100% 100%',
      }}/>
      {/* "roads" */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <path d="M0 200 Q200 180 400 220 T800 200" stroke="#3a332b" strokeWidth="2" fill="none"/>
        <path d="M150 0 L180 600" stroke="#3a332b" strokeWidth="2" fill="none"/>
        <path d="M0 400 L800 380" stroke="#3a332b" strokeWidth="1.5" fill="none"/>
        <path d="M500 0 L520 600" stroke="#3a332b" strokeWidth="1.5" fill="none"/>
      </svg>
      {/* pins */}
      {[
        { l: 30, t: 35, label: 'A4', active: true },
        { l: 55, t: 50, label: 'TB' },
        { l: 70, t: 30, label: 'KS' },
        { l: 45, t: 75, label: 'ÇL' },
        { l: 25, t: 60, label: 'BS' },
      ].map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: `${p.l}%`, top: `${p.t}%`, transform: 'translate(-50%, -100%)' }}>
          <div style={{
            background: p.active ? 'var(--gold-grad)' : 'var(--surface-2)',
            color: p.active ? '#1a1408' : 'var(--gold-light)',
            border: '1.5px solid', borderColor: p.active ? 'transparent' : 'var(--gold-dark)',
            padding: '5px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
            boxShadow: p.active ? '0 4px 16px rgba(201,168,76,0.4)' : '0 2px 6px rgba(0,0,0,0.4)',
            whiteSpace: 'nowrap',
          }}>{p.label}</div>
          <div style={{ width: 2, height: 8, background: p.active ? 'var(--gold)' : 'var(--gold-dark)', margin: '0 auto' }}/>
        </div>
      ))}
      <div style={{
        position: 'absolute', bottom: 16, right: 16,
        background: 'var(--surface-1)', border: '1px solid var(--line)',
        borderRadius: 8, padding: 4,
        display: 'flex', flexDirection: 'column',
      }}>
        <button style={mapZoomBtn}><Icon name="plus" size={14}/></button>
        <div style={{ height: 1, background: 'var(--line)' }}/>
        <button style={mapZoomBtn}><span style={{ fontSize: 16, lineHeight: 1 }}>−</span></button>
      </div>
    </div>
  );
}
const mapZoomBtn = { background: 'transparent', border: 0, color: 'var(--text)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' };

// ═══════════════════════════════════════════════════════════════
// 3. BUSINESS PROFILE
// ═══════════════════════════════════════════════════════════════
function ProfileScreen() {
  const services = [
    { n: 'Klasik Saç Kesimi', d: '30 dk', p: '₺350' },
    { n: 'Sakal Tasarımı', d: '20 dk', p: '₺200' },
    { n: 'Saç + Sakal Kombo', d: '50 dk', p: '₺500', tag: 'Popüler' },
    { n: 'Sıcak Havlu Tıraşı', d: '40 dk', p: '₺400' },
    { n: 'Çocuk Kesimi', d: '25 dk', p: '₺250' },
    { n: 'Yüz Bakımı', d: '35 dk', p: '₺450' },
  ];

  return (
    <div className="clippr" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar active="explore" />
      <main className="scroll-y" style={{ flex: 1 }}>
        {/* Cover */}
        <div style={{ position: 'relative', height: 320 }}>
          <div className="ph" style={{ height: '100%', borderRadius: 0, fontSize: 12 }}>
            atelier 41 · vintage barbershop kapak fotoğrafı
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,9,8,0.2), var(--bg))' }}/>
          <div style={{
            position: 'absolute', left: 32, bottom: -48,
            display: 'flex', alignItems: 'flex-end', gap: 18,
          }}>
            <div className="av" style={{ width: 96, height: 96, borderRadius: 18, fontSize: 28, border: '3px solid var(--bg)' }}>A4</div>
          </div>
          <div style={{ position: 'absolute', right: 32, top: 20, display: 'flex', gap: 8 }}>
            <button style={iconBtnSm}><Icon name="heart" size={15}/></button>
            <button style={iconBtnSm}><Icon name="bookmark" size={15}/></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, padding: '64px 32px 32px' }}>
          {/* Left column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 42, letterSpacing: '-0.03em' }}>Atelier 41</h1>
              <span className="badge gold">Doğrulanmış</span>
              <span className="badge ok">Bugün açık</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
              <Stars value={4.9} /> <span style={{ color: 'var(--text-dim)' }}>(412 değerlendirme)</span>
              <span style={{ color: 'var(--text-dim)' }}>·</span>
              <span><Icon name="pin" size={13}/> Cumhuriyet Cd. 41, Merkez · 0.4 km</span>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              <span className="chip active">Premium kuaför</span>
              <span className="chip">Klasik Tıraş</span>
              <span className="chip">Sakal</span>
              <span className="chip">Erkek</span>
            </div>

            {/* Working hours */}
            <Section title="Çalışma Saatleri">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 32px' }}>
                {[
                  ['Pazartesi', '09:00 — 21:00'], ['Salı', '09:00 — 21:00'],
                  ['Çarşamba', '09:00 — 21:00'], ['Perşembe', '09:00 — 21:00'],
                  ['Cuma', '09:00 — 22:00', true], ['Cumartesi', '10:00 — 22:00'],
                  ['Pazar', 'Kapalı', false, true],
                ].map(([day, h, today, closed], i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '6px 0',
                    borderTop: i > 1 ? '1px solid var(--line)' : 0,
                  }}>
                    <span style={{ fontSize: 14, color: today ? 'var(--gold-light)' : 'var(--text-muted)', fontWeight: today ? 600 : 400 }}>
                      {day}{today && ' (bugün)'}
                    </span>
                    <span className="mono" style={{ fontSize: 13, color: closed ? 'var(--status-bad)' : 'var(--text)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Services */}
            <Section title="Hizmetler & Fiyatlar">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {services.map((s, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 0',
                    borderTop: i > 0 ? '1px solid var(--line)' : 0,
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 500 }}>{s.n}</span>
                        {s.tag && <span className="badge gold" style={{ fontSize: 10 }}>{s.tag}</span>}
                      </div>
                      <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>{s.d.toUpperCase()}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)' }}>{s.p}</span>
                      <button className="btn-ghost sm">Seç</button>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Gallery — masonry */}
            <Section title="Galeri">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                <Photo label="iç mekan" height={180} radius={10} style={{ gridRow: 'span 2', height: 'auto' }}/>
                <Photo label="kuaför" height={120} radius={10}/>
                <Photo label="kesim" height={120} radius={10}/>
                <Photo label="bekleme" height={120} radius={10}/>
                <Photo label="alet" height={140} radius={10}/>
                <Photo label="vitrin" height={140} radius={10}/>
                <Photo label="detay" height={140} radius={10}/>
              </div>
            </Section>
          </div>

          {/* Right column — booking widget */}
          <div style={{ position: 'relative' }}>
            <div className="card" style={{ position: 'sticky', top: 16, padding: 20 }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--gold-light)', textTransform: 'uppercase', marginBottom: 6 }}>
                Hızlı randevu
              </div>
              <h3 style={{ fontSize: 22, marginBottom: 16 }}>Müsait saatler</h3>

              {/* staff */}
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 10 }}>USTA</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                {[
                  { i: 'EM', n: 'Emir', a: true }, { i: 'KA', n: 'Kaan' }, { i: 'OZ', n: 'Ozan' }, { i: '?', n: 'Farketmez' },
                ].map((s) => (
                  <button key={s.i} style={{
                    flex: 1, background: s.a ? 'var(--surface-3)' : 'var(--surface-2)',
                    border: '1px solid', borderColor: s.a ? 'var(--gold-dark)' : 'var(--line)',
                    borderRadius: 10, padding: '10px 4px',
                    color: s.a ? 'var(--text)' : 'var(--text-muted)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  }}>
                    <span className="av" style={{ width: 28, height: 28, fontSize: 11, background: s.a ? 'var(--gold-grad)' : undefined, color: s.a ? '#1a1408' : undefined }}>{s.i}</span>
                    <span style={{ fontSize: 11 }}>{s.n}</span>
                  </button>
                ))}
              </div>

              {/* date */}
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 10 }}>TARİH</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
                {[
                  { d: 'Bug', n: 6, a: true }, { d: 'Per', n: 7 }, { d: 'Cum', n: 8 }, { d: 'Cmt', n: 9 }, { d: 'Paz', n: 10, off: true },
                ].map((d, i) => (
                  <button key={i} style={{
                    flex: 1, padding: '10px 0', borderRadius: 8,
                    background: d.a ? 'var(--gold-grad)' : 'var(--surface-2)',
                    color: d.a ? '#1a1408' : (d.off ? 'var(--text-dim)' : 'var(--text-muted)'),
                    border: '1px solid', borderColor: d.a ? 'transparent' : 'var(--line)',
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center',
                    opacity: d.off ? 0.5 : 1,
                  }}>
                    <span style={{ letterSpacing: '0.06em' }}>{d.d.toUpperCase()}</span>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>{d.n}</span>
                  </button>
                ))}
              </div>

              {/* time slots */}
              <div className="mono" style={{ fontSize: 10, letterSpacing: '0.08em', color: 'var(--text-dim)', marginBottom: 10 }}>SAAT</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 20 }}>
                {['10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:30','16:00','17:00','17:30'].map((t, i) => (
                  <button key={t} style={{
                    padding: '10px 0', borderRadius: 8,
                    background: i === 5 ? 'var(--gold-soft)' : (i % 5 === 4 ? 'transparent' : 'var(--surface-2)'),
                    color: i === 5 ? 'var(--gold-light)' : (i % 5 === 4 ? 'var(--text-dim)' : 'var(--text-muted)'),
                    border: '1px solid', borderColor: i === 5 ? 'var(--gold)' : 'var(--line)',
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: i === 5 ? 700 : 500,
                    opacity: i % 5 === 4 ? 0.4 : 1,
                    textDecoration: i % 5 === 4 ? 'line-through' : 'none',
                  }}>{t}</button>
                ))}
              </div>

              <button className="btn-gold lg" style={{ width: '100%' }}>
                Randevu Al · ₺350
              </button>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', textAlign: 'center', marginTop: 10, letterSpacing: '0.06em' }}>
                ANINDA ONAY · ÜCRETSİZ İPTAL 2 SA. ÖNCESİNE KADAR
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const iconBtnSm = {
  background: 'rgba(10,9,8,0.7)', backdropFilter: 'blur(6px)',
  border: '1px solid var(--line-strong)', borderRadius: 999,
  width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--text)',
};

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontSize: 22, marginBottom: 16, letterSpacing: '-0.02em' }}>{title}</h2>
      {children}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// 4. BOOKING FLOW (right side panel)
// ═══════════════════════════════════════════════════════════════
function BookingScreen({ step = 2 }) {
  return (
    <div className="clippr" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar active="explore" />
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        {/* Backdrop / dimmed page underneath */}
        <div style={{ flex: 1, background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ filter: 'blur(2px)', opacity: 0.4, pointerEvents: 'none' }}>
            <div style={{ height: 320 }} className="ph">atelier 41 kapak</div>
            <div style={{ padding: '56px 32px' }}>
              <h1 style={{ fontSize: 42 }}>Atelier 41</h1>
              <div style={{ height: 200, background: 'var(--surface-1)', borderRadius: 12, marginTop: 16 }}/>
            </div>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.55)', backdropFilter: 'blur(6px)' }}/>
        </div>

        {/* Side panel */}
        <aside style={{
          width: 480, flexShrink: 0,
          background: 'var(--surface-1)',
          borderLeft: '1px solid var(--line-strong)',
          boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* header w/ steps */}
          <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.1em' }}>ATELIER 41 — RANDEVU</div>
                <h2 style={{ fontSize: 22, marginTop: 2 }}>Saç + Sakal Kombo</h2>
              </div>
              <button style={{ ...iconBtnSm, background: 'var(--surface-2)' }}>
                <Icon name="close" size={16}/>
              </button>
            </div>

            <div className="steps">
              <span className={`step ${step > 1 ? 'done' : (step === 1 ? 'active' : '')}`}>
                <span className="dot">{step > 1 ? <Icon name="check" size={11}/> : '1'}</span>Usta
              </span>
              <span className="sep"/>
              <span className={`step ${step > 2 ? 'done' : (step === 2 ? 'active' : '')}`}>
                <span className="dot">{step > 2 ? <Icon name="check" size={11}/> : '2'}</span>Tarih
              </span>
              <span className="sep"/>
              <span className={`step ${step === 3 ? 'active' : ''}`}>
                <span className="dot">3</span>Onay
              </span>
            </div>
          </div>

          {/* body */}
          <div className="scroll-y" style={{ flex: 1, padding: '24px 28px' }}>
            {step === 1 && <BookingStep1 />}
            {step === 2 && <BookingStep2 />}
            {step === 3 && <BookingStep3 />}
          </div>

          {/* footer */}
          <div style={{ padding: '16px 28px', borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>TOPLAM</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold-light)' }}>₺500</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-ghost">Geri</button>
              <button className="btn-gold">
                {step === 3 ? 'Onayla' : 'Devam Et'}
                <Icon name="arrowR" size={13} color="#1a1408" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BookingStep1() {
  const staff = [
    { i: 'EM', n: 'Emirhan K.', t: 'Üstad kuaför', y: '8 yıl', r: 4.9, a: true },
    { i: 'KA', n: 'Kaan D.', t: 'Üst kuaför', y: '5 yıl', r: 4.8 },
    { i: 'OZ', n: 'Ozan B.', t: 'Junior kuaför', y: '2 yıl', r: 4.7 },
    { i: '?', n: 'Farketmez', t: 'En erken müsait', y: '', r: null, any: true },
  ];
  return (
    <>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 14 }}>USTA SEÇ</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {staff.map((s, i) => (
          <button key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: 14, borderRadius: 12,
            background: s.a ? 'var(--surface-3)' : 'var(--surface-2)',
            border: '1px solid', borderColor: s.a ? 'var(--gold)' : 'var(--line)',
            textAlign: 'left',
          }}>
            <span className="av" style={{ width: 48, height: 48, fontSize: 16 }}>{s.i}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 2 }}>
                {s.t.toUpperCase()}{s.y && ` · ${s.y}`}
              </div>
            </div>
            {s.r && <Stars value={s.r} />}
            {s.any && <Icon name="sparkle" size={16} color="var(--gold-light)"/>}
          </button>
        ))}
      </div>
    </>
  );
}

function BookingStep2() {
  return (
    <>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 14 }}>TARİH SEÇ</div>
      <Calendar />
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginTop: 24, marginBottom: 14 }}>MÜSAİT SAAT — 8 MAYIS CUMA</div>
      <div>
        {[
          { label: 'Sabah', times: ['10:00','10:30','11:00','11:30'] },
          { label: 'Öğleden sonra', times: ['13:00','13:30','14:00','14:30','15:00'] },
          { label: 'Akşam', times: ['17:00','17:30','18:00','19:00','19:30','20:00'] },
        ].map((g) => (
          <div key={g.label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{g.label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {g.times.map((t, i) => (
                <button key={t} style={{
                  padding: '8px 14px', borderRadius: 999,
                  background: t === '14:00' ? 'var(--gold-soft)' : 'var(--surface-2)',
                  color: t === '14:00' ? 'var(--gold-light)' : 'var(--text-muted)',
                  border: '1px solid', borderColor: t === '14:00' ? 'var(--gold)' : 'var(--line)',
                  fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: t === '14:00' ? 700 : 500,
                }}>{t}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Calendar() {
  // mini month calendar
  const days = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pa'];
  const cells = [];
  for (let i = -2; i <= 32; i++) cells.push(i);
  const today = 6;
  const selected = 8;
  const blocked = [10, 18, 25];
  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <button style={cBtn}><Icon name="chevL" size={14}/></button>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Mayıs 2026</div>
        <button style={cBtn}><Icon name="chevR" size={14}/></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((d) => (
          <div key={d} className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-dim)', padding: 4, letterSpacing: '0.05em' }}>{d.toUpperCase()}</div>
        ))}
        {cells.map((d, i) => {
          const empty = d < 1 || d > 31;
          const isToday = d === today;
          const isSel = d === selected;
          const isBlocked = blocked.includes(d);
          return (
            <button key={i} disabled={empty || isBlocked} style={{
              aspectRatio: '1', padding: 0, borderRadius: 8,
              background: isSel ? 'var(--gold-grad)' : (isToday ? 'var(--surface-3)' : 'transparent'),
              color: isSel ? '#1a1408' : (empty || isBlocked ? 'var(--text-dim)' : 'var(--text)'),
              border: '1px solid', borderColor: isToday && !isSel ? 'var(--gold-dark)' : 'transparent',
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: isSel ? 700 : 500,
              opacity: empty ? 0 : (isBlocked ? 0.3 : 1),
              textDecoration: isBlocked ? 'line-through' : 'none',
            }}>{empty ? '' : d}</button>
          );
        })}
      </div>
    </div>
  );
}
const cBtn = { background: 'transparent', border: '1px solid var(--line)', borderRadius: 8, color: 'var(--text)', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' };

function BookingStep3() {
  return (
    <>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 14 }}>RANDEVU ÖZETİ</div>

      {/* summary card */}
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
          <div className="ph" style={{ width: 56, height: 56, borderRadius: 10, fontSize: 9 }}>logo</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Atelier 41</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>CUMHURİYET CD. 41, KÜTAHYA</div>
          </div>
        </div>
        <SumRow label="Hizmet" value="Saç + Sakal Kombo"/>
        <SumRow label="Usta" value="Emirhan K."/>
        <SumRow label="Tarih" value="8 Mayıs Cuma · 14:00"/>
        <SumRow label="Süre" value="50 dk"/>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 4px', borderTop: '1px solid var(--line)', marginTop: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Toplam</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold-light)' }}>₺500</span>
        </div>
      </div>

      {/* notes */}
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-dim)', marginBottom: 8 }}>USTAYA NOT (OPSİYONEL)</div>
      <textarea
        placeholder="Saç uzunluğu tercihi, alerjiler, vb."
        defaultValue="Yanları kısa, üst doğal kalsın."
        style={{
          width: '100%', minHeight: 80, padding: 12,
          background: 'var(--surface-2)', border: '1px solid var(--line)',
          borderRadius: 10, color: 'var(--text)',
          fontFamily: 'inherit', fontSize: 13, resize: 'none', outline: 0,
        }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 14, marginTop: 16, background: 'var(--gold-soft)', borderRadius: 10, border: '1px solid var(--gold-dark)' }}>
        <Icon name="info" size={15} color="var(--gold-light)"/>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Ücretsiz iptal: 8 Mayıs 12:00'a kadar. Sonrası %50 ücret yansır.
        </div>
      </div>
    </>
  );
}

function SumRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ color: 'var(--text)', fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// 5. CUSTOMER DASHBOARD
// ═══════════════════════════════════════════════════════════════
function DashboardScreen() {
  return (
    <div className="clippr" style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar active="appts" />
      <main className="scroll-y" style={{ flex: 1, padding: '32px 32px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--gold-light)', textTransform: 'uppercase', marginBottom: 6 }}>Hoş geldin</div>
            <h1 style={{ fontSize: 42, letterSpacing: '-0.03em' }}>Mert <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Yılmaz</span></h1>
          </div>

          {/* upcoming banner */}
          <div className="card" style={{
            position: 'relative', overflow: 'hidden',
            padding: 28, marginBottom: 32,
            background: 'linear-gradient(135deg, var(--surface-2), var(--surface-1))',
            border: '1px solid var(--gold-dark)',
          }}>
            <div style={{
              position: 'absolute', top: -100, right: -80, width: 320, height: 320,
              background: 'radial-gradient(circle, rgba(201,168,76,0.18), transparent 70%)',
              pointerEvents: 'none',
            }}/>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div className="mono" style={{
                writingMode: 'vertical-rl', transform: 'rotate(180deg)',
                fontSize: 11, letterSpacing: '0.2em', color: 'var(--gold-light)',
                textTransform: 'uppercase', borderLeft: '1px solid var(--gold-dark)', paddingLeft: 4,
              }}>
                Yaklaşan Randevun
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
                  <h2 style={{ fontSize: 28 }}>Atelier 41</h2>
                  <span className="badge gold">2 saat sonra</span>
                </div>
                <div style={{ display: 'flex', gap: 28, color: 'var(--text-muted)', fontSize: 14 }}>
                  <span><Icon name="cal" size={14}/> 6 Mayıs · 14:00</span>
                  <span><Icon name="scissors" size={14}/> Saç + Sakal Kombo</span>
                  <span><Icon name="user" size={14}/> Emirhan K.</span>
                  <span><Icon name="pin" size={14}/> 0.4 km</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn-ghost"><Icon name="phone" size={14}/> Ara</button>
                <button className="btn-ghost">Yol Tarifi</button>
                <button className="btn-gold">Detay</button>
              </div>
            </div>
          </div>

          {/* main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28 }}>
            {/* appointments */}
            <div>
              {/* tabs */}
              <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--line)', marginBottom: 20 }}>
                {[
                  { k: 'active', label: 'Aktif', n: 2, on: true },
                  { k: 'past', label: 'Geçmiş', n: 14 },
                  { k: 'cancel', label: 'İptal Edilenler', n: 1 },
                ].map((t) => (
                  <button key={t.k} style={{
                    background: 'transparent', border: 0, padding: '12px 20px',
                    color: t.on ? 'var(--text)' : 'var(--text-muted)',
                    fontSize: 14, fontWeight: t.on ? 600 : 500,
                    position: 'relative', display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    {t.label}
                    <span className="badge dim" style={{ fontSize: 10 }}>{t.n}</span>
                    {t.on && <span style={{
                      position: 'absolute', left: 12, right: 12, bottom: -1, height: 2,
                      background: 'var(--gold-grad)',
                    }}/>}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <ApptCard
                  status="confirmed" date="6 Mayıs Çarşamba" time="14:00"
                  biz="Atelier 41" service="Saç + Sakal Kombo · Emirhan K." price="₺500"
                />
                <ApptCard
                  status="pending" date="13 Mayıs Çarşamba" time="11:00"
                  biz="Çini Lounge" service="Klasik Saç Kesimi · Mehmet Y." price="₺350"
                />
                <ApptCard
                  status="canceled" date="29 Nisan Pazartesi" time="16:30"
                  biz="Kütahya Saç Tasarım" service="Sakal Tasarımı · Hasan T." price="₺200" past
                />
                <EmptyState />
              </div>
            </div>

            {/* favorites */}
            <aside>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontSize: 18 }}>Favori kuaförler</h3>
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--gold-light)', fontSize: 12, textDecoration: 'none' }}>Tümü →</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {SAMPLE_BUSINESSES.slice(0, 4).map((b) => (
                  <div key={b.id} className="card hov" style={{ padding: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div className="ph" style={{ width: 48, height: 48, borderRadius: 10, fontSize: 8, flexShrink: 0 }}>{b.avatar}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>
                        ★ {b.rating} · {b.dist}
                      </div>
                    </div>
                    <Icon name="chevR" size={14} color="var(--text-dim)"/>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 24, padding: 18, background: 'var(--surface-1)',
                border: '1px solid var(--line)', borderRadius: 14,
              }}>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'var(--gold-light)', marginBottom: 8 }}>İSTATİSTİK</div>
                <h4 style={{ fontSize: 16, marginBottom: 14 }}>Bu yıl</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Tamamlanan</span>
                  <span className="mono" style={{ color: 'var(--text)' }}>14</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Toplam harcanan</span>
                  <span className="mono" style={{ color: 'var(--gold-light)' }}>₺4.350</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Favori usta</span>
                  <span style={{ fontSize: 12, color: 'var(--text)' }}>Emirhan K.</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

function ApptCard({ status, date, time, biz, service, price, past }) {
  const sMap = {
    confirmed: { cls: 'ok', text: 'Onaylandı' },
    pending:   { cls: 'warn', text: 'Bekliyor' },
    canceled:  { cls: 'bad', text: 'İptal' },
  };
  const s = sMap[status];
  return (
    <div className="card" style={{ padding: 18, opacity: past ? 0.55 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        {/* date block */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '10px 14px', background: 'var(--surface-2)', borderRadius: 10,
          minWidth: 78, border: '1px solid var(--line)',
        }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--gold-light)', letterSpacing: '0.06em' }}>
            {date.split(' ').slice(-1)[0].substring(0, 3).toUpperCase()}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, lineHeight: 1, margin: '2px 0' }}>
            {date.split(' ')[0]}
          </div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--text-dim)' }}>{time}</div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <h3 style={{ fontSize: 17 }}>{biz}</h3>
            <span className={`badge ${s.cls}`}>{s.text}</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{service}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold-light)', marginBottom: 8 }}>{price}</div>
          {status === 'confirmed' && <button className="btn-ghost sm">İptal Et</button>}
          {status === 'pending' && <button className="btn-ghost sm">Detay</button>}
          {status === 'canceled' && <button className="btn-ghost sm">Tekrar Al</button>}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{
      padding: 40, textAlign: 'center',
      border: '1px dashed var(--line-strong)', borderRadius: 14,
      color: 'var(--text-muted)',
    }}>
      <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--surface-2)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="cal" size={22} color="var(--gold-light)"/>
      </div>
      <h4 style={{ fontSize: 16, marginBottom: 6, color: 'var(--text)' }}>Yeni randevu zamanı?</h4>
      <p style={{ fontSize: 13, marginBottom: 16, maxWidth: 280, margin: '0 auto 16px' }}>
        En sevdiğin kuaförlerden birini seç, koltuğa oturmaya hazır ol.
      </p>
      <button className="btn-gold sm">kuaför Bul</button>
    </div>
  );
}

Object.assign(window, {
  HeroScreen, ListingScreen, ProfileScreen, BookingScreen, DashboardScreen,
});
