import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import './Navbar.scss';

const links = [
  { label: 'home', href: '/#home' },
  { label: 'about', href: '/#about' },
  { label: 'work', href: '/#work' },
  { label: 'community', href: '/community' },
  { label: 'contact', href: '/#contact' },
];

const onCommunity = window.location.pathname.replace(/\/+$/, '') === '/community';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      <a href="/#home" className="app__navbar-logo">
        <span>SK</span>
        <em>Samuel Kamotho</em>
      </a>
      <ul className="app__navbar-links">
        {links.map((item) => (
          <li
            className={`app__flex p-text${item.label === 'community' && onCommunity ? ' is-current' : ''}`}
            key={`link-${item.label}`}
          >
            <div />
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>

      <a className="app__navbar-cv" href="/#documents">Documents</a>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {links.map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={() => setToggle(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/#documents" onClick={() => setToggle(false)}>
                  Documents
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
