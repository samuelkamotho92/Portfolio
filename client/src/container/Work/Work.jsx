import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

const isFeatured = (work) => {
  const title = (work.title || '').toLowerCase().replace(/[^a-z]/g, '');
  return title.includes('greenkey') || title.includes('mlima');
};

const Work = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works" && !(_id in path("drafts.**"))]';

    client.fetch(query).then((data) => {
      setWorks(data.filter(isFeatured));
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Selected <span>work</span></h2>
      <p className="work-intro">Products in public right now. More will join these listings as they are ready.</p>

      <motion.div
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {works.map((work, index) => (
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.35 }}
            style={{ transformPerspective: 1000 }}
            className="app__work-item app__flex"
            key={index}
          >
            <div
              className="app__work-img app__flex"
            >
              {work.imgUrl ? (
                <img src={urlFor(work.imgUrl)} alt={work.title} />
              ) : (
                <div className="app__work-fallback">{work.title}</div>
              )}

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                {work.projectLink && (
                  <a href={work.projectLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.90] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                )}
                {work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer">
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.90] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              {work.tags?.[0] && (
                <div className="app__work-tag app__flex">
                  <p className="p-text">{work.tags[0]}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
