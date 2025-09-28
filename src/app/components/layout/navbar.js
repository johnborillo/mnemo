'use client'
import { Link } from 'next-view-transitions';
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: '#4B6858',
      color: '#fff',
      position: 'relative'
    }}>
      <div style={{ fontSize: '1.4rem' }}>
        <Link href="/">mnemo</Link>
      </div>
      
      <button
        onClick={toggleMenu}
        style={{
          display: 'none',
          flexDirection: 'column',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          gap: '4px',
          '@media (max-width: 768px)': {
            display: 'flex'
          }
        }}
        className="hamburger-menu"
      >
        <span style={{
          width: '25px',
          height: '3px',
          background: '#fff',
          transition: '0.3s'
        }}></span>
        <span style={{
          width: '25px',
          height: '3px',
          background: '#fff',
          transition: '0.3s'
        }}></span>
        <span style={{
          width: '25px',
          height: '3px',
          background: '#fff',
          transition: '0.3s'
        }}></span>
      </button>

      {/* Desktop Menu */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        gap: '2rem'
      }} className="desktop-menu">
        <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link href="/log" style={{ color: '#fff', textDecoration: 'none' }}>Journal</Link></li>
        <li><Link href="/insights" style={{ color: '#fff', textDecoration: 'none' }}>Insights</Link></li>
        <li><Link href='/about' style={{ color: '#fff', textDecoration: 'none' }}>About</Link></li>
      </ul>

      <ul style={{
        display: isMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        background: '#4B6858',
        listStyle: 'none',
        margin: 0,
        padding: '1rem 2rem',
        gap: '1rem',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        zIndex: 1000
      }} className="mobile-menu">
        <li><Link href="/" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link href="/log" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Journal</Link></li>
        <li><Link href="/insights" style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Insights</Link></li>
        <li><Link href='/about' style={{ color: '#fff', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>About</Link></li>
      </ul>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .hamburger-menu {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;