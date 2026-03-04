import React, { useState, useEffect, useRef } from 'react';
import {
  Search, ShieldCheck, Zap, ChevronRight, ChevronDown, Star, ArrowRight, Play, Apple,
  TrendingUp, Users, MapPin, Car, Heart, Sparkles, Gauge, Shield, Menu, X,
  Award, Eye, Phone, Diamond
} from 'lucide-react';

const LION_LOGO = "/logo.png";
const IMG_SHOWROOM = "/showroom_background.png";
const IMG_CAR_1 = "/hero_car.png";
const IMG_CAR_2 = "/porsche_911.png";
const IMG_INTERIOR = "/interior_steering.png";
const IMG_STATS_BG = "/stats_bg.png";
const IMG_HERO_BG = "/hero_bg.png";
const IMG_HOWITWORKS_BG = "/howitworks_bg.png";
const IMG_PRO_BG = "/pro_bg.png";
const IMG_CTA_BG = "/cta_bg.png";
const IMG_TESTIMONIALS_BG = "/testimonials_bg.png";

// ── Animations ──
const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(e.target); } }, { threshold, rootMargin: '0px 0px -80px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const Reveal = ({ children, delay = 0, className = "", direction = "up" }) => {
  const { ref, isVisible } = useScrollReveal();
  const dirs = { up: 'translateY(32px)', down: 'translateY(-32px)', left: 'translateX(40px)', right: 'translateX(-40px)', scale: 'scale(0.95)' };
  return (
    <div ref={ref} className={className} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translate(0) scale(1)' : dirs[direction] || dirs.up, transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, willChange: 'transform, opacity' }}>
      {children}
    </div>
  );
};

