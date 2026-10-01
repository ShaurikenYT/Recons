'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Database, Mail, Menu, MessageCircle, Send, Sparkles, TrendingUp, X, Zap } from 'lucide-react'

const services = [
  { icon: TrendingUp, number: '01', title: 'Sales insights & dashboards', text: 'Turn scattered signals into one operating picture. Custom tracking, real-time KPIs, and views built around how your team actually works.', tags: ['KPI architecture', 'Live reporting', 'Forecasting'] },
  { icon: Zap, number: '02', title: 'AI workflow automation', text: 'Remove the repeat work that slows your best people down. Smarter qualification, instant responses, and systems that keep moving.', tags: ['Lead routing', 'AI copilots', 'Process design'] },
  { icon: Database, number: '03', title: 'Revenue & growth strategy', text: 'Make the next move obvious. We connect your data to a practical growth plan your team can understand, own, and execute.', tags: ['Data audit', 'Growth loops', 'Decision systems'] },
]

const chartData = [42, 48, 45, 61, 58, 68, 73, 70, 84, 88, 92, 100]

export default function Page() {
  const [auditOpen, setAuditOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [period, setPeriod] = useState('30D')
  const [submitted, setSubmitted] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Hi, I’m the Redwyre assistant. What would you like to make clearer in your business?' }])

  async function sendChat(event: React.FormEvent) {
    event.preventDefault()
    const message = chatInput.trim()
    if (!message || chatLoading) return
    setChatInput('')
    setChatMessages(current => [...current, { role: 'user', text: message }])
    setChatLoading(true)
    try {
      const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message }) })
      const data = await response.json()
      setChatMessages(current => [...current, { role: 'assistant', text: data.text || data.error }])
    } catch {
      setChatMessages(current => [...current, { role: 'assistant', text: 'I’m having trouble connecting right now. Email hello@redwyre.in and we’ll help directly.' }])
    } finally {
      setChatLoading(false)
    }
  }

  function openAudit() { setAuditOpen(true); setStep(1); setSubmitted(false) }
  function closeAudit() { setAuditOpen(false) }
  function nextStep() { if (step < 3) setStep(step + 1); else setSubmitted(true) }

  return (
    <main className="site-shell">
      <nav className="nav-wrap" aria-label="Main navigation">
        <a href="#top" className="brand"><img className="brand-logo" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Fubxrz3TBYMV3D87NdzXkSRQ2VDsmb.png" alt="The Recons" /><span>THE RECONS</span><small>Strategic advisory & reconciliation services</small></a>
        <button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
        <div className={`nav-links ${mobileOpen ? 'is-open' : ''}`}>
          <a href="#services" onClick={() => setMobileOpen(false)}>Services</a><a href="#solutions" onClick={() => setMobileOpen(false)}>Solutions</a><a href="#proof" onClick={() => setMobileOpen(false)}>Case studies</a>
          <button className="nav-cta" onClick={openAudit}>Get free growth audit <ArrowUpRight size={15} /></button>
        </div>
      </nav>

      <section id="top" className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Data & AI consultancy / 2026</p>
          <h1>We don&apos;t just build dashboards.<br /><em>We build clarity.</em></h1>
          <p className="hero-lede">Helping ambitious businesses scale using custom sales insights, intelligent AI automation, and data-backed strategy.</p>
          <div className="hero-actions"><button className="button-primary" onClick={openAudit}>Claim your free audit <ArrowUpRight size={17} /></button><a className="button-ghost" href="#solutions">Explore our solutions <ArrowUpRight size={17} /></a></div>
          <div className="hero-note"><span>Trusted by teams ready to move</span><span className="note-line" /><span>Scroll to explore ↓</span></div>
        </div>
        <Dashboard period={period} setPeriod={setPeriod} />
      </section>

      <section id="services" className="services section-pad">
        <div className="section-heading"><p className="eyebrow">What we do</p><h2>Make your data<br /><span>pull its weight.</span></h2><p>Most businesses don&apos;t have a data problem. They have a clarity problem. We solve the gap between what your systems know and what your team does next.</p></div>
        <div className="service-grid">{services.map(({ icon: Icon, number, title, text, tags }) => <article className="service-card" key={number}><div className="card-top"><span className="card-number">{number}</span><Icon size={22} strokeWidth={1.4} /></div><h3>{title}</h3><p>{text}</p><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><a href="#solutions" aria-label={`Explore ${title}`}>Explore <ArrowUpRight size={15} /></a></article>)}</div>
      </section>

      <section id="solutions" className="audit-section section-pad"><div className="audit-intro"><p className="eyebrow">The Redwyre audit</p><h2>Stop guessing.<br /><span>Start growing.</span></h2><p>In one focused session, we map the friction in your operation, find the highest-leverage opportunities, and give you a clear path to your next stage of growth.</p><button className="button-primary" onClick={openAudit}>Book your free assessment <ArrowUpRight size={17} /></button></div><div className="audit-steps"><div className="step-line" /><div className="audit-step"><span>01</span><div><h3>Find the friction</h3><p>We look at your current tools, flows, and blind spots.</p></div></div><div className="audit-step"><span>02</span><div><h3>Spot the leverage</h3><p>We identify where data and automation can create momentum.</p></div></div><div className="audit-step"><span>03</span><div><h3>Map the next move</h3><p>You leave with a prioritized plan, not a 50-page deck.</p></div></div></div></section>

      <section id="proof" className="proof-section section-pad"><div className="quote-mark">“</div><blockquote>Data is only as good as<br /><span>the action it inspires.</span></blockquote><div className="proof-badges"><span><Check size={15} /> 100% custom dashboards</span><span><Check size={15} /> Seamless AI integration</span><span><Check size={15} /> End-to-end analytics setup</span></div></section>

      <footer className="footer"><div className="brand"><span className="brand-mark">R</span><span>REDWYRE</span><small>Fueling decisions with data</small></div><div className="footer-right"><a href="mailto:hello@redwyre.in"><Mail size={15} /> hello@redwyre.in</a><a href="https://instagram.com/redwyre.in" target="_blank" rel="noreferrer"><span className="social-glyph">◎</span> @redwyre.in</a><a href="#top">Back to top ↑</a></div><p>© 2026 Redwyre. Built for better decisions.</p></footer>

      <button className="chat-launcher" onClick={() => setChatOpen(!chatOpen)} aria-label={chatOpen ? 'Close Redwyre assistant' : 'Open Redwyre assistant'}><MessageCircle size={20} /><span>Ask Redwyre</span></button>
      {chatOpen && <section className="chat-panel" aria-label="Redwyre AI assistant"><div className="chat-header"><div><span className="live-dot" /> Redwyre assistant</div><button onClick={() => setChatOpen(false)} aria-label="Close assistant"><X size={16} /></button></div><div className="chat-messages">{chatMessages.map((message, index) => <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>{message.text}</div>)}{chatLoading && <div className="chat-message assistant typing">Thinking...</div>}</div><form className="chat-form" onSubmit={sendChat}><input value={chatInput} onChange={event => setChatInput(event.target.value)} placeholder="Ask about data, AI, or growth..." aria-label="Message Redwyre assistant" /><button type="submit" aria-label="Send message" disabled={chatLoading || !chatInput.trim()}><Send size={16} /></button></form></section>}

      {auditOpen && <div className="modal-backdrop" role="presentation" onMouseDown={closeAudit}><div className="audit-modal" role="dialog" aria-modal="true" aria-labelledby="audit-title" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={closeAudit} aria-label="Close"><X size={18} /></button>{submitted ? <div className="success-state"><div className="success-icon"><Check /></div><p className="eyebrow">You&apos;re on the list</p><h2>Clarity is<br /><em>on its way.</em></h2><p>We&apos;ll be in touch at the email you provided to schedule your free assessment.</p><button className="button-primary" onClick={closeAudit}>Done <ArrowUpRight size={17} /></button></div> : <><div className="modal-head"><p className="eyebrow">Free growth audit / 0{step} of 03</p><h2 id="audit-title">Let&apos;s find your<br /><em>next advantage.</em></h2><div className="progress"><span style={{ width: `${(step / 3) * 100}%` }} /></div></div><div className="form-step">{step === 1 && <><label>What&apos;s your business called?<input placeholder="Company name" autoFocus /></label><label>What industry are you in?<select defaultValue=""><option value="" disabled>Select an industry</option><option>Technology</option><option>Retail & consumer</option><option>Professional services</option><option>Other</option></select></label></>}{step === 2 && <><label>What&apos;s your current monthly revenue?<select defaultValue=""><option value="" disabled>Select a range</option><option>Pre-revenue</option><option>₹1L – ₹10L</option><option>₹10L – ₹50L</option><option>₹50L+</option></select></label><label>What&apos;s your biggest data bottleneck?<textarea placeholder="Tell us where things feel stuck..." rows={3} /></label></>}{step === 3 && <><label>Where should we send your audit plan?<input type="email" placeholder="you@company.com" autoFocus /></label><label>Instagram or LinkedIn handle <span className="optional">optional</span><input placeholder="@yourhandle" /></label></>}</div><button className="button-primary full-width" onClick={nextStep}>{step === 3 ? 'Claim my audit' : 'Continue'} <ArrowUpRight size={17} /></button></>}</div></div>}
    </main>
  )
}

