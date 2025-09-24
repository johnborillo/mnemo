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
      mnemo
    </div>
    <ul style={{
      display: 'flex',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      gap: '2rem'
    }}>
      <li><a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
      <li><a href="/log" style={{ color: '#fff', textDecoration: 'none' }}>Journal</a></li>
      <li><a href="/insights" style={{ color: '#fff', textDecoration: 'none' }}>Insights</a></li>
    </ul>
  </nav>
);

export default Navbar;