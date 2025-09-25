import { Link } from 'next-view-transitions';
import React from 'react';

const Navbar = () => (
  <nav style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    background: '#4B6858',
    color: '#fff'
  }}>
    <div style={{ fontSize: '1.4rem' }}>
      <Link href="/">mnemo</Link>
    </div>
    <ul style={{
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '2rem'
    }}>
      <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
      <li><Link href="/log" style={{ color: '#fff', textDecoration: 'none' }}>Journal</Link></li>
      <li><Link href="/insights" style={{ color: '#fff', textDecoration: 'none' }}>Insights</Link></li>
      <li><Link href='/about' style={{ color: '#fff', textDecoration: 'none' }}>About</Link></li>
    </ul>
  </nav>
);

export default Navbar;