const TiltCard = ({ children, className = "", intensity = 8 }) => {
  const [style, setStyle] = useState({});
  return (
    <div onMouseMove={e => { const { left, top, width, height } = e.currentTarget.getBoundingClientRect(); const x = (e.clientX - left) / width - 0.5; const y = (e.clientY - top) / height - 0.5; setStyle({ transform: `perspective(1000px) rotateY(${x*intensity}deg) rotateX(${-y*intensity}deg) translateZ(20px)`, transition: 'transform 0.15s ease-out' }); }}
      onMouseLeave={() => setStyle({ transform: 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' })}
      className={className} style={{ transformStyle: 'preserve-3d' }}>
      <div style={style} className="w-full h-full">{children}</div>
    </div>
  );
};

// ── Shared ──
const SectionLabel = ({ children, dark = false }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-8 h-[2px] rounded-full ${dark ? 'bg-gold/60' : 'bg-gold'}`} />
    <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${dark ? 'text-gold-light' : 'text-gold-dark'}`}>{children}</span>
  </div>
);

const Badge = ({ children, className = "", color = "gold" }) => {
  const c = { gold: "bg-gold-tint text-gold-dark border-gold/15", coral: "bg-coral-tint text-coral border-coral/15", azure: "bg-azure-tint text-azure border-azure/15", violet: "bg-violet-tint text-violet border-violet/15" };
  return <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] border ${c[color]} ${className}`}>{children}</span>;
};

// ── Phone Mockup ──
const PhoneMockup = ({ screenType = "home", className = "" }) => (
  <div className={`relative w-[280px] h-[580px] rounded-[3rem] border-[8px] border-onyx overflow-hidden shrink-0 ${className}`} style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.2), 0 12px 24px rgba(0,0,0,0.1)' }}>
    <div className="absolute top-3 inset-x-0 h-7 w-[90px] bg-black mx-auto rounded-full z-50 flex items-center justify-between px-2.5">
      <div className="w-2 h-2 rounded-full bg-graphite" /><div className="w-2 h-2 rounded-full bg-emerald/70" />
    </div>
    <div className="w-full h-full bg-ivory pt-14 pb-5 flex flex-col relative">
      {screenType === "home" && (<>
        <div className="px-4 pb-3 bg-white/95 backdrop-blur-xl border-b border-border-light">
          <div className="flex justify-between items-center mb-3 mt-1">
            <div>
              <p className="text-[8px] font-semibold text-text-muted uppercase tracking-[0.18em] mb-0.5">Localisation</p>
              <div className="flex items-center gap-1 font-semibold text-gold-dark text-[10px] bg-gold-tint px-2 py-0.5 rounded-md w-max"><MapPin className="w-2.5 h-2.5" /> Douala, CM</div>
            </div>
            <img src={LION_LOGO} alt="SAAH" className="w-8 h-8 rounded-full bg-white p-0.5 border border-border shadow-xs" />
          </div>
          <div className="bg-pearl rounded-xl p-2.5 flex items-center gap-2 border border-border-light"><Search className="w-3.5 h-3.5 text-text-muted" /><span className="text-[10px] font-medium text-text-muted">Marque, modèle...</span></div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-3 space-y-3 pb-20 no-scrollbar">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['Sport', 'SUV', 'Berline', 'Luxe'].map((cat, i) => (
              <div key={i} className={`px-3 py-1 rounded-full text-[9px] font-semibold whitespace-nowrap ${i === 0 ? 'bg-gold text-white shadow-sm' : 'bg-white text-text-secondary border border-border-light'}`}>{cat}</div>
            ))}
          </div>
          {[IMG_CAR_1, IMG_CAR_2].map((img, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border-light overflow-hidden group shadow-xs">
              <div className="relative h-32 overflow-hidden bg-pearl">
                <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 backdrop-blur-lg rounded-md text-[7px] font-bold tracking-[0.15em] uppercase">{i === 0 ? 'LAMBORGHINI' : 'PORSCHE'}</div>
                <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-lg rounded-full"><Heart className="w-3 h-3 text-coral" /></div>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-text-primary text-[11px] mb-0.5">{i === 0 ? 'Aventador SVJ' : '911 GT3 RS'}</h4>
                <p className="font-bold text-gold text-sm mb-2">{i === 0 ? '' : ''}</p>
                <div className="flex items-center justify-between border-t border-border-light pt-2">
                  <div className="flex gap-1">
                    <span className="bg-azure-tint px-1.5 py-0.5 rounded text-[7px] font-semibold text-azure border border-azure/10">Auto</span>
                    <span className="bg-peach-tint px-1.5 py-0.5 rounded text-[7px] font-semibold text-peach border border-peach/10">Essence</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-[7px] font-bold text-emerald-dark bg-emerald-tint px-1.5 py-0.5 rounded"><ShieldCheck className="w-2.5 h-2.5" /> VÉRIFIÉ</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 inset-x-0 h-[60px] bg-white/95 backdrop-blur-xl border-t border-border-light flex justify-around items-center px-5 z-50">
          <div className="text-gold flex flex-col items-center gap-0.5"><Search className="w-4.5 h-4.5" strokeWidth={2.2} /><div className="w-1 h-1 bg-gold rounded-full" /></div>
          <Heart className="w-4.5 h-4.5 text-coral/40" /><ShieldCheck className="w-4.5 h-4.5 text-azure/40" />
          <div className="w-6 h-6 rounded-full bg-pearl border border-border-light overflow-hidden p-0.5"><img src={LION_LOGO} className="w-full h-full object-cover opacity-60" alt="" /></div>
        </div>
      </>)}
      {screenType === "details" && (
        <div className="h-full flex flex-col bg-white">
          <div className="h-[42%] relative overflow-hidden bg-pearl"><img src={IMG_INTERIOR} className="w-full h-full object-cover" alt="" /><div className="absolute top-4 left-4 w-8 h-8 bg-white/80 backdrop-blur-lg rounded-full flex items-center justify-center"><ChevronRight className="w-3.5 h-3.5 text-charcoal rotate-180" /></div></div>
          <div className="flex-1 bg-white -mt-5 rounded-t-[1.75rem] relative z-10 p-4 flex flex-col shadow-md">
            <p className="text-[8px] font-semibold text-text-muted uppercase tracking-[0.18em] mb-0.5">Mercedes-Benz</p>
            <h3 className="text-lg font-bold text-text-primary leading-tight mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Classe S 500 <br />4MATIC</h3>
            <p className="text-xl font-bold text-gold mb-4"></p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ icon: Gauge, label: 'Km', value: '15,000', bg: 'bg-azure-tint' }, { icon: Zap, label: 'Puissance', value: '435 ch', bg: 'bg-peach-tint' }, { icon: Car, label: 'Année', value: '2023', bg: 'bg-emerald-tint' }].map(({ icon: Icon, label, value, bg }, i) => (
                <div key={i} className={`${bg} rounded-xl p-2 text-center`}><Icon className="w-3.5 h-3.5 mx-auto text-text-muted mb-1" /><div className="text-[7px] font-semibold text-text-muted uppercase tracking-wider">{label}</div><div className="text-[10px] font-bold text-text-primary mt-0.5">{value}</div></div>
              ))}
            </div>
            <button className="mt-auto w-full bg-onyx text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 text-xs hover:bg-graphite transition-colors">Contacter le Pro <ArrowRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      )}
    </div>
    <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-50 pointer-events-none"><div className="w-24 h-[3px] bg-text-muted/20 rounded-full" /></div>
  </div>
);

// ── Popup ──
const DownloadPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-onyx/40 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      
      <Reveal direction="up" className="relative w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-[2rem] p-1 shadow-2xl border border-white overflow-hidden">
        <div className="relative bg-white rounded-[1.8rem] p-5 md:p-6 border border-border-light overflow-hidden text-center">
          <div className="absolute top-0 right-0 p-3">
            <button onClick={onClose} className="p-1.5 hover:bg-pearl rounded-full transition-all group">
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-16 h-16 mb-4">
              <img src={LION_LOGO} alt="SAAH Logo" className="w-full h-full object-contain" />
            </div>

            <SectionLabel>Bientôt Disponible</SectionLabel>
            
            <h3 className="text-2xl font-bold text-onyx mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              L'excellence se <span className="italic text-gold">prépare.</span>
            </h3>
            
            <p className="text-text-secondary text-[13px] font-light leading-snug mb-5 max-w-[240px]">
              Lancement officiel à venir.
            </p>

            <div className="flex gap-1.5 justify-center mb-6">
              {[
                { val: "10 Apr", label: "Date" },
                { val: "2026", label: "Year" }
              ].map((item, i) => (
                <div key={i} className={`rounded-xl px-4 py-1.5 border ${i === 0 ? 'bg-gold-tint border-gold/20' : 'bg-pearl border-border-light'}`}>
                  <div className={`text-sm font-bold ${i === 0 ? 'text-gold' : 'text-onyx'}`}>{item.val}</div>
                  <div className="text-[7px] uppercase tracking-widest text-text-muted font-bold">{item.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={onClose} 
              className="w-full btn-primary py-2.5 rounded-lg text-[11px] font-bold tracking-widest mb-3"
            >
              C'est noté
            </button>
            <p className="text-[8px] text-text-muted font-medium uppercase tracking-widest">
              ◆ Accès privilégié ◆
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

// ── Navbar ──
const Navbar = ({ onDownload }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', h, { passive: true }); return () => window.removeEventListener('scroll', h); }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-border-light py-3 shadow-xs' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img src={LION_LOGO} alt="SAAH" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform duration-500" />
          <span className="font-bold text-xl tracking-[0.02em] text-onyx" style={{ fontFamily: 'var(--font-heading)' }}>SAAH</span>
        </a>
        <div className="flex items-center gap-5">
          <button onClick={onDownload} className="btn-primary text-[11px]">Télécharger</button>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ──
const Hero = ({ onDownload }) => (
  <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
    {/* Background image */}
    <img src={IMG_HERO_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-ivory/70" />
    <div className="noise-overlay" />

    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10 w-full">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl">
          <Reveal delay={100}><Badge color="gold" className="mb-8"><Diamond className="w-3 h-3" /> L'Excellence Automobile</Badge></Reveal>
          <Reveal delay={200}>
            <h1 className="font-bold text-[3rem] sm:text-[3.8rem] lg:text-[4.5rem] xl:text-[5.5rem] text-onyx tracking-[-0.03em] leading-[0.95] mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              L'excellence,{' '}<br className="hidden lg:block" />
              <span className="italic text-gold">au bout des<br className="hidden sm:block" /> doigts.</span>
            </h1>
          </Reveal>
          <Reveal delay={350}><p className="text-base lg:text-lg text-text-secondary leading-[1.8] mb-10 max-w-lg font-light">Un accès privilégié à des véhicules premium et certifiés. La première plateforme de confiance en Afrique Centrale.</p></Reveal>
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button onClick={onDownload} className="btn-dark w-full sm:w-auto"><Apple className="w-5 h-5" /><div className="text-left"><div className="text-[8px] font-normal tracking-[0.1em] uppercase opacity-70">Télécharger sur</div><div className="text-sm font-semibold -mt-0.5 tracking-tight normal-case">App Store</div></div></button>
              <button onClick={onDownload} className="btn-outline w-full sm:w-auto"><Play className="w-5 h-5 fill-current" /><div className="text-left"><div className="text-[8px] font-normal tracking-[0.1em] uppercase opacity-70">Disponible sur</div><div className="text-sm font-semibold -mt-0.5 tracking-tight normal-case">Google Play</div></div></button>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-12 flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-tint rounded-xl flex items-center justify-center border border-emerald/20"><ShieldCheck className="w-5 h-5 text-emerald-dark" /></div>
                <div><div className="text-xs font-semibold text-text-primary">100% Vérifié</div><div className="text-[10px] text-text-muted">Certifié SAAH</div></div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">{[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/36?u=saah-user-${i}`} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />)}</div>
                <div><div className="text-xs font-semibold text-text-primary">10K+</div><div className="text-[10px] text-text-muted">Utilisateurs</div></div>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={300} direction="left" className="flex-1 w-full flex justify-center lg:justify-end items-center relative mt-8 lg:mt-0">
          <div className="relative w-full max-w-[480px] h-[680px] flex items-center justify-center">
            <div className="absolute inset-[10%] rounded-[4rem] blur-3xl bg-gold-tint/30" />
            <TiltCard className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"><PhoneMockup screenType="home" /></TiltCard>
            <TiltCard className="absolute hidden lg:block z-10 left-[56%] top-[6%] opacity-50 scale-[0.8] transition-all duration-700 hover:opacity-80 hover:scale-[0.85]" intensity={5}><PhoneMockup screenType="details" /></TiltCard>
          </div>
        </Reveal>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
      <div className="w-6 h-10 border-2 border-text-muted/30 rounded-full flex justify-center pt-2"><div className="w-1 h-2.5 bg-gold rounded-full animate-bounce" /></div>
    </div>
  </section>
);

