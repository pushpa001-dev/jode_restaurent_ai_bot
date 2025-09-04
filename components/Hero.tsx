"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

interface Heroprops {
  src: string;
  alt: string;
  style: string;
}
const Heroimage: React.FC<Heroprops> = ({ src, alt, style }) => {
  return (
    <div className={` h-full ${style}`}>
      <Image
        src={src}
        alt={alt}
        width={2000}
        height={2000}
        priority
        className=" rounded-xl shadow-2xl p-3  sm:p-5 m-[-5] "
      />
    </div>
  );
};

const Hero = () => {
 
  useEffect(() => {
    const ctx = gsap.context(() => {
    
      const split = SplitText.create("#title",{
        type:"words",
        wordsClass:"word"
      });
      gsap.from(
        split.words,
        {
      opacity: 0,
      stagger: 0.2,
      y: 100,
      duration: 1,
      ease: "power2.out",
        })
        gsap.from("#images", { opacity: 0, y: 100, duration: 1, ease: "power4.out" });
    });

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "+=100%", // Hold this section until animation completes
          scrub: true,
          pin: isMobile ? false : true,
          onEnter: () =>
            gsap.to("#object", {
              y: "0%",
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
            }),
        },
      });
      tl.fromTo(
        "#object",
        { y: isMobile ? "0%" : "150%" , scale: isMobile ? 1 : 0, opacity: isMobile ? 1 : 0 }, // Object starts completely outside bottom
        { y: "0%", scale: 1, opacity: 1, ease: "power3.out" }
      );
    
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="hero"
      className="w-full h-screen flex flex-col items-center justify-center px-5 lg:px-20  sm:py-0 overflow-hidden"
    >
      <div className=" flex flex-col items-center w-full h-full justify-center  sm:justify-center z-10">
        <h1 id="title" className="text-7xl sm:text-9xl xl:text-[200px] text-white text-shadow-lg/50 font-anaton">
          <span className="text-neutral-800">JODE</span> <br /> RESTAURENT{" "}
        </h1>

        <div className="absolute bottom-0 w-full lg:w-1/2 z-[-1]  " id="object">
          <Image
            src="/bowl.png"
            alt="bowl"
            width={2000}
            height={2000}
            className=" w-full h-full saturate-70 "
          />
        </div>
      </div>
      <div id="images" className="w-full h-full flex sm:fixed sm:blur-[5px] items-end justify-center  sm:py-10 ">
        <Heroimage
          src="/hero.jpg"
          alt="hero"
          style="flex items-start sm:items-end justify-center hidden sm:flex" 
        />
        <Heroimage
          src="/serve.jpg"
          alt="hero"
          style=" items-start justify-end hidden sm:flex"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-10 " />
    </section>
  );
};

export default Hero;
