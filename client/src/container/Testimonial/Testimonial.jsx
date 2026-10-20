import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { client, urlFor } from '../../client';
import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  const step = (nextDirection) => {
    if (testimonials.length < 2) return;
    setDirection(nextDirection);
    setCurrentIndex((index) => {
      const next = index + nextDirection;
      if (next < 0) return testimonials.length - 1;
      if (next >= testimonials.length) return 0;
      return next;
    });
    setCycle((value) => value + 1);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials" && !(_id in path("drafts.**"))]';
    const brandsQuery = '*[_type == "brands" && !(_id in path("drafts.**"))]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });
  }, []);

  useEffect(() => {
    if (testimonials.length < 2 || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const timer = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((index) => (index + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [testimonials.length, paused, cycle]);

  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div
            className="app__testimonial-carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <motion.div
              className="app__testimonial-item"
              key={testimonials[currentIndex]._id}
              initial={{ opacity: 0, y: direction * 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <p className="review-mark" aria-hidden="true">“</p>
              <p className="review-quote">{testimonials[currentIndex].feedback}</p>
              <div className="review-person">
                {testimonials[currentIndex].imgurl && (
                  <img src={urlFor(testimonials[currentIndex].imgurl)} alt="" />
                )}
                <div>
                  <h4>{testimonials[currentIndex].name}</h4>
                  <h5>{testimonials[currentIndex].company}</h5>
                </div>
              </div>
            </motion.div>
          </div>
          <div className={`review-progress${paused ? ' is-paused' : ''}`} key={`${currentIndex}-${cycle}`}>
            <span />
          </div>

          <div className="app__testimonial-btns app__flex">
            <button type="button" className="app__flex" aria-label="Previous review" onClick={() => step(-1)}>
              <HiChevronLeft />
            </button>
            <div className="app__testimonial-dots">
              {testimonials.map((item, index) => (
                <button
                  key={item._id}
                  type="button"
                  className={index === currentIndex ? 'is-on' : ''}
                  aria-label={`Show review ${index + 1}`}
                  onClick={() => {
                    setDirection(index >= currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                    setCycle((value) => value + 1);
                  }}
                />
              ))}
            </div>
            <button type="button" className="app__flex" aria-label="Next review" onClick={() => step(1)}>
              <HiChevronRight />
            </button>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: 'tween' }}
            key={brand._id}
          >
            {brand.imgUrl ? (
              <img src={urlFor(brand.imgUrl)} alt={brand.name} />
            ) : (
              <p className="brand-name">{brand.name}</p>
            )}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);
