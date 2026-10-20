import React from 'react';
import { BsLinkedin, BsWhatsapp, BsPhone } from 'react-icons/bs';
import { FaGithub } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://github.com/samuelkamotho92" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
    </div>
    <div>
      <a href="https://www.linkedin.com/in/samuel-kamotho-03b04b1a0/" target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="tel:+254781943684">
        <BsWhatsapp />
      </a>
    </div>
    <div>
      <a href="tel:+254700856037">
        <BsPhone />
      </a>
    </div>
  </div>
);

export default SocialMedia;
