import React from 'react';
import { BsTwitter, BsLinkedin, BsWhatsapp, BsPhone } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="/https://twitter.com/SamkamDev">
        <BsTwitter />
      </a>
    </div>
    <div>
      <a href="/https://www.facebook.com/samuel.kamotho.94">
        <FaFacebookF />
      </a>
    </div>
    <div>
      <a href="/https://www.linkedin.com/in/samuel-kamotho-03b04b1a0/">
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
