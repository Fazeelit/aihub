// components/ScrollReveal.jsx
"use client";

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default function ScrollReveal({ children, threshold = 0.1, delay = 0 }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, delay);
          }
        });
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, delay]);

  return (
    <div ref={elementRef} className="reveal">
      {children}
    </div>
  );
}

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
  delay: PropTypes.number,
};

ScrollReveal.defaultProps = {
  threshold: 0.1,
  delay: 0,
};