function Dashboard({ period, setPeriod }: { period: string, setPeriod: (value: string) => void }) {
  return <div className="dashboard-wrap"><div className="dashboard-card"><div className="dash-header"><div><span className="live-dot" /> live overview <small>updated just now</small></div><div className="period-switch">{['7D', '30D', '90D'].map(item => <button key={item} className={period === item ? 'active' : ''} onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="dash-title"><div><p>Revenue performance</p><strong>₹84.2L</strong><span className="positive">+24.8% <TrendingUp size={13} /></span></div><span className="dash-label">{period} / ALL CHANNELS</span></div><div className="chart"><div className="chart-y"><span>100L</span><span>75L</span><span>50L</span><span>25L</span><span>0</span></div><div className="chart-area"><div className="chart-grid" /> <svg viewBox="0 0 600 180" preserveAspectRatio="none" aria-label="Revenue growth chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#0066ff" stopOpacity=".25" /><stop offset="1" stopColor="#0066ff" stopOpacity="0" /></linearGradient></defs><path d={`M 0 150 ${chartData.map((v, i) => `L ${(i / 11) * 600} ${180 - v * 1.5}`).join(' ')} L 600 180 L 0 180 Z`} fill="url(#fill)" /><path d={`M 0 150 ${chartData.map((v, i) => `L ${(i / 11) * 600} ${180 - v * 1.5}`).join(' ')}`} fill="none" stroke="#4d91ff" strokeWidth="2.5" /></svg><div className="chart-x"><span>01 MAY</span><span>08 MAY</span><span>15 MAY</span><span>22 MAY</span><span>30 MAY</span></div></div></div><div className="dash-bottom"><div><span>Conversion rate</span><strong>8.42%</strong><small className="positive">+1.2%</small></div><div><span>Avg. order value</span><strong>₹12,480</strong><small className="positive">+8.6%</small></div><div><span>New customers</span><strong>1,284</strong><small className="positive">+18.4%</small></div></div></div><div className="insight-card"><div className="insight-icon"><Sparkles size={16} /></div><div><span>AI insight / 01</span><p>Revenue is up 24.8% — driven by a 2.4× lift in returning customers.</p></div><ArrowUpRight size={16} /></div></div>
}
