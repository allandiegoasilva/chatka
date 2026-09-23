"use client";

import { heroTerms } from "@/lib/seo-terms";
import { useEffect, useState } from "react";

export function TermTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % heroTerms.length);
        setVisible(true);
      }, 220);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <p
      className="text-sm font-medium text-primary transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {heroTerms[index]}
    </p>
  );
}
