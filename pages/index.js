import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

const PLANS = [
  {
    id: 'core',
    tier: 'Plan 1',
    name: 'Sanctuary Core',
    tag: 'Clinically proven GLP-1/GIP therapy with full physician oversight.',
    price: '$399',
    commit: '6-month commitment · Upgrade anytime',
    pick: "Pick this if you're looking to lose a conservative amount of weight steadily and safely.",
    features: [
      '4 weekly GLP-1/GIP injections, Tirzepatide',
      'Starting dose 2.5 mg, titrated to 7.5 mg',
      'MD reviews bloodwork, determines dosing',
      'Upgrade to Plus or Elite anytime',
    ],
    featured: false,
  },
  {
    id: 'plus',
    tier: 'Plan 2',
    name: 'Sanctuary Plus',
    tag: 'Advanced dual or triple agonist therapy with LPG body contouring.',
    price: '$499',
    commit: '6-month commitment · Upgrade to Elite anytime',
    pick: 'Pick this if you want to lose weight meaningfully while contouring and tightening your body.',
    features: [
      '4 weekly GLP injections, Tirzepatide or Retatrutide',
      'Any therapeutic dose, no ceiling',
      '1 LPG Endermologie Full Body / month',
      'MD reviews bloodwork, determines dosing',
      'Priority booking',
    ],
    featured: true,
    badge: 'Most Popular',
    social: 'Over 2,000 patrons have chosen this plan',
  },
  {
    id: 'elite',
    tier: 'Plan 3',
    name: 'Sanctuary Elite',
    tag: 'Maximum weight loss, contouring, and cellular renewal in one complete plan.',
    price: '$899',
    commit: '6-month commitment',
    pick: 'Pick this if you want maximum weight loss, prevent loose skin and hair loss, and protect your metabolic rate.',
    features: [
      '4 weekly GLP injections, Tirzepatide or Retatrutide',
      'Any therapeutic dose, no ceiling',
      '4 LPG Endermologie Full Body sessions / month',
      '4 NAD+ injections / month',
      'Bloodwork every 6 months included',
      'Priority booking',
      'Discount on ALL services',
    ],
    featured: false,
  },
];

const LASER_OPTIONS = {
  full:   { title: 'Full Body',        desc: 'Our most comprehensive package, permanent hair reduction from head to toe.', areas: [] },
  face:   { title: 'Face',             desc: 'Precise, gentle laser removal for all facial areas.', areas: ['Full Face','Lips','Chin','Side-Burns','Jawline'] },
  arms:   { title: 'Arms & Underarms', desc: 'Smooth, lasting results for arms and underarms.', areas: ['Full Arms','Half Arms','Underarms'] },
  legs:   { title: 'Legs',             desc: 'Silky, lasting smoothness for full or half legs.', areas: ['Full Legs','Half Legs'] },
  areas:  { title: 'Body Areas',       desc: 'Targeted removal for specific body zones.', areas: ['Chest','Full Abdomen','Half Abdomen','Full Back','Half Back','Shoulders','Buttocks','Hands & Fingers','Lower Back','Tummy Hairline'] },
  bikini: { title: 'Bikini & Brazilian',desc: 'Comfortable, private, and professionally administered.', areas: ['Bikini','Brazilian'] },
};

const PEPTIDE_CATEGORIES = [
  { cat: 'Cellular Health', items: ['NAD+', 'MOTS-c', 'Epithalon', 'B12'] },
  { cat: 'Skin & Hair', items: ['Glow 70', 'GHK-Cu', 'NAD+', 'TB-500', 'Epithalon'] },
  { cat: 'Anti-Aging', items: ['Epithalon', 'NAD+', 'Glow 70'] },
  { cat: 'Perimenopause & Menopause Stacking', items: ['Selank & Semax', 'NAD+', 'Epithalon'] },
  { cat: 'Brain & Mood', items: ['Selank', 'Semax', 'Oxytocin'] },
  { cat: 'Body & Metabolism', items: ['Tesamorelin', 'Ipamorelin', 'GLP Therapies'] },
];

const DETAILED_PLANS = [
  {
    id: 'core',
    tier: 'Plan 1',
    name: 'Sanctuary Core',
    tagline: 'Clinically proven GLP-1/GIP therapy with full physician oversight, your first step toward real, sustainable weight loss.',
    price: '$399',
    commit: '6-month commitment · Upgrade to Plus or Elite anytime',
    groups: [
      { label: 'GLP Therapy', items: [
        '4 weekly GLP-1/GIP injections, Tirzepatide (Mounjaro)',
        'Starting dose 2.5 mg, titrated up to 7.5 mg',
        'MD reviews bloodwork and determines starting dose and monthly adjustments',
      ]},
      { label: 'Included', items: [
        'MD physician oversight, every membership',
        'Weekly in-office injection appointments',
        'Progress monitoring and protocol adjustments',
        'Upgrade to Sanctuary Plus or Elite at any time',
      ]},
    ],
    pick: 'Pick this plan if you are looking to lose a conservative amount of weight steadily and safely, with full physician oversight and a proven clinical protocol.',
    featured: false,
  },
  {
    id: 'plus',
    tier: 'Plan 2',
    name: 'Sanctuary Plus',
    tagline: 'Advanced dual or triple agonist therapy with LPG body contouring, for those ready to go further, faster.',
    price: '$499',
    commit: '6-month commitment · Upgrade to Elite anytime',
    groups: [
      { label: 'GLP Therapy', items: [
        '4 weekly GLP injections, Tirzepatide or Retatrutide',
        'Any therapeutic dose, no ceiling',
        'MD reviews bloodwork and determines starting dose and monthly adjustments',
      ]},
      { label: 'Body Contouring', items: [
        '1 LPG Endermologie Full Body session / month',
        'Targets fat, cellulite, and skin laxity',
        'Amplifies and complements your GLP results',
      ]},
      { label: 'Member Benefits', items: [
        'MD physician oversight, every membership',
        'Priority booking',
      ]},
    ],
    pick: 'Pick this plan if you want to lose a meaningful amount of weight while contouring and tightening your body as the transformation happens.',
    featured: true,
    badge: 'Most Popular',
    social: 'Over 2,000 patrons have chosen this plan',
  },
  {
    id: 'elite',
    tier: 'Plan 3',
    name: 'Sanctuary Elite',
    tagline: 'Maximum weight loss, maximum contouring, cellular renewal, and the protection your body needs through the transformation.',
    price: '$899',
    commit: '6-month commitment',
    groups: [
      { label: 'GLP Therapy', items: [
        '4 weekly GLP injections, Tirzepatide or Retatrutide',
        'Any therapeutic dose, no ceiling',
        'MD reviews bloodwork and determines starting dose and monthly adjustments',
      ]},
      { label: 'Body Contouring', items: [
        '4 LPG Endermologie Full Body sessions / month',
        'Weekly contouring that amplifies fat loss results',
        "Targets skin laxity, works alongside Retatrutide's muscle-preserving properties to minimize loose skin",
      ]},
      { label: 'Cellular Renewal', items: [
        '4 NAD+ injections / month',
        'Supports energy, cellular repair, and metabolism',
        'Supports cellular repair and energy during transformation',
        'Hair loss associated with weight loss? Elite members receive a discount on peptides like GHK-CU and Glow 70, clinically used to support hair follicle health',
      ]},
      { label: 'Elite Benefits', items: [
        'MD physician oversight, every membership',
        'Every 6 months comprehensive bloodwork included',
        'Priority booking',
      ]},
    ],
    discount: 'Member discount on every service we offer: Laser Hair Removal · Morpheus8 · Forma · Evolve · Lumecca · Peptide Therapy (incl. GHK-CU & Glow 70) · Compression Therapy · and more',
    pick: 'Pick this plan if your goal is maximum weight loss, done right. Weekly body contouring works alongside the therapy to prevent loose skin, NAD+ and targeted peptides address the hair loss that can come with rapid weight loss, and comprehensive bloodwork every 6 months ensures everything stays on track.',
    featured: false,
  },
];

const TRUST_ITEMS = [
  { h: 'MD Physician Oversight', p: 'Every member has a licensed MD overseeing their protocol, not just a provider' },
  { h: 'Dose Adjusted Always',   p: 'Your dose is never static, titrated at every visit based on your response' },
  { h: 'Upgrade Anytime',        p: "Start on Core or Plus and upgrade to the next level whenever you're ready" },
  { h: '6-Month Commitment',     p: 'Real transformation takes time, 6 months gives your body the chance to genuinely change' },
];

const COMPARE_ROWS = [
  { label: 'MD Physician Oversight',                       core: 'check', plus: 'check', elite: 'check' },
  { label: '4 Weekly GLP Injections',                       core: 'check', plus: 'check', elite: 'check' },
  { label: 'Tirzepatide (GLP-1 + GIP)',                      core: 'check', plus: 'check', elite: 'check' },
  { label: 'Retatrutide (GLP-1 + GIP + Glucagon)',           core: 'x',     plus: 'check', elite: 'check' },
  { label: 'Max dose up to 7.5 mg',                          core: 'check', plus: 'x',     elite: 'x' },
  { label: 'Any therapeutic dose',                           core: 'x',     plus: 'check', elite: 'check' },
  { label: 'LPG Endermologie Full Body',                     core: 'x',     plus: '1× / month', elite: '4× / month' },
  { label: 'NAD+ Injections',                                core: 'x',     plus: 'x',     elite: '4× / month' },
  { label: 'Comprehensive Bloodwork',                        core: 'x',     plus: 'x',     elite: 'Every 6 months' },
  { label: 'Member Discount on All Services',                core: 'x',     plus: 'x',     elite: 'check' },
  { label: 'Priority Booking',                               core: 'x',     plus: 'check', elite: 'check' },
  { label: 'Upgrade Anytime',                                core: 'check', plus: 'check', elite: 'x' },
];

