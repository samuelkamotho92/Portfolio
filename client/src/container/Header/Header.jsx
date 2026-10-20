import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import { AppWrap } from '../../wrapper';
import { images } from '../../constants';
import './Header.scss';

const orbitIcons = [
  images.react,
  images.node,
  images.javascript,
  images.typescript,
  images.git,
  images.csharp,
  images.net,
  images.nextjs,
];

const proof = [
  '.NET & React',
  'AWS Cloud Practitioner',
  'Azure Fundamentals',
];

const Header = () => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 90,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 90,
    damping: 18,
  });

  const handleMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetTilt = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="app__header app__flex"
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <div className="header-glow header-glow--amber" />
      <div className="header-glow header-glow--cool" />

      <motion.div
        whileInView={{ x: [-80, 0], opacity: [0, 1] }}
        transition={{ duration: 0.7 }}
        className="app__header-info"
      >
        <p className="header-kicker">Software Engineer · Griffin Global Technologies</p>
        <h1 className="header-title">
          Samuel
          <em> Kamotho</em>
        </h1>
        <p className="header-pitch">
          Senior engineer with over 3 years of experience building .NET , Javascript and React
          systems that keep client data moving.
        </p>
        <ul className="header-proof">
          {proof.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="header-actions">
          <a className="header-actions__primary" href="#work">See the work</a>
          <a className="header-actions__quiet" href="/Samuel-Kamotho-CV.pdf" download="Samuel-Kamotho-CV.pdf">Download CV</a>
          <a className="header-actions__quiet" href="#contact">Contact</a>
        </div>
      </motion.div>

      <motion.div
        className="app__header-stage"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        <div className="stage-halo" />
        <div className="stage-shadow" />
        <motion.div
          className="stage-portrait"
          initial={{ opacity: 0, z: -40 }}
          whileInView={{ opacity: 1, z: 24 }}
          transition={{ duration: 0.8 }}
        >
          <img src={images.myprofile} alt="Samuel Kamotho" />
        </motion.div>

        <div className="orbit-tilt">
          <div className="orbit">
            {orbitIcons.map((icon, index) => (
              <div
                className="orbit-node"
                style={{ '--i': index }}
                key={icon}
              >
                <div className="orbit-spin">
                  <div className="orbit-face">
                    <img src={icon} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
