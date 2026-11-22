import { useMemo, useState } from 'react';
import { Home, Info, Phone, BriefcaseBusiness, UserRound, UserPlus, Copy, Trash2, ArrowRight, Sparkles, Menu, X } from 'lucide-react';
import heroImage from './assets/ai-impact-hero.png';

export default function App() {
  const [input, setInput] = useState('Artificial Intelligence is changing the world');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('ascending');
  const output = useMemo(() => {
    const values = input.trim() ? input.trim().split(/[\s,]+/).filter(Boolean) : [];
    values.sort((a, b) => {
      const comparison = a.localeCompare(b, undefined, { sensitivity: 'base', numeric: true });
      return sortOrder === 'ascending' ? comparison : -comparison;
    });
    return values.join(',');
  }, [input, sortOrder]);
  const copyOutput = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); alert('Output copied to clipboard!'); }
    catch { alert('Clipboard access is unavailable in this browser.'); }
  };
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  return <div className="site-shell">
    <header className="site-header">
      <div className="account-bar">
        <a className="brand" href="#home" aria-label="PrkinfoTech home"><span className="brand-mark"><Sparkles size={19}/></span><span>PRKINFO<span className="brand-accent">TECH</span></span></a>
        <div className="account-actions"><button className="login-btn" onClick={() => alert('Connect your login page here.')}><UserRound size={17}/> Login</button><button className="register-btn" onClick={() => alert('Connect your registration page here.')}><UserPlus size={17}/> Register</button></div>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation">{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
      <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} aria-label="Main navigation">
        <button className="nav-link active" onClick={() => scrollTo('home')}><Home size={18}/> Home</button>
        <button className="nav-link" onClick={() => scrollTo('about')}><Info size={18}/> About Us</button>
        <button className="nav-link" onClick={() => scrollTo('contact')}><Phone size={18}/> Contact Us</button>
        <button className="nav-link" onClick={() => scrollTo('works')}><BriefcaseBusiness size={18}/> Works</button>
      </nav>
    </header>

    <main>
      <section id="home" className="hero" aria-label="Artificial intelligence impact">
        <img src={heroImage} alt="A futuristic AI network connected to healthcare, education, robotics, smart homes and city technology" />
        <div className="hero-overlay"><div className="hero-copy"><span className="eyebrow"><span className="pulse-dot"/> THE FUTURE IS INTELLIGENT</span><h1>Technology that moves<br/><span>the world forward.</span></h1><p>Discover how artificial intelligence is transforming the way we live, work and connect.</p><button className="hero-cta" onClick={() => scrollTo('works')}>Explore our tools <ArrowRight size={17}/></button></div></div>
      </section>

      <section id="works" className="tool-section">
        <div className="section-heading"><span className="section-kicker">SMART TEXT TOOL</span><h2>Turn your text into <span>comma-separated data.</span></h2><p>Paste your text on the left and see the converted result instantly on the right.</p></div>
        <div className="editor-grid">
          <div className="editor-card input-card"><div className="editor-top"><label htmlFor="sourceText">Input text</label><div className="input-tools"><label className="order-label" htmlFor="sortOrder">Order</label><select id="sortOrder" className="order-select" value={sortOrder} onChange={e => setSortOrder(e.target.value)}><option value="ascending">Ascending</option><option value="descending">Descending</option></select><span className="live-tag">LIVE INPUT</span></div></div><textarea id="sourceText" value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste your text here..."/><div className="editor-footer"><span>{input.length} characters</span><button className="text-action" onClick={() => setInput('')}><Trash2 size={15}/> Clear</button></div></div>
          <div className="editor-card output-card"><div className="editor-top"><label htmlFor="resultText">Converted output</label><span className="live-tag red-tag">AUTO CONVERTED</span></div><textarea id="resultText" value={output} readOnly placeholder="Your converted text will appear here..."/><div className="editor-footer"><span>{output.length} characters</span><button className="copy-btn" onClick={copyOutput} disabled={!output}><Copy size={15}/> Copy output</button></div></div>
        </div>
        <p className="privacy-note"><Sparkles size={14}/> Your text is processed in your browser and is not uploaded.</p>
      </section>

      <section id="about" className="info-section"><div className="info-icon"><Sparkles size={23}/></div><div><span className="section-kicker">ABOUT PRKINFOTECH</span><h2>Ideas meet intelligent technology.</h2><p>We bring useful digital experiences together in one place. From AI-inspired innovation to simple productivity tools, our goal is to make technology clear, accessible and helpful.</p></div></section>
      <section id="contact" className="contact-strip"><div><span className="section-kicker">LET’S CONNECT</span><h2>Have a project or an idea?</h2><p>We would love to hear from you.</p></div><a href="mailto:hello@example.com" className="contact-btn">Contact us <ArrowRight size={17}/></a></section>
    </main>
    <footer><a className="footer-brand" href="#home">PRKINFO<span>TECH</span></a><span>© {new Date().getFullYear()} PRKINFOTech. All rights reserved.</span><a href="#home">Back to top ↑</a></footer>
  </div>;
}
