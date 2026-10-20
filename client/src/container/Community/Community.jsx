import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Community.scss';

const circles = [
  {
    title: 'Computer Society of Kirinyaga',
    detail: 'Since 2020. The campus room where we share tools and build things that help the university.',
  },
  {
    title: 'Microsoft Student Ambassador',
    detail: 'Since August 2022. Meetups where I teach peers to code and use Microsoft technology, slowly enough that someone new can follow.',
  },
  {
    title: 'Imagine Cup',
    detail: 'Team Score More reached the online semifinals with a site that gathers scholarship paths so students can stay in school.',
  },
  {
    title: 'Jitu cohort',
    detail: 'Kirinyaga University cohort 1. SERN training that sharpened backend work and introduced SQL as a daily tool.',
  },
];

const isFeatured = (work) => {
  const title = (work.title || '').toLowerCase().replace(/[^a-z]/g, '');
  return title.includes('greenkey') || title.includes('mlima');
};

const Community = () => {
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    const query = '*[_type == "works" && !(_id in path("drafts.**"))]';

    client.fetch(query).then((data) => {
      setBuilds(data.filter((work) => !isFeatured(work)));
    });
  }, []);

  return (
    <>
      <p className="community-kicker">Technical community</p>
      <h2 className="head-text">The line behind the <span>build</span></h2>
      <p className="community-lead">
        I am Samuel Kamotho, an engineer who ships software and then turns around
        to teach it. By day that is integration work, React, and .NET. Alongside
        it is a community habit: host the room, explain the tool, and leave the
        next person able to start. The two projects above are what is public
        right now. This is the longer path that got me there.
      </p>

      <div className="community-builds">
        {builds.map((work) => (
          <motion.article
            key={work._id}
            className="community-build"
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {work.imgUrl && (
              <img src={urlFor(work.imgUrl)} alt={work.title} />
            )}
            <div>
              <h3>{work.title}</h3>
              <p>{work.description}</p>
              {work.projectLink && (
                <a href={work.projectLink} target="_blank" rel="noreferrer">Visit</a>
              )}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="community-circles">
        {circles.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <a className="community-enter" href="/community">
        Read the posts and join the room
      </a>
    </>
  );
};

export default AppWrap(
  MotionWrap(Community, 'app__community'),
  'path',
  'app__whitebg',
);
