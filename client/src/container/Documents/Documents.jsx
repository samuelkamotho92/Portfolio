import React, { useState } from 'react';

import { AppWrap, MotionWrap } from '../../wrapper';
import './Documents.scss';

const documents = [
  {
    id: 'cv',
    title: 'Curriculum vitae',
    detail: 'Roles, projects, and the engineering work of the last three years.',
    href: '/documents/samuel-kamotho-cv.pdf',
    filename: 'Samuel-Kamotho-CV.pdf',
  },
  {
    id: 'professional-reference',
    title: 'Professional reference',
    detail: 'A reference letter from professional work.',
    href: '/documents/professional-reference.pdf',
    filename: 'Samuel-Kamotho-Professional-Reference.pdf',
  },
  {
    id: 'academic-reference',
    title: 'Academic reference',
    detail: 'A reference letter from academic work.',
    href: '/documents/academic-reference.pdf',
    filename: 'Samuel-Kamotho-Academic-Reference.pdf',
  },
  {
    id: 'degree',
    title: 'Bachelor’s degree',
    detail: 'Degree certificate.',
    href: '/documents/bachelors-degree.pdf',
    filename: 'Samuel-Kamotho-Bachelors-Degree.pdf',
  },
  {
    id: 'transcripts',
    title: 'Academic transcripts',
    detail: 'University academic record.',
    href: '/documents/transcripts.pdf',
    filename: 'Samuel-Kamotho-Transcripts.pdf',
  },
  {
    id: 'leadership',
    title: 'Leadership and volunteering',
    detail: 'Certificates for leadership and volunteering.',
    href: '/documents/leadership-volunteering.pdf',
    filename: 'Samuel-Kamotho-Leadership-Volunteering.pdf',
  },
];

const Documents = () => {
  const [activeId, setActiveId] = useState(documents[0].id);
  const active = documents.find((item) => item.id === activeId) || documents[0];

  return (
    <>
      <p className="documents-kicker">For recruiters</p>
      <h2 className="head-text">Read the <span>record</span></h2>
      <p className="documents-lead">
        Open a document here, or download a copy. The curriculum vitae is the
        shortest path through the experience.
      </p>

      <div className="documents-layout">
        <ul className="documents-list">
          {documents.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={item.id === active.id ? 'is-active' : ''}
                onClick={() => setActiveId(item.id)}
              >
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="documents-stage">
          <div className="documents-stage__bar">
            <h3>{active.title}</h3>
            <a href={active.href} download={active.filename}>Download</a>
          </div>
          <iframe title={active.title} src={active.href} />
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Documents, 'app__documents'),
  'documents',
  'app__whitebg',
);