// ── Stats ──
const AnimatedNumber = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollReveal(0.3);
  useEffect(() => {
    if (!isVisible) return;
    const num = parseInt(target.replace(/\s/g, '').replace('+', ''));
    let current = 0; const inc = num / 70;
    const t = setInterval(() => { current += inc; if (current >= num) { setCount(num); clearInterval(t); } else setCount(Math.floor(current)); }, 2200 / 70);
    return () => clearInterval(t);
  }, [isVisible, target]);
  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>;
};

const StatsSection = () => {
  const stats = [
    { value: "2500", suffix: "+", label: "Véhicules", icon: Car, color: "text-gold-glow", border: "border-gold/20" },
    { value: "150", suffix: "+", label: "Concessionnaires", icon: Award, color: "text-coral-light", border: "border-coral/20" },
    { value: "10000", suffix: "+", label: "Acheteurs", icon: Users, color: "text-azure-light", border: "border-azure/20" },
    { value: "12", suffix: "", label: "Villes", icon: MapPin, color: "text-emerald-light", border: "border-emerald/20" },
  ];
  return (
    <section className="relative py-20 overflow-hidden bg-onyx">
      {/* Background image */}
      <img src={IMG_STATS_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-onyx/80" />
      <div className="noise-overlay" style={{ opacity: 0.04 }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className={`text-center py-8 px-4 rounded-2xl border ${s.border} bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-500`}>
                <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-4 opacity-70`} strokeWidth={1.5} />
                <div className={`font-bold text-3xl md:text-4xl ${s.color} mb-2 tracking-tight`} style={{ fontFamily: 'var(--font-heading)' }}><AnimatedNumber target={s.value} suffix={s.suffix} /></div>
                <p className="text-[12px] text-text-light/45 font-medium tracking-wide uppercase">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Marquee ──
const InfiniteMarquee = () => {
  const brands = ['MERCEDES-BENZ', 'PORSCHE', 'AUDI', 'BMW', 'LAMBORGHINI', 'LAND ROVER', 'BENTLEY', 'MASERATI', 'FERRARI', 'ROLLS-ROYCE'];
  return (
    <div className="w-full py-6 overflow-hidden border-y border-border-light bg-pearl">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-14">
        {[...brands, ...brands].map((b, i) => (
          <React.Fragment key={i}>
            <span className="text-text-muted/60 font-bold text-2xl tracking-[0.12em]" style={{ fontFamily: 'var(--font-heading)' }}>{b}</span>
            <span className="text-gold text-sm font-bold opacity-70">◆</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ── Value Props ──
const ValueProps = () => {
  const features = [
    { icon: Search, title: "Recherche Intelligente", desc: "Filtres avancés et recommandations IA pour identifier instantanément le véhicule parfait.", accent: "text-azure", iconBg: "bg-azure-tint", borderC: "border-azure/15" },
    { icon: Eye, title: "Transparence Totale", desc: "Historique complet, photos certifiées et rapport d'inspection pour chaque annonce.", accent: "text-violet", iconBg: "bg-violet-tint", borderC: "border-violet/15" },
    { icon: Zap, title: "Transaction Simplifiée", desc: "Mise en relation directe avec les concessionnaires les plus réputés.", accent: "text-emerald-dark", iconBg: "bg-emerald-tint", borderC: "border-emerald/15" },
  ];
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="plateforme">
      <div className="noise-overlay" style={{ opacity: 0.015 }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <Reveal direction="right" className="flex-1 relative order-2 lg:order-1 w-full">
            <div className="aspect-[4/5] max-w-md mx-auto relative rounded-3xl overflow-hidden group">
              <img src={IMG_SHOWROOM} className="w-full h-full object-cover rounded-3xl transition-transform duration-[1.5s] group-hover:scale-[1.03]" alt="" />
              <div className="absolute bottom-6 left-5 right-5 bg-white/90 backdrop-blur-xl border border-white/50 p-5 rounded-2xl shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-tint rounded-xl border border-amber/15"><Star className="w-4 h-4 text-amber fill-amber" /></div>
                  <span className="font-bold text-text-primary text-base" style={{ fontFamily: 'var(--font-heading)' }}>Qualité Premium</span>
                </div>
                <p className="text-[13px] text-text-secondary font-light leading-relaxed">Chaque annonce est minutieusement validée par nos experts.</p>
              </div>
              <div className="absolute top-6 right-6 w-14 h-14 border-2 border-coral/15 rounded-full" />
              <div className="absolute top-10 right-10 w-6 h-6 border-2 border-azure/15 rounded-full" />
            </div>
          </Reveal>
          <div className="flex-1 order-1 lg:order-2">
            <Reveal delay={100}><SectionLabel>Notre Approche</SectionLabel></Reveal>
            <Reveal delay={200}>
              <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-onyx tracking-[-0.02em] leading-[1.12] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>
                Achetez et vendez avec une <span className="italic text-coral">sérénité absolue</span>.
              </h2>
            </Reveal>
            <Reveal delay={250}><p className="text-text-secondary text-[15px] font-light leading-[1.8] mb-10 max-w-lg">Nous avons repensé chaque étape du parcours d'achat automobile pour une expérience fluide, transparente et sécurisée.</p></Reveal>
            <div className="space-y-5">
              {features.map((f, i) => (
                <Reveal key={i} delay={300 + i * 120}>
                  <div className="flex gap-5 items-start group cursor-default p-4 rounded-2xl hover:bg-pearl/80 transition-all duration-500">
                    <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center shrink-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-md border ${f.borderC}`}>
                      <f.icon className={`w-5 h-5 ${f.accent}`} strokeWidth={1.8} />
                    </div>
                    <div className="pt-0.5"><h4 className="text-base font-semibold text-text-primary mb-1">{f.title}</h4><p className="text-text-secondary text-[14px] leading-[1.7] font-light">{f.desc}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── How It Works ──
const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Explorez", desc: "Parcourez notre catalogue de véhicules premium vérifiés.", icon: Search, color: "text-azure", bg: "bg-azure-tint", borderC: "border-azure/15", hoverBg: "group-hover:bg-azure", hoverText: "group-hover:text-white" },
    { num: "02", title: "Vérifiez", desc: "Consultez l'historique, les photos certifiées et le rapport SAAH.", icon: ShieldCheck, color: "text-emerald-dark", bg: "bg-emerald-tint", borderC: "border-emerald/15", hoverBg: "group-hover:bg-emerald", hoverText: "group-hover:text-white" },
    { num: "03", title: "Contactez", desc: "Entrez en relation directe avec le concessionnaire vérifié.", icon: Phone, color: "text-coral", bg: "bg-coral-tint", borderC: "border-coral/15", hoverBg: "group-hover:bg-coral", hoverText: "group-hover:text-white" },
  ];
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background image */}
      <img src={IMG_HOWITWORKS_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-pearl/65" />
      <div className="noise-overlay" style={{ opacity: 0.015 }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-16">
          <Reveal><SectionLabel>Comment ça marche</SectionLabel></Reveal>
          <Reveal delay={100}>
            <h2 className="font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-onyx tracking-[-0.02em] leading-tight max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>
              Trois étapes vers votre <span className="italic text-violet">véhicule idéal</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {steps.map((s, i) => (
            <Reveal key={i} delay={200 + i * 150}>
              <div className="relative bg-white rounded-3xl p-8 border border-border-light hover-lift group">
                <div className="text-[4rem] font-bold text-text-muted/[0.06] absolute top-4 right-6 leading-none" style={{ fontFamily: 'var(--font-heading)' }}>{s.num}</div>
                <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center mb-6 border ${s.borderC} ${s.hoverBg} transition-all duration-500`}>
                  <s.icon className={`w-5 h-5 ${s.color} ${s.hoverText} transition-colors duration-500`} strokeWidth={1.8} />
                </div>
                <h4 className="text-lg font-semibold text-text-primary mb-2">{s.title}</h4>
                <p className="text-text-secondary text-[14px] font-light leading-[1.7]">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10"><ChevronRight className="w-5 h-5 text-gold/30" /></div>}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Testimonials ──
const TestimonialSection = () => {
  const testimonials = [
    { text: "SAAH a complètement transformé notre façon d'acheter des véhicules. La transparence est incomparable.", name: "Jean-Marc Essono", role: "Entrepreneur · Douala", avatar: "https://i.pravatar.cc/80?u=saah-client-1", topColor: "bg-gold" },
    { text: "En tant que concessionnaire, SAAH m'a permis de toucher des clients qualifiés que je n'aurais jamais atteints.", name: "Marie-Claire Ndam", role: "Concessionnaire · Yaoundé", avatar: "https://i.pravatar.cc/80?u=saah-client-2", topColor: "bg-coral" },
    { text: "L'inspection certifiée SAAH nous a donné une confiance totale. Un achat sans appréhension.", name: "Patrick Mbida", role: "Directeur Général · Douala", avatar: "https://i.pravatar.cc/80?u=saah-client-3", topColor: "bg-azure" },
  ];
  return (
    <section className="section-padding bg-white relative overflow-hidden" id="securite">
      <div className="noise-overlay" style={{ opacity: 0.015 }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="text-center mb-14">
          <Reveal><SectionLabel>Témoignages</SectionLabel></Reveal>
          <Reveal delay={100}><h2 className="font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-onyx tracking-[-0.02em] leading-tight max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-heading)' }}>Ils nous font <span className="italic text-gold">confiance</span></h2></Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={200 + i * 120}>
              <div className="bg-pearl rounded-3xl p-7 border border-border-light hover-lift relative group overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${t.topColor}`} />
                <div className="absolute top-5 right-6 text-gold/8 text-5xl leading-none" style={{ fontFamily: 'var(--font-heading)' }}>"</div>
                <div className="flex gap-0.5 mb-5">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-amber fill-amber" />)}</div>
                <blockquote className="text-text-primary text-[14px] leading-[1.8] font-light mb-6 relative z-10">"{t.text}"</blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" />
                  <div><div className="font-semibold text-text-primary text-sm">{t.name}</div><div className="text-text-muted text-[11px]">{t.role}</div></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Pro Section ──
const ProSection = ({ onDownload }) => {
  const cards = [
    { icon: TrendingUp, title: "Visibilité Maximale", text: "Touchez un réseau d'acheteurs qualifiés.", stat: "5x", statLabel: "plus de visibilité", color: "text-coral", bg: "bg-coral-tint", hoverBg: "group-hover:bg-coral", borderC: "border-coral/15" },
    { icon: Users, title: "Leads Qualifiés", text: "Des acheteurs vérifiés et motivés.", stat: "92%", statLabel: "satisfaction", color: "text-azure", bg: "bg-azure-tint", hoverBg: "group-hover:bg-azure", borderC: "border-azure/15" },
    { icon: Shield, title: "Label Pro SAAH", text: "Faites valoir votre professionnalisme.", stat: "100%", statLabel: "certifiés", color: "text-emerald-dark", bg: "bg-emerald-tint", hoverBg: "group-hover:bg-emerald", borderC: "border-emerald/15" },
  ];
  return (
    <section className="section-padding relative overflow-hidden" id="pro">
      {/* Background image */}
      <img src={IMG_PRO_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-ivory/65" />
      <div className="noise-overlay" style={{ opacity: 0.015 }} />
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">
          <div className="flex-1">
            <Reveal><SectionLabel>Pour les Professionnels</SectionLabel></Reveal>
            <Reveal delay={100}><h2 className="font-bold text-3xl md:text-4xl lg:text-[2.8rem] text-onyx tracking-[-0.02em] leading-[1.12] mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Le showroom digital de <span className="italic text-azure">votre concession.</span></h2></Reveal>
            <Reveal delay={200}><p className="text-text-secondary text-[15px] font-light leading-[1.8] mb-10 max-w-lg">Un tableau de bord intuitif pour publier vos véhicules, gérer vos leads et suivre vos performances.</p></Reveal>
            <Reveal delay={300}><button onClick={onDownload} className="btn-primary">Rejoindre SAAH Business <ArrowRight className="w-4 h-4" /></button></Reveal>
          </div>
          <div className="flex-1 space-y-5 w-full">
            {cards.map((item, i) => (
              <Reveal key={i} delay={200 + i * 120} direction="left">
                <div className="bg-white rounded-2xl p-6 border border-border-light hover-lift group flex gap-5 items-start">
                  <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 border ${item.borderC} ${item.hoverBg} transition-all duration-500`}>
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:text-white transition-colors duration-500`} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-base font-semibold text-text-primary">{item.title}</h4>
                      <div className="text-right shrink-0 ml-4">
                        <div className={`text-lg font-bold ${item.color}`} style={{ fontFamily: 'var(--font-heading)' }}>{item.stat}</div>
                        <div className="text-[9px] text-text-muted uppercase tracking-wider">{item.statLabel}</div>
                      </div>
                    </div>
                    <p className="text-text-secondary text-[13px] font-light leading-[1.7]">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── CTA ──
const CTASection = ({ onDownload }) => (
  <section className="relative overflow-hidden py-24">
    {/* Background image */}
    <img src={IMG_CTA_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-onyx/75" />
    <div className="noise-overlay" style={{ opacity: 0.04 }} />
    <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-16 relative z-10 text-center">
      <Reveal><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] bg-white/[0.06] text-gold-glow border border-white/[0.08] mb-8"><Sparkles className="w-3 h-3" /> Commencez maintenant</div></Reveal>
      <Reveal delay={100}><h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white tracking-[-0.02em] leading-tight mb-5" style={{ fontFamily: 'var(--font-heading)' }}>Prêt à prendre <span className="italic text-gold">le volant ?</span></h2></Reveal>
      <Reveal delay={200}><p className="text-text-light/60 text-base md:text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">L'application SAAH est gratuite. Téléchargez-la et découvrez la nouvelle référence automobile en Afrique Centrale.</p></Reveal>
      <Reveal delay={300}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onDownload} className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm text-white bg-gold hover:bg-gold-dark hover:-translate-y-1 transition-all duration-400 shadow-gold-lg">
            <Apple className="w-5 h-5" /><div className="text-left"><div className="text-[8px] font-normal tracking-[0.1em] uppercase opacity-80">Télécharger sur</div><div className="text-sm font-semibold -mt-0.5 tracking-tight">App Store</div></div>
          </button>
          <button onClick={onDownload} className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full font-semibold text-sm bg-white/[0.08] text-white border border-white/[0.12] hover:bg-white/[0.14] transition-all duration-400 hover:-translate-y-1">
            <Play className="w-5 h-5 fill-current" /><div className="text-left"><div className="text-[8px] font-normal tracking-[0.1em] uppercase opacity-70">Disponible sur</div><div className="text-sm font-semibold -mt-0.5 tracking-tight">Google Play</div></div>
          </button>
        </div>
      </Reveal>
    </div>
  </section>
);

// ── Footer ──
const Footer = () => (
  <footer className="pt-20 pb-8 relative overflow-hidden bg-charcoal">
    <div className="noise-overlay" style={{ opacity: 0.03 }} />
    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between gap-14 mb-16">
        <div className="max-w-sm">
          <div className="flex items-center gap-3 mb-5"><img src={LION_LOGO} alt="SAAH" className="w-8 h-8 object-contain" /><span className="font-bold text-xl text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>SAAH</span></div>
          <p className="text-text-light/40 text-sm font-light leading-[1.8] mb-6">L'innovation technologique au service de l'excellence automobile en Afrique Centrale.</p>
          <div className="flex gap-3">
            {[{ l: 'Li', c: 'hover:text-azure' }, { l: 'Ig', c: 'hover:text-coral' }, { l: 'Fb', c: 'hover:text-azure' }].map(s => (
              <a key={s.l} href="#" className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:border-gold/30 transition-all duration-300 group">
                <span className={`text-text-light/40 text-[10px] uppercase font-bold ${s.c} transition-colors`}>{s.l}</span>
              </a>
            ))}
          </div>
        </div>
        <div className="flex gap-12 lg:gap-16 flex-wrap">
          {[{ title: "Produit", links: ["Pour les acheteurs", "Pour les pros", "Catalogue", "Inspection"] }, { title: "Entreprise", links: ["À propos", "Carrières", "Presse", "Contact"] }, { title: "Légal", links: ["Mentions légales", "Confidentialité", "CGU", "Cookies"] }].map((col, i) => (
            <div key={i}><h4 className="font-semibold text-white/70 mb-5 text-[12px] tracking-[0.12em] uppercase">{col.title}</h4><ul className="space-y-3">{col.links.map((l, j) => <li key={j}><a href="#" className="text-[13px] text-text-light/35 font-light hover:text-gold transition-colors duration-300">{l}</a></li>)}</ul></div>
          ))}
        </div>
      </div>
      <div className="gold-line w-full mb-8" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-text-light/25 font-medium">
        <p>© 2026 SAAH SA. Tous droits réservés.</p>
        <p className="flex items-center gap-1.5">Construit avec <span className="text-coral">♥</span> en Afrique Centrale</p>
      </div>
    </div>
  </footer>
);

// ── APP ──
export default function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="min-h-screen bg-ivory text-text-primary overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar onDownload={togglePopup} />
      <Hero onDownload={togglePopup} />
      <StatsSection />
      <InfiniteMarquee />
      <ValueProps />
      <HowItWorks />
      <TestimonialSection />
      <ProSection onDownload={togglePopup} />
      <CTASection onDownload={togglePopup} />
      <Footer />
      
      <DownloadPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </div>
  );
}
