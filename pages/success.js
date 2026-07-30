import Head from 'next/head';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Head>
        <title>Welcome — InHype Sanctuary</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <div style={{
        minHeight: '100vh', background: '#0f1a17', display: 'flex',
        alignItems: 'center', justifyContent: 'center', padding: '2rem',
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <div style={{ textAlign: 'center', maxWidth: '560px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✦</div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '2.8rem',
            fontWeight: 300, color: '#f7f5f0', fontStyle: 'italic',
            marginBottom: '1rem', lineHeight: 1.15
          }}>
            Welcome to the Sanctuary
          </h1>
          <p style={{ color: 'rgba(247,245,240,0.5)', fontSize: '0.95rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
            Your membership has been confirmed. Our team will reach out within 24 hours
            to schedule your complimentary consultation and begin your transformation journey.
          </p>
          <div style={{
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '10px', padding: '1.75rem', marginBottom: '2.5rem'
          }}>
            <p style={{ color: '#c9a84c', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Next Steps</p>
            <p style={{ color: 'rgba(247,245,240,0.6)', fontSize: '0.85rem', lineHeight: 1.8 }}>
              1. Check your email for a confirmation receipt<br />
              2. We'll call you to schedule your consultation<br />
              3. Bloodwork → MD approval → treatment begins
            </p>
          </div>
          <a href="tel:2093300033" style={{
            display: 'inline-block', background: '#c9a84c', color: '#0f1a17',
            padding: '0.9rem 2.5rem', borderRadius: '5px', textDecoration: 'none',
            fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            fontWeight: 500, marginRight: '1rem'
          }}>
            Call Us Now
          </a>
          <Link href="/" style={{
            display: 'inline-block', color: 'rgba(247,245,240,0.4)',
            fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
            textDecoration: 'none', marginTop: '1rem'
          }}>
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
