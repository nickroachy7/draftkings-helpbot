import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-logo">
          <Link href="/">
            <Image 
              src="/dk-logo.png" 
              alt="DraftKings Logo" 
              width={180} 
              height={46} 
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>
        <nav className="header-nav">
          <ul>
            <li><a href="https://www.draftkings.com/sportsbook" target="_blank" rel="noopener noreferrer">Sportsbook</a></li>
            <li><a href="https://www.draftkings.com/casino" target="_blank" rel="noopener noreferrer">Casino</a></li>
            <li><a href="https://www.draftkings.com/lobby" target="_blank" rel="noopener noreferrer">Fantasy</a></li>
            <li><a href="https://www.draftkings.com/pick6" target="_blank" rel="noopener noreferrer">Pick6</a></li>
            <li><a href="https://myaccount.draftkings.com/" target="_blank" rel="noopener noreferrer">Account</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 