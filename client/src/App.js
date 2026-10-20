import React, { useEffect } from 'react';

import {
  About, Community, Footer, Header, Skills, Testimonial, Work,
} from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  useEffect(() => {
    const id = window.location.hash.replace('#', '');
    if (!id) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const node = document.getElementById(id);
      if (node) node.scrollIntoView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Community />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