const MODAL_FAQ = [
  { q: 'What is the difference between Tirzepatide and Retatrutide?', a: 'Tirzepatide (Mounjaro) is a dual agonist, it activates GLP-1 and GIP receptors. Retatrutide is a triple agonist, it activates GLP-1, GIP, and GLP-2. The additional GLP-2 receptor activation supports gut health and leads to greater fat loss. Both are effective. Retatrutide is the more advanced option, available to Plus and Elite members.' },
  { q: 'Will I have loose skin after losing weight?', a: 'Rapid weight loss can cause loose skin. This is one of the main reasons Sanctuary Elite includes 4 LPG Endermologie sessions per month, weekly mechanical stimulation of the skin helps maintain elasticity and tightness as the weight comes off, significantly reducing this risk compared to GLP therapy alone.' },
  { q: 'Does GLP therapy cause hair loss?', a: 'Hair loss (telogen effluvium) can occur with rapid weight loss, it is a known side effect of significant caloric reduction, not the GLP medication itself. Sanctuary Elite addresses this on two levels: NAD+ injections support cellular repair and energy metabolism, and Elite members receive a discount on targeted peptides, specifically GHK-CU and Glow 70, which are clinically used to support hair follicle health and stimulate regrowth during and after significant weight loss.' },
  { q: 'Who oversees my treatment?', a: 'Every InHype Sanctuary membership includes oversight by a licensed MD physician. Physician monitors your protocol, adjusts your dose at every visit, and ensures your treatment is safe and effective throughout the 6-month commitment.' },
  { q: 'Can I upgrade my plan?', a: 'Yes. Core members can upgrade to Plus or Elite at any time. Plus members can upgrade to Elite at any time. There is no penalty for upgrading, the price difference is prorated for your remaining billing period.' },
  { q: 'What does the member discount cover?', a: 'Plus and Elite members receive a discount on every service we offer, including Laser Hair Removal, Morpheus8, Forma Facial, Evolve Transform, Evolve Tone, LPG Endermologie, Lumecca, Peptide Therapy, and more. Ask your provider for the current discount rate.' },
];

