// components/CustomCursor.jsx
"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDot = useRef(null);
  const cursorRing = useRef(null);

  useEffect(() => {
    const previousBodyCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (cursorDot.current) {
        cursorDot.current.style.left = `${clientX}px`;
        cursorDot.current.style.top = `${clientY}px`;
      }

      if (cursorRing.current) {
        cursorRing.current.style.left = `${clientX}px`;
        cursorRing.current.style.top = `${clientY}px`;
      }
    };

    const interactiveElements = document.querySelectorAll(
      "button, a, [data-interactive]"
    );

    const handleMouseEnter = () => {
      if (cursorDot.current) {
        cursorDot.current.style.width = "10px";
        cursorDot.current.style.height = "10px";
      }

      if (cursorRing.current) {
        cursorRing.current.style.width = "44px";
        cursorRing.current.style.height = "44px";
      }
    };

    const handleMouseLeave = () => {
      if (cursorDot.current) {
        cursorDot.current.style.width = "6px";
        cursorDot.current.style.height = "6px";
      }

      if (cursorRing.current) {
        cursorRing.current.style.width = "32px";
        cursorRing.current.style.height = "32px";
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.body.style.cursor = previousBodyCursor;
      document.removeEventListener("mousemove", onMouseMove);

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        className="cursor-dot fixed w-1.5 h-1.5 bg-[#F5A623] rounded-full pointer-events-none z-[9999] shadow-[0_0_16px_rgba(245,166,35,0.92)]"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      />
      <div
        ref={cursorRing}
        className="cursor-ring fixed w-8 h-8 rounded-full pointer-events-none z-[9998] border border-[#F5A623]/70 shadow-[0_0_26px_rgba(245,166,35,0.28)]"
        style={{
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s ease, height 0.15s ease",
        }}
      />
    </>
  );
}
