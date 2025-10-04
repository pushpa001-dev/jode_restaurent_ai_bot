"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const Offer = () => {
  const firstText = useRef<HTMLDivElement | null>(null);
  const secondText = useRef<HTMLDivElement | null>(null);
  let xPercent = 0;
  const direction = -1;
  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);
  const animate = () => {
    if (xPercent <= -100) {
      xPercent = 0;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent + 100 });
    xPercent += 0.1 * direction;
    requestAnimationFrame(animate);
  };

  return (
    <section className="w-full py-10 lg:py-20 flex relative overflow-hidden bg-white">
      <div
        ref={firstText}
        className="flex w-full items-center justify-center m-0"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[160px] font-stretch-200% font-anaton text-neutral-800/60 whitespace-nowrap ">
          50% OFF for first visit ....{" "}
        </h1>
      </div>
      <div
        ref={secondText}
        className="flex items-center justify-center w-full absolute left-0 m-0"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[160px] font-anaton text-neutral-800/60 whitespace-nowrap ">
          50% OFF for first visit ....{" "}
        </h1>
      </div>
    </section>
  );
};

export default Offer;