function MembershipModal({ onClose, onCheckout, loadingPlanId }) {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="mx-overlay" role="dialog" aria-modal="true" aria-label="Membership details">
      <style>{`
        .mx-overlay{position:fixed;inset:0;z-index:500;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch;}
        .mx-topbar{position:sticky;top:0;z-index:510;display:flex;align-items:center;justify-content:space-between;padding:0 1.5rem;height:60px;background:rgba(15,26,23,0.97);backdrop-filter:blur(20px);border-bottom:1px solid var(--border);}
        .mx-topbar-label{font-family:'Cormorant Garamond',serif;font-size:1rem;color:var(--white);font-style:italic;}
        .mx-close{background:none;border:1px solid rgba(255,255,255,0.15);color:rgba(247,245,240,0.6);width:34px;height:34px;border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;transition:all .2s;}
        .mx-close:hover{border-color:var(--gold);color:var(--gold);}

        .mx-hero{min-height:60vh;display:flex;align-items:center;justify-content:center;text-align:center;padding:4rem 2rem 3rem;position:relative;overflow:hidden;}
        .mx-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 60%,rgba(74,124,111,0.18) 0%,transparent 65%),radial-gradient(ellipse at 75% 25%,rgba(201,168,76,0.07) 0%,transparent 50%);}
        .mx-hero-inner{position:relative;z-index:2;max-width:860px;margin:0 auto;}
        .mx-hero-eye{font-size:0.6rem;letter-spacing:0.24em;text-transform:uppercase;color:var(--gold);opacity:0.8;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:center;gap:0.75rem;}
        .mx-hero-eye::before,.mx-hero-eye::after{content:'';width:22px;height:1px;background:var(--gold);opacity:0.5;}
        .mx-hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,6vw,5rem);font-weight:300;color:var(--white);line-height:1.04;margin-bottom:1.5rem;}
        .mx-hero h1 em{font-style:italic;color:var(--gold);}
        .mx-hero-sub{font-size:0.95rem;color:var(--text);max-width:600px;margin:0 auto 1.5rem;line-height:1.9;}
        .mx-peptide-badge{display:inline-flex;align-items:center;gap:0.6rem;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.2);border-radius:100px;padding:0.5rem 1.25rem;font-size:0.72rem;color:var(--gold);letter-spacing:0.04em;}
        .mx-peptide-badge::before{content:'✦';font-size:0.5rem;}

        .mx-sec{padding:5rem 2rem;}
        .mx-inner{max-width:1120px;margin:0 auto;}
        .mx-s-eye{font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);opacity:0.75;margin-bottom:0.9rem;font-weight:500;display:flex;align-items:center;gap:0.75rem;}
        .mx-s-eye::before{content:'';width:18px;height:1px;background:var(--gold);opacity:0.6;}
        .mx-s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,4vw,3rem);font-weight:300;color:var(--white);line-height:1.1;margin-bottom:1rem;}
        .mx-s-title em{font-style:italic;color:var(--gold);}
        .mx-gbar{width:28px;height:1px;background:var(--gold);opacity:0.4;margin-bottom:2rem;}

        .mx-science{background:var(--bg);}
        .mx-science-intro p{font-size:0.9rem;color:var(--text);line-height:1.95;max-width:680px;margin-bottom:3rem;}
        .mx-glp-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;}
        .mx-glp-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:2.25rem 2rem;}
        .mx-glp-card.mx-reta{border-color:rgba(201,168,76,0.35);background:rgba(201,168,76,0.05);}
        .mx-glp-tag{font-size:0.57rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);opacity:0.7;margin-bottom:0.75rem;font-weight:500;}
        .mx-glp-name{font-family:'Cormorant Garamond',serif;font-size:1.7rem;color:var(--white);font-weight:400;margin-bottom:0.4rem;}
        .mx-glp-sub{font-size:0.75rem;color:var(--text);font-style:italic;margin-bottom:1.25rem;}
        .mx-glp-desc{font-size:0.8rem;color:var(--text);line-height:1.85;margin-bottom:1.5rem;}
        .mx-glp-receptors{display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.5rem;}
        .mx-receptor{background:rgba(74,124,111,0.15);border:1px solid rgba(74,124,111,0.25);border-radius:100px;padding:0.3rem 0.85rem;font-size:0.65rem;color:rgba(247,245,240,0.6);letter-spacing:0.06em;}
        .mx-receptor.mx-active{background:rgba(201,168,76,0.12);border-color:rgba(201,168,76,0.3);color:var(--gold);}
        .mx-glp-list{list-style:none;}
        .mx-glp-list li{font-size:0.78rem;color:var(--text);padding:0.38rem 0 0.38rem 1rem;position:relative;border-bottom:1px solid rgba(255,255,255,0.04);}
        .mx-glp-list li:last-child{border:none;}
        .mx-glp-list li::before{content:'→';position:absolute;left:0;color:var(--gold);font-size:0.6rem;opacity:0.7;}
        .mx-glp-note{background:rgba(201,168,76,0.06);border-left:2px solid var(--gold);border-radius:0 6px 6px 0;padding:1rem 1.5rem;font-size:0.8rem;color:var(--text);line-height:1.85;font-style:italic;}

        .mx-plans{background:var(--bg);padding-top:1rem;}
        .mx-plans-header{text-align:center;margin-bottom:3rem;}
        .mx-plans-header p{font-size:0.9rem;color:var(--text);margin-top:0.75rem;}
        .mx-plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;}

        .mx-plan{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:16px;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:transform .2s,border-color .2s;}
        .mx-plan:hover{transform:translateY(-4px);border-color:rgba(201,168,76,0.25);}
        /* Featured (middle) plan — gold, per request */
        .mx-plan.mx-featured{background:var(--gold);border:none;}
        .mx-plan-badge{position:absolute;top:0;left:50%;transform:translateX(-50%);background:var(--bg);color:var(--gold);font-size:0.57rem;letter-spacing:0.12em;text-transform:uppercase;padding:4px 16px;font-weight:500;border-radius:0 0 8px 8px;white-space:nowrap;}
        .mx-social-proof{display:flex;align-items:center;gap:0.5rem;margin-bottom:1rem;background:rgba(255,255,255,0.06);border-radius:100px;padding:0.3rem 0.85rem;width:fit-content;font-size:0.65rem;color:rgba(247,245,240,0.5);}
        .mx-plan.mx-featured .mx-social-proof{background:rgba(15,26,23,0.12);color:rgba(15,26,23,0.6);}
        .mx-social-proof::before{content:'✦';color:var(--gold);font-size:0.45rem;}
        .mx-plan.mx-featured .mx-social-proof::before{color:rgba(15,26,23,0.4);}
        .mx-plan-header{padding:2.25rem 2rem 1.5rem;}
        .mx-plan-tier{font-size:0.57rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(247,245,240,0.25);margin-bottom:0.4rem;}
        .mx-plan.mx-featured .mx-plan-tier{color:rgba(15,26,23,0.45);}
        .mx-plan-name{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:400;font-style:italic;color:var(--white);margin-bottom:0.5rem;}
        .mx-plan.mx-featured .mx-plan-name{color:var(--bg);}
        .mx-plan-tagline{font-size:0.78rem;color:var(--text);line-height:1.65;margin-bottom:1.5rem;}
        .mx-plan.mx-featured .mx-plan-tagline{color:rgba(15,26,23,0.65);}
        .mx-plan-price{font-family:'Cormorant Garamond',serif;font-size:3.2rem;font-weight:300;color:var(--gold);line-height:1;}
        .mx-plan.mx-featured .mx-plan-price{color:var(--bg);}
        .mx-plan-mo{font-family:'Inter',sans-serif;font-size:0.78rem;color:rgba(247,245,240,0.25);font-weight:300;margin-left:0.2rem;}
        .mx-plan.mx-featured .mx-plan-mo{color:rgba(15,26,23,0.45);}
        .mx-plan-commit{font-size:0.62rem;color:rgba(247,245,240,0.2);margin-top:0.35rem;}
        .mx-plan.mx-featured .mx-plan-commit{color:rgba(15,26,23,0.45);}
        .mx-plan-div{border:none;border-top:1px solid rgba(255,255,255,0.06);margin:1.25rem 0;}
        .mx-plan.mx-featured .mx-plan-div{border-top:1px solid rgba(15,26,23,0.15);}
        .mx-plan-body{padding:0 2rem;flex:1;}
        .mx-plan-slabel{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);opacity:0.65;font-weight:500;margin-bottom:0.65rem;margin-top:1.1rem;}
        .mx-plan.mx-featured .mx-plan-slabel{color:rgba(15,26,23,0.55);opacity:1;}
        .mx-plan-list{list-style:none;margin-bottom:0.5rem;}
        .mx-plan-list li{font-size:0.78rem;color:var(--text);padding:0.4rem 0 0.4rem 1.1rem;position:relative;border-bottom:1px solid rgba(255,255,255,0.04);line-height:1.5;}
        .mx-plan.mx-featured .mx-plan-list li{color:rgba(15,26,23,0.72);border-bottom:1px solid rgba(15,26,23,0.1);}
        .mx-plan-list li:last-child{border:none;}
        .mx-plan-list li::before{content:'—';position:absolute;left:0;color:var(--gold);font-size:0.6rem;opacity:0.6;}
        .mx-plan.mx-featured .mx-plan-list li::before{color:rgba(15,26,23,0.4);}
        .mx-plan-discount{background:rgba(201,168,76,0.07);border:1px solid rgba(201,168,76,0.18);border-radius:8px;padding:0.75rem 1rem;font-size:0.75rem;color:var(--gold);margin:1rem 0;line-height:1.6;display:flex;gap:0.5rem;align-items:flex-start;}
        .mx-plan-discount::before{content:'✦';flex-shrink:0;font-size:0.5rem;margin-top:0.25rem;}
        .mx-pick-this{background:rgba(74,124,111,0.08);border-left:2px solid var(--sage,#4a7c6f);border-radius:0 6px 6px 0;padding:0.85rem 1rem;font-size:0.76rem;color:rgba(247,245,240,0.5);line-height:1.65;margin:1rem 0;font-style:italic;}
        .mx-plan.mx-featured .mx-pick-this{background:rgba(15,26,23,0.1);border-left:2px solid rgba(15,26,23,0.3);color:rgba(15,26,23,0.6);}
        .mx-plan-footer{padding:1.5rem 2rem 2rem;}
        .mx-plan-cta{display:block;text-align:center;padding:0.95rem;font-size:0.64rem;letter-spacing:0.1em;text-transform:uppercase;font-family:'Inter',sans-serif;font-weight:500;cursor:pointer;transition:all .2s;border-radius:8px;width:100%;border:1px solid rgba(255,255,255,0.12);color:rgba(247,245,240,0.5);background:none;}
        .mx-plan-cta:hover{border-color:var(--gold);color:var(--gold);}
        .mx-plan.mx-featured .mx-plan-cta{background:var(--bg);color:var(--gold);border:none;}
        .mx-plan.mx-featured .mx-plan-cta:hover{background:var(--teal);}
        .mx-plan-cta:disabled{opacity:0.5;cursor:wait;}

        .mx-trust{background:rgba(74,124,111,0.07);border-top:1px solid rgba(74,124,111,0.12);border-bottom:1px solid rgba(74,124,111,0.12);padding:2.5rem 2rem;}
        .mx-trust-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;max-width:1120px;margin:0 auto;text-align:center;}
        .mx-trust-item h4{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--white);font-style:italic;margin-bottom:0.3rem;}
        .mx-trust-item p{font-size:0.74rem;color:var(--text);line-height:1.6;}

        .mx-compare{background:var(--bg);}
        .mx-compare-wrap{overflow-x:auto;}
        .mx-compare-table{width:100%;border-collapse:collapse;min-width:600px;}
        .mx-compare-table th{font-size:0.62rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:500;color:rgba(247,245,240,0.3);padding:1rem 1.25rem;text-align:left;border-bottom:1px solid rgba(255,255,255,0.06);}
        .mx-compare-table th:not(:first-child){text-align:center;}
        .mx-compare-table td{font-size:0.8rem;color:var(--text);padding:0.85rem 1.25rem;border-bottom:1px solid rgba(255,255,255,0.04);vertical-align:middle;}
        .mx-compare-table td:not(:first-child){text-align:center;}
        .mx-compare-table tr:hover td{background:rgba(255,255,255,0.02);}
        .mx-hl{background:rgba(201,168,76,0.04);}
        .mx-ch{color:#6b8f7e;font-size:1rem;}
        .mx-cx{color:rgba(255,255,255,0.1);}
        .mx-col-name{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:var(--white);}

        .mx-policy{background:var(--card);}
        .mx-policy-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
        .mx-pol-card{background:var(--bg);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:2rem;}
        .mx-pol-card h3{font-family:'Cormorant Garamond',serif;font-size:1.2rem;color:var(--white);font-style:italic;margin-bottom:1rem;}
        .mx-pol-card p{font-size:0.8rem;color:var(--text);line-height:1.85;}
        .mx-pol-card ul{list-style:none;margin-top:0.5rem;}
        .mx-pol-card ul li{font-size:0.8rem;color:var(--text);padding:0.35rem 0 0.35rem 1rem;position:relative;border-bottom:1px solid rgba(255,255,255,0.04);line-height:1.6;}
        .mx-pol-card ul li:last-child{border:none;}
        .mx-pol-card ul li::before{content:'—';position:absolute;left:0;color:var(--gold);opacity:0.5;font-size:0.6rem;}

        .mx-faq{background:var(--bg);}
        .mx-faq-wrap{max-width:760px;}
        .mx-faq-item{border-bottom:1px solid rgba(255,255,255,0.06);}
        .mx-faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 0;background:none;border:none;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--white);text-align:left;font-weight:400;}
        .mx-faq-a{padding-bottom:1.1rem;font-size:0.8rem;color:var(--text);line-height:1.9;}

        .mx-final{background:var(--card);padding:5rem 2rem;text-align:center;position:relative;overflow:hidden;}
        .mx-final::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 100%,rgba(74,124,111,0.15) 0%,transparent 65%);}
        .mx-final h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.8rem,5vw,3.4rem);font-weight:300;color:var(--white);line-height:1.1;margin-bottom:1rem;position:relative;z-index:1;}
        .mx-final h2 em{font-style:italic;color:var(--gold);}
        .mx-final p{font-size:0.9rem;color:var(--text);max-width:460px;margin:0 auto 2.5rem;line-height:1.9;position:relative;z-index:1;}
        .mx-final-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;position:relative;z-index:1;}
        .mx-btn-gold{font-family:'Inter',sans-serif;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;background:var(--gold);color:var(--bg);border:none;padding:1rem 2.5rem;cursor:pointer;text-decoration:none;font-weight:500;transition:opacity .2s;display:inline-block;border-radius:6px;}
        .mx-btn-gold:hover{opacity:0.85;}
        .mx-btn-ghost{font-family:'Inter',sans-serif;font-size:0.7rem;letter-spacing:0.1em;text-transform:uppercase;background:transparent;color:rgba(247,245,240,0.55);border:1px solid rgba(247,245,240,0.15);padding:1rem 2.5rem;cursor:pointer;text-decoration:none;font-weight:300;transition:all .2s;display:inline-block;border-radius:6px;}
        .mx-btn-ghost:hover{border-color:var(--gold);color:var(--gold);}

        @media(max-width:960px){
          .mx-plans-grid,.mx-glp-grid,.mx-policy-grid{grid-template-columns:1fr;}
          .mx-trust-grid{grid-template-columns:1fr 1fr;}
          .mx-sec{padding:3.5rem 1.5rem;}
        }
      `}</style>

      <div className="mx-topbar">
        <span className="mx-topbar-label">InHype Sanctuary Memberships</span>
        <button className="mx-close" onClick={onClose} aria-label="Close">✕</button>
      </div>

      {/* HERO */}
      <section className="mx-hero">
        <div className="mx-hero-inner">
          <p className="mx-hero-eye">Sanctuary Memberships · Glendale, California</p>
          <h1>Your body.<br/>Your protocol.<br/><em>Your transformation.</em></h1>
          <p className="mx-hero-sub">Three medically designed membership plans combining the most advanced GLP therapies, revolutionary body contouring, NAD+ cellular renewal, and full physician oversight, into one seamless monthly commitment.</p>
          <div className="mx-peptide-badge">InHype Sanctuary Peptide Guide, backed by 7 years of clinical data</div>
        </div>
      </section>

      {/* SCIENCE */}
      <section className="mx-science mx-sec">
        <div className="mx-inner">
          <p className="mx-s-eye">The science behind our protocols</p>
          <h2 className="mx-s-title">Two therapies. <em>One clear difference.</em></h2>
          <div className="mx-gbar"/>
          <div className="mx-science-intro">
            <p>Our GLP protocols are built around two of the most advanced weight loss therapies available today. Understanding what each one does, and how they differ, helps you choose the right plan. Both are administered weekly, titrated by physician, and adjusted based on how your body responds.</p>
          </div>
          <div className="mx-glp-grid">
            <div className="mx-glp-card">
              <div className="mx-glp-tag">Dual Agonist · Available in all plans</div>
              <div className="mx-glp-name">Tirzepatide</div>
              <div className="mx-glp-sub">Also known as Mounjaro</div>
              <div className="mx-glp-receptors">
                <span className="mx-receptor mx-active">GLP-1</span>
                <span className="mx-receptor mx-active">GIP</span>
                <span className="mx-receptor">Glucagon</span>
              </div>
              <p className="mx-glp-desc">Tirzepatide is an FDA-approved dual receptor agonist that activates two separate hormonal pathways to drive sustained, clinically significant weight loss.</p>
              <ul className="mx-glp-list">
                <li>FDA approved</li>
                <li>Clinically proven significant and sustained weight loss</li>
                <li>Fights systemic inflammation</li>
                <li>Weekly injection, dose titrated by physician</li>
                <li>Starting dose 2.5 mg, adjusted based on response</li>
              </ul>
            </div>
            <div className="mx-glp-card mx-reta">
              <div className="mx-glp-tag">Triple Agonist · Plans 2 &amp; 3 only</div>
              <div className="mx-glp-name">Retatrutide</div>
              <div className="mx-glp-sub">Next-generation, exclusive to InHype Sanctuary</div>
              <div className="mx-glp-receptors">
                <span className="mx-receptor mx-active">GLP-1</span>
                <span className="mx-receptor mx-active">GIP</span>
                <span className="mx-receptor mx-active">Glucagon</span>
              </div>
              <p className="mx-glp-desc">Retatrutide activates all three metabolic receptors. Unlike dual agonists, it has demonstrated a superior ability to preserve lean muscle mass during weight loss, resulting in a leaner, firmer physique and significantly less loose skin.</p>
              <ul className="mx-glp-list">
                <li>Triple receptor, GLP-1 + GIP + GLP-2</li>
                <li>Preferentially burns fat while preserving lean muscle</li>
                <li>Less loose skin, muscle preservation keeps the body firm</li>
                <li>Superior fat loss outcomes vs dual agonists in clinical data</li>
                <li>Reduces inflammation and supports gut health via GLP-2</li>
                <li>Available at any therapeutic dose, no ceiling</li>
                <li>Exclusive to Plus &amp; Elite members</li>
              </ul>
            </div>
          </div>
          <div className="mx-glp-note">Both therapies are highly effective. Tirzepatide is the proven, well-studied starting point. Retatrutide is for those ready to go further. Physician will guide which is right for you and when to transition.</div>
        </div>
      </section>

      {/* PLANS */}
      <section className="mx-plans mx-sec" id="mx-plans">
        <div className="mx-inner">
          <div className="mx-plans-header">
            <p className="mx-s-eye" style={{justifyContent:'center'}}>Choose your plan</p>
            <h2 className="mx-s-title">Three paths to <em>transformation.</em></h2>
            <p>All plans include MD physician oversight, weekly GLP injections, and a 6-month commitment. Doses are always adjusted by physician based on your individual response.</p>
          </div>
          <div className="mx-plans-grid">
            {DETAILED_PLANS.map(plan => (
              <div key={plan.id} className={`mx-plan${plan.featured ? ' mx-featured' : ''}`}>
                {plan.badge && <div className="mx-plan-badge">{plan.badge}</div>}
                <div className="mx-plan-header">
                  {plan.social && <div className="mx-social-proof">{plan.social}</div>}
                  <p className="mx-plan-tier">{plan.tier}</p>
                  <h3 className="mx-plan-name">{plan.name}</h3>
                  <p className="mx-plan-tagline">{plan.tagline}</p>
                  <div className="mx-plan-price">{plan.price}<span className="mx-plan-mo">/ mo</span></div>
                  <p className="mx-plan-commit">{plan.commit}</p>
                </div>
                <hr className="mx-plan-div"/>
                <div className="mx-plan-body">
                  {plan.groups.map(g => (
                    <div key={g.label}>
                      <p className="mx-plan-slabel">{g.label}</p>
                      <ul className="mx-plan-list">
                        {g.items.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                  {plan.discount && <div className="mx-plan-discount">{plan.discount}</div>}
                  <div className="mx-pick-this">{plan.pick}</div>
                </div>
                <div className="mx-plan-footer">
                  <button className="mx-plan-cta" disabled={loadingPlanId === plan.id} onClick={() => onCheckout(plan.id)}>
                    {loadingPlanId === plan.id ? 'Redirecting...' : 'Purchase Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="mx-trust">
        <div className="mx-trust-grid">
          {TRUST_ITEMS.map(t => (
            <div key={t.h} className="mx-trust-item"><h4>{t.h}</h4><p>{t.p}</p></div>
          ))}
        </div>
      </div>

      {/* BUY NOW CTA */}
      <div style={{textAlign:'center', padding:'2.75rem 2rem', background:'var(--bg)'}}>
        <a href="#mx-plans" className="mx-btn-gold">Buy Now</a>
      </div>

      {/* COMPARE */}
      <section className="mx-compare mx-sec">
        <div className="mx-inner">
          <p className="mx-s-eye">Side by side</p>
          <h2 className="mx-s-title">Everything <em>compared.</em></h2>
          <div className="mx-gbar"/>
          <div className="mx-compare-wrap">
            <table className="mx-compare-table">
              <thead>
                <tr>
                  <th></th>
                  <th><span className="mx-col-name">Core</span><br/>$399/mo</th>
                  <th className="mx-hl"><span className="mx-col-name">Plus ✦</span><br/>$499/mo</th>
                  <th><span className="mx-col-name">Elite</span><br/>$899/mo</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(row => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>{row.core === 'check' ? <span className="mx-ch">✓</span> : row.core === 'x' ? <span className="mx-cx">—</span> : row.core}</td>
                    <td className="mx-hl">{row.plus === 'check' ? <span className="mx-ch">✓</span> : row.plus === 'x' ? <span className="mx-cx">—</span> : row.plus}</td>
                    <td>{row.elite === 'check' ? <span className="mx-ch">✓</span> : row.elite === 'x' ? <span className="mx-cx">—</span> : row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{textAlign:'center', paddingTop:'2.75rem'}}>
          <a href="#mx-plans" className="mx-btn-gold">Buy Now</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-faq mx-sec">
        <div className="mx-inner">
          <p className="mx-s-eye">Common questions</p>
          <h2 className="mx-s-title">Your questions, <em>answered.</em></h2>
          <div className="mx-gbar"/>
          <div className="mx-faq-wrap">
            {MODAL_FAQ.map((item, i) => (
              <div key={i} className="mx-faq-item">
                <button className="mx-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.q}
                  <span style={{fontSize:'1.3rem',fontWeight:200,color:'var(--gold)',flexShrink:0,marginLeft:'1rem'}}>{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq === i && <div className="mx-faq-a">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POLICY */}
      <section className="mx-policy mx-sec">
        <div className="mx-inner">
          <p className="mx-s-eye">Policies &amp; information</p>
          <h2 className="mx-s-title">What you need <em>to know.</em></h2>
          <div className="mx-gbar"/>
          <div className="mx-policy-grid">
            <div className="mx-pol-card">
              <h3>Commitment &amp; Cancellation</h3>
              <ul>
                <li>All memberships are locked for the initial 6-month term, no cancellations during this period</li>
                <li>After month 6, membership automatically converts to month-to-month</li>
                <li>Month-to-month memberships can be cancelled anytime with 30 days written notice</li>
                <li>No refunds issued for the current billing month once treatment has begun</li>
                <li>Upgrading to a higher plan can be done at any time with no penalty</li>
              </ul>
            </div>
            <div className="mx-pol-card">
              <h3>After You Purchase</h3>
              <ul>
                <li>Our team will contact you within 24 hours to schedule your first appointment</li>
                <li>A complimentary consultation is required before starting, physician reviews your health profile and provides a bloodwork requisition</li>
                <li>Bloodwork must be completed and reviewed by physician before treatment begins, this is a medical requirement, not optional</li>
                <li>We guide you through the entire process from consultation to first appointment</li>
                <li>Physician reviews your protocol and adjusts doses monthly</li>
              </ul>
            </div>
            <div className="mx-pol-card">
              <h3>Medical Disclaimer</h3>
              <p>All GLP therapies are medical treatments administered under licensed MD physician supervision. Individual results vary. Protocols are personalized, doses, therapy type, and frequency are adjusted based on your health profile and response. InHype Sanctuary does not guarantee specific outcomes. All members undergo a medical assessment prior to beginning treatment.</p>
            </div>
            <div className="mx-pol-card">
              <h3>Have Questions?</h3>
              <p>Our team is available to answer any questions before you commit to a plan. Call or text us directly, no pressure, no obligation.</p>
              <p style={{marginTop:'1.25rem'}}><a href="tel:2093300033" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'1.4rem',color:'var(--gold)',textDecoration:'none',fontStyle:'italic'}}>(209) 330-0033</a></p>
              <p style={{marginTop:'0.4rem'}}><a href="mailto:inhype.sanctuary@icloud.com" style={{fontSize:'0.8rem',color:'var(--text)',textDecoration:'none'}}>inhype.sanctuary@icloud.com</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-final">
        <h2>Your transformation<br/>starts with <em>one decision.</em></h2>
        <p>Choose your plan above, or call us and we'll guide you through it.</p>
        <div className="mx-final-btns">
          <a href="#mx-plans" className="mx-btn-gold">View Plans</a>
          <a href="tel:2093300033" className="mx-btn-ghost">Call — (209) 330-0033</a>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab]   = useState('injections');
  const [activeLaser, setActiveLaser] = useState(null);
  const [loading, setLoading]       = useState(null);
  const [navOpen, setNavOpen]       = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);

  useEffect(() => {
    function onPopState() { setMembershipOpen(false); }
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function openMembership() {
    if (typeof window !== 'undefined') {
      window.history.pushState({ membership: true }, '', '#membership-details');
    }
    setMembershipOpen(true);
  }

  function closeMembership() {
    if (typeof window !== 'undefined' && window.history.state && window.history.state.membership) {
      window.history.back();
    } else {
      setMembershipOpen(false);
    }
  }

  async function handleCheckout(planId) {
    setLoading(planId);
    try {
      const res  = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ plan: planId }) });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch { alert('Something went wrong. Please call us at (209) 330-0033'); }
    setLoading(null);
  }

  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
    setNavOpen(false);
  }

  return (
    <>
      <Head>
        <title>InHype Sanctuary — Wellness & Beauty Spa · Glendale, CA</title>
        <meta name="description" content="Medical spa in Glendale, CA — GLP therapy, LPG Endermologie, laser hair removal, and advanced aesthetics." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg:#0f1a17;--card:#162018;--card2:#1c2a22;--teal:#1e3a2f;
          --gold:#c9a84c;--gold2:#e2c06a;--white:#f7f5f0;
          --text:rgba(247,245,240,0.55);--border:rgba(201,168,76,0.14);
          --r:16px;
        }
        html{scroll-behavior:smooth;}
        body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);font-weight:300;line-height:1.75;overflow-x:hidden;}

        /* NAV */
        nav{position:fixed;top:0;left:0;right:0;z-index:300;display:flex;align-items:center;justify-content:space-between;padding:0 3rem;height:68px;background:rgba(15,26,23,0.97);backdrop-filter:blur(24px);border-bottom:1px solid var(--border);}
        .nl{display:flex;align-items:center;gap:0.65rem;font-family:'Cormorant Garamond',serif;font-size:1.1rem;color:var(--white);font-style:italic;background:none;border:none;cursor:pointer;letter-spacing:0.02em;}
        .nl-logo{width:34px;height:34px;border-radius:50%;object-fit:cover;flex-shrink:0;}
        .f-logo{width:48px;height:48px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 1rem;}
        .nm{display:flex;gap:2rem;list-style:none;align-items:center;}
        .nm button{font-size:0.64rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(247,245,240,0.38);background:none;border:none;cursor:pointer;transition:color .2s;font-family:'Inter',sans-serif;}
        .nm button:hover{color:var(--gold);}
        .nb{background:var(--gold);color:var(--bg);font-size:0.64rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.55rem 1.5rem;font-weight:500;border:none;cursor:pointer;border-radius:8px;transition:opacity .2s;font-family:'Inter',sans-serif;text-decoration:none;}
        .nb:hover{opacity:0.85;}
        .hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:0.4rem;}
        .hbg span{display:block;width:22px;height:1.5px;background:var(--gold);border-radius:2px;}
        .mob-menu{position:fixed;top:68px;left:0;right:0;background:rgba(15,26,23,0.99);padding:2rem;display:flex;flex-direction:column;gap:1.25rem;z-index:299;border-bottom:1px solid var(--border);}
        .mob-menu button{font-size:0.78rem;letter-spacing:0.12em;text-transform:uppercase;color:rgba(247,245,240,0.55);background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;text-align:left;padding:0.4rem 0;}

        /* HERO — no image, full dark */
        .hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8rem 3rem 6rem;text-align:center;position:relative;background:var(--bg);overflow:hidden;}
        .hero-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;}
        .hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(rgba(15,26,23,0.6),rgba(15,26,23,0.78)),radial-gradient(ellipse 80% 60% at 50% 40%,rgba(30,58,47,0.35) 0%,transparent 70%);pointer-events:none;}
        .hero-content{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;}
        .hero-trust{display:inline-flex;align-items:center;gap:0.6rem;background:rgba(201,168,76,0.08);border:1px solid rgba(201,168,76,0.25);border-radius:100px;padding:0.55rem 1.4rem;font-size:0.72rem;color:var(--gold2);letter-spacing:0.03em;margin-bottom:1.5rem;}
        .hero-tag{display:inline-flex;align-items:center;gap:0.7rem;font-size:0.6rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);margin-bottom:2rem;opacity:0.75;}
        .hero-tag::before,.hero-tag::after{content:'';width:24px;height:1px;background:var(--gold);opacity:0.5;}
        .hero h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.4rem,5.2vw,4.75rem);font-weight:300;color:var(--white);line-height:1.08;margin-bottom:1.75rem;position:relative;}
        .hero h1 em{font-style:italic;color:var(--gold);}
        .hero p{font-size:0.92rem;color:var(--text);max-width:860px;line-height:1.85;margin-bottom:3rem;position:relative;}
        .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;justify-content:center;position:relative;}
        .btn-primary{font-family:'Inter',sans-serif;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;background:var(--gold);color:var(--bg);border:none;padding:1rem 2.5rem;cursor:pointer;text-decoration:none;font-weight:500;transition:opacity .2s;display:inline-block;border-radius:10px;}
        .btn-primary:hover{opacity:0.86;}
        .btn-outline{font-family:'Inter',sans-serif;font-size:0.68rem;letter-spacing:0.1em;text-transform:uppercase;background:transparent;color:rgba(247,245,240,0.55);border:1px solid rgba(247,245,240,0.16);padding:1rem 2.5rem;cursor:pointer;text-decoration:none;font-weight:300;transition:all .2s;display:inline-block;border-radius:10px;}
        .btn-outline:hover{border-color:var(--gold);color:var(--gold);}

        /* MARQUEE */
        .marquee-wrap{overflow:hidden;background:rgba(201,168,76,0.07);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:0.9rem 0;}
        .marquee-track{display:flex;width:max-content;animation:marquee 32s linear infinite;}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}

        .marquee-item{display:flex;align-items:center;gap:1.5rem;padding:0 2.5rem;white-space:nowrap;font-size:0.62rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(247,245,240,0.3);}
        .marquee-item::after{content:'✦';color:var(--gold);opacity:0.5;font-size:0.45rem;}

        /* SECTIONS */
        .sec{padding:6rem 3rem;}
        .inner{max-width:1140px;margin:0 auto;}
        .s-eye{font-size:0.59rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--gold);opacity:0.75;margin-bottom:0.9rem;font-weight:500;display:flex;align-items:center;gap:0.7rem;}
        .s-eye::before{content:'';width:16px;height:1px;background:var(--gold);opacity:0.5;}
        .s-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3.4rem);font-weight:300;color:var(--white);line-height:1.1;margin-bottom:1rem;}
        .s-title em{font-style:italic;color:var(--gold);}

        /* ABOUT */
        .about{background:var(--teal);}
        .about-inner{max-width:760px;margin:0 auto;text-align:center;}
        .about-inner p{font-size:0.92rem;color:var(--text);line-height:1.95;margin-bottom:1rem;}
        .pillars{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:3rem;}
        .pil{background:rgba(0,0,0,0.15);border:1px solid rgba(201,168,76,0.1);border-radius:var(--r);padding:1.75rem 1.25rem;text-align:left;transition:transform .25s,border-color .25s,box-shadow .25s;}
        .pil:hover{transform:translateY(-4px);border-color:rgba(201,168,76,0.3);box-shadow:0 12px 30px rgba(0,0,0,0.35);}
        .pil-name{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--gold);margin-bottom:0.3rem;font-style:italic;}
        .pil-desc{font-size:0.74rem;color:rgba(247,245,240,0.3);line-height:1.65;}

        /* QUOTE */
        .quote{background:var(--bg);padding:5rem 3rem;text-align:center;}
        .quote blockquote{font-family:'Cormorant Garamond',serif;font-size:clamp(1.5rem,3vw,2.6rem);font-weight:300;font-style:italic;color:var(--white);max-width:800px;margin:0 auto;line-height:1.5;}
        .quote cite{display:block;font-style:normal;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--gold);opacity:0.6;margin-top:1.75rem;}

        /* MEMBERSHIP */
        .membership{background:var(--card);}
        .mem-intro{display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:end;margin-bottom:3.5rem;}
        .mem-intro p{font-size:0.9rem;color:var(--text);line-height:1.9;margin-top:0.75rem;}
        .mem-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
        .mc{background:var(--card2);padding:2.5rem 2rem;position:relative;border-radius:var(--r);border:1px solid rgba(255,255,255,0.05);transition:transform .25s,border-color .25s,box-shadow .25s;}
        .mc:hover{transform:translateY(-4px);border-color:rgba(201,168,76,0.3);box-shadow:0 12px 30px rgba(0,0,0,0.35);}
        .mc.feat{background:var(--gold);border:none;}
        .mc-badge{position:absolute;top:-1px;left:50%;transform:translateX(-50%);background:var(--bg);color:var(--gold);font-size:0.55rem;letter-spacing:0.14em;text-transform:uppercase;padding:4px 16px;font-weight:500;border-radius:0 0 8px 8px;white-space:nowrap;border:1px solid var(--border);border-top:none;}
        .mc-tier{font-size:0.55rem;letter-spacing:0.18em;text-transform:uppercase;color:rgba(247,245,240,0.2);margin-bottom:0.4rem;}
        .mc.feat .mc-tier{color:rgba(15,26,23,0.45);}
        .mc-name{font-family:'Cormorant Garamond',serif;font-size:1.8rem;font-weight:400;font-style:italic;color:var(--white);margin-bottom:0.5rem;}
        .mc.feat .mc-name{color:var(--bg);}
        .mc-tag{font-size:0.77rem;color:var(--text);line-height:1.65;margin-bottom:1.5rem;}
        .mc.feat .mc-tag{color:rgba(15,26,23,0.65);}
        .mc-price{font-family:'Cormorant Garamond',serif;font-size:3.4rem;font-weight:300;color:var(--gold);line-height:1;}
        .mc.feat .mc-price{color:var(--bg);}
        .mc-mo{font-family:'Inter',sans-serif;font-size:0.76rem;color:rgba(247,245,240,0.22);font-weight:300;margin-left:0.2rem;}
        .mc.feat .mc-mo{color:rgba(15,26,23,0.45);}
        .mc-commit{font-size:0.63rem;color:rgba(247,245,240,0.18);margin:0.4rem 0 1.5rem;}
        .mc.feat .mc-commit{color:rgba(15,26,23,0.45);}
        .mc-div{border:none;border-top:1px solid rgba(255,255,255,0.06);margin-bottom:1.5rem;}
        .mc.feat .mc-div{border-top:1px solid rgba(15,26,23,0.15);}
        .mc-list{list-style:none;margin-bottom:2rem;}
        .mc-list li{font-size:0.77rem;color:var(--text);padding:0.42rem 0 0.42rem 1.1rem;position:relative;border-bottom:1px solid rgba(255,255,255,0.04);line-height:1.5;}
        .mc.feat .mc-list li{color:rgba(15,26,23,0.72);border-bottom:1px solid rgba(15,26,23,0.1);}
        .mc-list li:last-child{border:none;}
        .mc-list li::before{content:'—';position:absolute;left:0;color:var(--gold);opacity:0.5;font-size:0.6rem;}
        .mc.feat .mc-list li::before{color:rgba(15,26,23,0.4);}
        .mc-pick{background:rgba(201,168,76,0.06);border-left:2px solid var(--gold);padding:0.75rem 1rem;font-size:0.74rem;color:rgba(247,245,240,0.4);font-style:italic;margin-bottom:1.5rem;line-height:1.6;border-radius:0 8px 8px 0;}
        .mc.feat .mc-pick{background:rgba(15,26,23,0.1);border-left:2px solid rgba(15,26,23,0.3);color:rgba(15,26,23,0.6);}
        .mc-social{font-size:0.64rem;color:rgba(247,245,240,0.45);background:rgba(255,255,255,0.05);border-radius:100px;padding:0.3rem 0.9rem;margin-bottom:0.85rem;display:inline-block;}
        .mc.feat .mc-social{background:rgba(15,26,23,0.12);color:rgba(15,26,23,0.55);}
        .mc-cta{display:block;text-align:center;padding:0.95rem;border:1px solid rgba(255,255,255,0.1);font-size:0.64rem;letter-spacing:0.1em;text-transform:uppercase;cursor:pointer;background:transparent;color:rgba(247,245,240,0.5);width:100%;transition:all .2s;font-family:'Inter',sans-serif;font-weight:500;border-radius:9px;}
        .mc-cta:hover{background:var(--gold);color:var(--bg);border-color:var(--gold);}
        .mc.feat .mc-cta{background:var(--bg);color:var(--gold);border:none;}
        .mc.feat .mc-cta:hover{background:var(--teal);}
        .mc-cta:disabled{opacity:0.5;cursor:wait;}
        .mem-note{text-align:center;font-size:0.68rem;color:rgba(247,245,240,0.18);line-height:1.9;margin-top:2.5rem;}

        /* MEMBERSHIP TEASER */
        .mem-teaser{background:var(--card);text-align:center;}
        .mem-teaser-inner{max-width:640px;margin:0 auto 3rem;display:flex;flex-direction:column;align-items:center;}
        .mem-teaser-p{font-size:0.92rem;color:var(--text);line-height:1.9;margin-top:1rem;}

        /* SERVICES */
        .services{background:var(--bg);}
        .tab-row{display:flex;border-bottom:1px solid rgba(201,168,76,0.1);margin-bottom:3rem;overflow-x:auto;scrollbar-width:none;margin-top:2rem;}
        .tab-row::-webkit-scrollbar{display:none;}
        .tab{font-family:'Inter',sans-serif;font-size:0.63rem;letter-spacing:0.14em;text-transform:uppercase;background:none;border:none;border-bottom:2px solid transparent;padding:0.85rem 1.4rem;cursor:pointer;color:rgba(247,245,240,0.28);transition:all .2s;white-space:nowrap;margin-bottom:-1px;font-weight:400;}
        .tab:hover{color:rgba(247,245,240,0.6);}
        .tab.on{color:var(--white);border-bottom-color:var(--gold);}
        .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1rem;}
        .card{background:var(--card);padding:2.25rem 2rem;transition:transform .25s,border-color .25s,box-shadow .25s;border-radius:var(--r);border:1px solid rgba(255,255,255,0.04);}
        .card:hover{transform:translateY(-4px);border-color:rgba(201,168,76,0.3);box-shadow:0 12px 30px rgba(0,0,0,0.35);}
        .card h3{font-family:'Cormorant Garamond',serif;font-size:1.25rem;font-weight:400;color:var(--white);margin-bottom:0.6rem;}
        .card p{font-size:0.78rem;color:var(--text);line-height:1.85;}

        .peptide-cats{display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem 2.5rem;}
        .peptide-cat-name{font-family:'Cormorant Garamond',serif;font-size:1.15rem;font-style:italic;color:var(--gold);margin-bottom:0.85rem;}
        .peptide-tags{display:flex;flex-wrap:wrap;gap:0.55rem;}
        .peptide-tag{background:var(--card);border:1px solid rgba(255,255,255,0.06);border-radius:100px;padding:0.5rem 1.1rem;font-size:0.76rem;color:var(--text);}

        /* LASER */
        .laser{background:var(--card);}
        .laser-grid{display:grid;grid-template-columns:1fr 1fr;gap:4.5rem;align-items:start;margin-top:3rem;}
        .laser-left p{font-size:0.88rem;color:var(--text);line-height:1.9;margin-bottom:2rem;}
        .laser-btns{display:grid;grid-template-columns:1fr 1fr;gap:0.6rem;}
        .l-btn{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);padding:0.88rem 1rem;cursor:pointer;font-family:'Inter',sans-serif;font-size:0.76rem;color:rgba(247,245,240,0.45);text-align:left;transition:all .2s;display:flex;align-items:center;gap:0.55rem;border-radius:10px;}
        .l-btn.on,.l-btn:hover{background:rgba(201,168,76,0.08);border-color:rgba(201,168,76,0.3);color:var(--white);}
        .laser-right{position:sticky;top:88px;}
        .laser-ph{border:1px dashed rgba(255,255,255,0.07);padding:3.5rem;text-align:center;font-size:0.76rem;color:rgba(247,245,240,0.18);border-radius:var(--r);}
        .laser-detail{background:var(--card2);border:1px solid rgba(201,168,76,0.15);padding:2.5rem;border-radius:var(--r);}
        .laser-detail h3{font-family:'Cormorant Garamond',serif;font-size:1.55rem;color:var(--white);margin-bottom:0.75rem;font-style:italic;}
        .laser-detail p{font-size:0.82rem;color:var(--text);line-height:1.85;margin-bottom:1.5rem;}
        .sub-list{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:0.4rem;margin-bottom:2rem;}
        .sub-list li{font-size:0.74rem;color:var(--text);padding:0.4rem 0.7rem;background:rgba(255,255,255,0.03);border-left:2px solid rgba(201,168,76,0.25);border-radius:0 6px 6px 0;}

        /* FAQ */
        .faq-list{max-width:740px;margin-top:1rem;}
        .faq-item{border-bottom:1px solid rgba(255,255,255,0.05);}
        .faq-q{width:100%;display:flex;justify-content:space-between;align-items:center;padding:1.1rem 0;background:none;border:none;cursor:pointer;font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--white);text-align:left;font-weight:400;}
        .faq-a{padding-bottom:1rem;font-size:0.8rem;color:var(--text);line-height:1.9;}

        /* CONTACT */
        .contact{background:var(--teal);}
        .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;}
        .contact-info p{font-size:0.9rem;color:var(--text);line-height:1.9;margin-bottom:2.5rem;max-width:380px;}
        .ci{display:flex;gap:1.2rem;margin-bottom:1.75rem;align-items:flex-start;}
        .ci-icon{width:38px;height:38px;border-radius:50%;border:1px solid rgba(201,168,76,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.85rem;background:rgba(201,168,76,0.06);}
        .ci-label{font-size:0.56rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(247,245,240,0.25);margin-bottom:0.2rem;}
        .ci-val{font-size:0.88rem;color:rgba(247,245,240,0.72);text-decoration:none;display:block;}
        .ci-val:hover{color:var(--gold);}
        .form-wrap{background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.06);padding:2.5rem;border-radius:var(--r);}
        .form-wrap h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:300;font-style:italic;color:var(--white);margin-bottom:1.5rem;}
        .contact-cta-wrap{display:flex;flex-direction:column;align-items:center;text-align:center;justify-content:center;}
        .contact-cta-p{font-size:0.88rem;color:var(--text);line-height:1.8;margin-bottom:2rem;}
        .contact-cta-btn{width:100%;text-align:center;margin-bottom:1rem;}
        .contact-cta-btn:last-child{margin-bottom:0;}
        .fg{margin-bottom:1.1rem;}
        .fg label{display:block;font-size:0.57rem;letter-spacing:0.14em;text-transform:uppercase;color:rgba(247,245,240,0.26);margin-bottom:0.4rem;font-weight:500;}
        .fg input,.fg select,.fg textarea{width:100%;padding:0.8rem 1rem;border:1px solid rgba(255,255,255,0.08);background:rgba(255,255,255,0.04);font-family:'Inter',sans-serif;font-size:0.86rem;font-weight:300;color:var(--white);outline:none;transition:border-color .2s;border-radius:8px;appearance:none;}
        .fg select option{background:#1e3a2f;}
        .fg input:focus,.fg select:focus,.fg textarea:focus{border-color:var(--gold);}
        .fg textarea{resize:vertical;min-height:90px;}
        .form-btn{width:100%;padding:1rem;margin-top:0.5rem;background:var(--gold);color:var(--bg);border:none;font-family:'Inter',sans-serif;font-size:0.68rem;letter-spacing:0.12em;text-transform:uppercase;cursor:pointer;font-weight:500;transition:opacity .2s;border-radius:9px;}
        .form-btn:hover{opacity:0.86;}

        /* FINAL CTA BANNER */
        .final-banner{background:var(--gold);text-align:center;padding:5rem 3rem;}
        .final-banner-h{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,3rem);font-weight:300;color:var(--bg);margin-bottom:2rem;}
        .final-banner-h em{font-style:italic;color:rgba(15,26,23,0.55);}
        .final-banner .btn-primary{background:var(--bg);color:var(--gold);}
        .final-banner .btn-primary:hover{opacity:0.85;}

        /* FOOTER */
        footer{background:var(--bg);border-top:1px solid rgba(255,255,255,0.05);padding:4rem 3rem 2.5rem;text-align:center;}
        .f-name{font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:rgba(247,245,240,0.65);font-style:italic;margin-bottom:0.3rem;}
        .f-sub{font-size:0.56rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(247,245,240,0.16);margin-bottom:2rem;}
        .f-links{display:flex;justify-content:center;flex-wrap:wrap;gap:2rem;list-style:none;margin-bottom:2rem;}
        .f-links button{font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(247,245,240,0.2);background:none;border:none;cursor:pointer;transition:color .2s;font-family:'Inter',sans-serif;}
        .f-links button:hover{color:var(--gold);}
        .f-links a{font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;color:rgba(247,245,240,0.2);text-decoration:none;transition:color .2s;}
        .f-links a:hover{color:var(--gold);}
        .f-copy{font-size:0.62rem;color:rgba(247,245,240,0.12);}

        /* RESPONSIVE */
        @media(max-width:960px){
          nav{padding:0 1.5rem;}
          .nm{display:none;}
          .hbg{display:flex;}
          .hero{padding:7rem 1.5rem 5rem;}
          .about-inner{text-align:left;}
          .pillars{grid-template-columns:1fr 1fr;}
          .mem-intro,.contact-grid{grid-template-columns:1fr;}
          .mem-grid{grid-template-columns:1fr;}
          .peptide-cats{grid-template-columns:1fr;}
          .laser-grid{grid-template-columns:1fr;}
          .laser-right{position:static;}
          .sec{padding:4rem 1.5rem;}
        }
        @media(max-width:600px){
          .pillars{grid-template-columns:1fr;}
          .laser-btns{grid-template-columns:1fr;}
        }
      `}</style>

      {/* NAV */}
      <nav>
        <button className="nl" onClick={() => go('hero')}>
          <img src="/logo.webp" alt="InHype Sanctuary" className="nl-logo" />
          InHype Sanctuary
        </button>
        <ul className="nm">
          {['membership','services','about','contact'].map(id => (
            <li key={id}><button onClick={() => go(id)}>{id.charAt(0).toUpperCase()+id.slice(1)}</button></li>
          ))}
        </ul>
        <a href="https://www.vagaro.com/httpswwwvagarocomlpglosangeles/book-now" target="_blank" rel="noreferrer" className="nb">Book Now</a>
        <button className="hbg" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </nav>

      {navOpen && (
        <div className="mob-menu">
          {['membership','services','about','contact'].map(id => (
            <button key={id} onClick={() => go(id)}>{id.charAt(0).toUpperCase()+id.slice(1)}</button>
          ))}
          <a href="https://www.vagaro.com/httpswwwvagarocomlpglosangeles/book-now" target="_blank" rel="noreferrer" className="btn-primary" style={{textAlign:'center',marginTop:'0.5rem'}}>Book Now</a>
        </div>
      )}

      {/* HERO — video background */}
      <section id="hero" className="hero">
        <video
          className="hero-video"
          src="/hero-bg.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-trust">★★★★★ Over 10,000 patients trusted us for their weightloss journey</div>
          <p className="hero-tag">Glendale, California · Medical Spa</p>
          <h1>Over 7 Years Making Patients<br/>Look Like <em>Supermodels</em><br/>&amp; Perform at Their Strongest</h1>
          <p>Cutting-edge Medical Spa specialised on advanced therapy, including medically supervised weight loss programs, wellness and immune system boosts, body remodeling and skin tightening, and precision peptide stacking, backed by over 7 years in business.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => go('membership')}>Find Your Membership</button>
            <a href="https://www.vagaro.com/httpswwwvagarocomlpglosangeles/book-now" target="_blank" rel="noreferrer" className="btn-outline">Book Consultation</a>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP TEASER — very first section, before all other services */}
      <section id="membership" className="mem-teaser sec">
        <div className="inner">
          <div className="mem-teaser-inner">
            <p className="s-eye" style={{justifyContent:'center'}}>Membership plans</p>
            <h2 className="s-title">Invest in <em>yourself</em></h2>
            <p className="mem-teaser-p">See which plan is right for you.</p>
          </div>

          <div className="mem-grid">
            {PLANS.map(plan => (
              <div key={plan.id} className={`mc${plan.featured ? ' feat' : ''}`}>
                {plan.badge && <div className="mc-badge">{plan.badge}</div>}
                <p className="mc-tier">{plan.tier}</p>
                <h3 className="mc-name">{plan.name}</h3>
                <p className="mc-tag">{plan.tag}</p>
                <div className="mc-price">{plan.price}<span className="mc-mo">/ mo</span></div>
                <p className="mc-commit">{plan.commit}</p>
                <hr className="mc-div"/>
                <ul className="mc-list">
                  {plan.features.slice(0, 3).map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div style={{textAlign:'center', marginTop:'2.5rem'}}>
            <button className="btn-primary" onClick={openMembership}>Compare Plans</button>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) =>
            ['GLP Therapy','LPG Endermologie','Morpheus8','NAD+ Injections','Laser Hair Removal','Peptide Therapy','Forma','Evolve','Lumecca','Compression Therapy'].map((item, j) => (
              <span key={`${i}-${j}`} className="marquee-item">{item}</span>
            ))
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="about sec">
        <div className="inner">
          <div className="about-inner">
            <p className="s-eye">Our philosophy</p>
            <h2 className="s-title">A <em>sanctuary</em> for real transformation</h2>
            <p style={{marginTop:'1rem'}}>Since 2019, InHype Sanctuary has been built on a single belief: that every person deserves access to science-backed treatments that actually work. We combine physician supervision with the world's most advanced body contouring and metabolic therapies.</p>
            <p>From our Glendale location, we serve clients who are serious about results, not trends.</p>
          </div>
          <div className="pillars">
            {[
              {name:'Physician-Led',  desc:'Every treatment plan reviewed and approved by our medical team.'},
              {name:'Evidence-Based', desc:'Only therapies with proven clinical outcomes.'},
              {name:'Personalized',   desc:'Your body, your goals, your protocol.'},
              {name:'Discreet',       desc:'A private sanctuary where you focus on transformation.'},
            ].map(p => (
              <div key={p.name} className="pil">
                <p className="pil-name">{p.name}</p>
                <p className="pil-desc">{p.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'3rem'}}>
            <button className="btn-primary" onClick={openMembership}>Buy Now</button>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <div className="quote">
        <blockquote>"The body achieves what the mind believes, and science gives it the tools to get there."</blockquote>
        <cite>InHype Sanctuary · Glendale, CA</cite>
        <div style={{marginTop:'2rem'}}>
          <button className="btn-primary" onClick={openMembership}>Buy Now</button>
        </div>
      </div>

      {/* SERVICES */}
      <section id="services" className="services sec">
        <div className="inner">
          <p className="s-eye">What we offer</p>
          <h2 className="s-title">Our <em>Services</em></h2>
          <div className="tab-row">
            {[
              {id:'injections', label:'Injections & GLP'},
              {id:'peptide',    label:'Precision Peptide Stacking'},
              {id:'face',       label:'Face & Skin'},
              {id:'body',       label:'Body Contouring'},
            ].map(t => (
              <button key={t.id} className={`tab${activeTab===t.id?' on':''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>

          {activeTab==='injections' && <div className="cards">
            {[
              {h:'Tirzepatide (Mounjaro)', p:'FDA-approved GLP-1/GIP dual agonist. Clinically proven for significant, sustained weight loss with physician supervision.'},
              {h:'Retatrutide',            p:'Triple agonist (GLP-1, GIP + Glucagon), Phase 3 clinical trials. The most advanced weight loss therapy available.'},
              {h:'NAD+ Injections',        p:'Cellular energy restoration. Supports metabolic function, cognitive clarity, and anti-aging at the cellular level.'},
            ].map(c => <div key={c.h} className="card"><h3>{c.h}</h3><p>{c.p}</p></div>)}
          </div>}

          {activeTab==='peptide' && <div className="peptide-cats">
            {PEPTIDE_CATEGORIES.map(cat => (
              <div key={cat.cat} className="peptide-cat">
                <p className="peptide-cat-name">{cat.cat}</p>
                <div className="peptide-tags">
                  {cat.items.map(item => <span key={item} className="peptide-tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>}

          {activeTab==='face' && <div className="cards">
            {[
              {h:'Morpheus8',  p:'Fractional RF microneedling, skin tightening, scar reduction, and collagen induction.'},
              {h:'PRP Therapy',p:'Platelet-rich plasma for skin regeneration, hair restoration, and accelerated healing.'},
              {h:'SkinPen',    p:'Medical-grade microneedling to improve texture, tone, and fine lines.'},
              {h:'Forma',      p:'Non-invasive radiofrequency for facial contouring and skin firming.'},
              {h:'Lumecca',    p:'Intense pulsed light for pigmentation, redness, and overall skin clarity.'},
            ].map(c => <div key={c.h} className="card"><h3>{c.h}</h3><p>{c.p}</p></div>)}
          </div>}

          {activeTab==='body' && <div className="cards">
            {[
              {h:'Morpheus8 Body',    p:'Deep RF microneedling for body skin tightening and fat remodeling.'},
              {h:'Evolve Transform',  p:'Non-surgical body contouring combining RF and electrical muscle stimulation.'},
              {h:'Evolve Tone',       p:'Electrical muscle stimulation for muscle definition and body sculpting.'},
              {h:'LPG Endermologie',  p:'FDA-cleared mechanical stimulation for cellulite reduction and body contouring.'},
              {h:'Compression Therapy', p:'35-minute pneumatic compression sessions to boost circulation, reduce swelling, and accelerate recovery.'},
            ].map(c => <div key={c.h} className="card"><h3>{c.h}</h3><p>{c.p}</p></div>)}
          </div>}

          <div style={{textAlign:'center', marginTop:'3rem'}}>
            <button className="btn-primary" onClick={openMembership}>Buy Now</button>
          </div>
        </div>
      </section>

      {/* LASER */}
      <section className="laser sec" id="laser">
        <div className="inner">
          <p className="s-eye">Permanent hair reduction</p>
          <h2 className="s-title">Laser Hair <em>Removal</em></h2>
          <div className="laser-grid">
            <div className="laser-left">
              <p>Smooth, lasting results for every area of the body, performed with precision and care. Select an area to see what's included.</p>
              <div className="laser-btns">
                {Object.entries(LASER_OPTIONS).map(([key, val]) => (
                  <button key={key} className={`l-btn${activeLaser===key?' on':''}`} onClick={() => setActiveLaser(key)}>{val.title}</button>
                ))}
              </div>
            </div>
            <div className="laser-right">
              {!activeLaser
                ? <div className="laser-ph">Select an area to see details</div>
                : <div className="laser-detail">
                    <h3>{LASER_OPTIONS[activeLaser].title}</h3>
                    <p>{LASER_OPTIONS[activeLaser].desc}</p>
                    {LASER_OPTIONS[activeLaser].areas.length > 0 && (
                      <ul className="sub-list">
                        {LASER_OPTIONS[activeLaser].areas.map(a => <li key={a}>{a}</li>)}
                      </ul>
                    )}
                    <a href="https://www.vagaro.com/httpswwwvagarocomlpglosangeles/book-now" target="_blank" rel="noreferrer" className="btn-primary">
                      Book {LASER_OPTIONS[activeLaser].title}
                    </a>
                  </div>
              }
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact sec">
        <div className="inner">
          <div className="contact-grid">
            <div className="contact-info">
              <p className="s-eye">Get in touch</p>
              <h2 className="s-title">Begin your <em>journey</em></h2>
              <div style={{width:28,height:1,background:'var(--gold)',opacity:0.4,margin:'0 0 2rem'}}/>
              <p>Every transformation starts with a conversation. Reach out to schedule your complimentary consultation, our team will guide you through every step.</p>
              <div className="ci"><div className="ci-icon">📍</div><div><p className="ci-label">Address</p><span className="ci-val">110 E Wilson Ave, Glendale, CA 91206</span></div></div>
              <div className="ci"><div className="ci-icon">📞</div><div><p className="ci-label">Phone</p><a href="tel:2093300033" className="ci-val">(209) 330-0033</a></div></div>
              <div className="ci"><div className="ci-icon">✉</div><div><p className="ci-label">Email</p><a href="mailto:inhype.sanctuary@icloud.com" className="ci-val">inhype.sanctuary@icloud.com</a></div></div>
              <div className="ci"><div className="ci-icon">★</div><div><p className="ci-label">Reviews</p><a href="https://www.yelp.com/biz/inhype-sanctuary-spa-glendale?osq=InHype+Sanctuary&override_cta=Request+an+appointment" target="_blank" rel="noreferrer" className="ci-val">Read our reviews on Yelp</a></div></div>
            </div>
            <div className="form-wrap contact-cta-wrap">
              <h3>Ready to start?</h3>
              <p className="contact-cta-p">Give us a call, or book your complimentary consultation directly online.</p>
              <a href="tel:2093300033" className="btn-primary contact-cta-btn">Call (209) 330-0033</a>
              <a href="https://www.vagaro.com/httpswwwvagarocomlpglosangeles/book-now" target="_blank" rel="noreferrer" className="btn-outline contact-cta-btn">Book a Consultation</a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <div className="final-banner">
        <h2 className="final-banner-h">Ready to <em>transform?</em></h2>
        <button className="btn-primary" onClick={openMembership}>Buy Now</button>
      </div>

      {/* FOOTER */}
      <footer>
        <img src="/logo.webp" alt="InHype Sanctuary" className="f-logo" />
        <div className="f-name">InHype Sanctuary</div>
        <div className="f-sub">Wellness & Beauty Spa · Glendale, California</div>
        <ul className="f-links">
          {['membership','services','about','contact'].map(id => (
            <li key={id}><button onClick={() => go(id)}>{id.charAt(0).toUpperCase()+id.slice(1)}</button></li>
          ))}
          <li><a href="tel:2093300033">(209) 330-0033</a></li>
        </ul>
        <div className="f-copy">© 2026 InHype Sanctuary. All rights reserved.</div>
      </footer>

      {membershipOpen && (
        <MembershipModal
          onClose={closeMembership}
          onCheckout={handleCheckout}
          loadingPlanId={loading}
        />
      )}
    </>
  );
}
