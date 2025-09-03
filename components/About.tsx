"use client";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger)
interface textProps {
  header: string;
  content_1: string;
  content_2: string;
  content_3: string;
  content_4: string;
}
const Text: React.FC<textProps> = ({
  header,
  content_1,
  content_2,
  content_3,
  content_4,
}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 lg:gap-5">
      <h1 id="head" className="text-white font-bold text-2xl sm:text-3xl lg:text-3xl xl:text-4xl ">
        {header}
      </h1>
      <p id="content" className="text-white text-sm font-extralight lg:text-lg xl:text-lg text-center font-sans">
        {content_1} <br /> {content_2} <br /> {content_3} <br /> {content_4}
      </p>
    </div>
  );
};
const About = () => {
  useEffect(() => {
    gsap.from("#about", {
      scrollTrigger: "#about",
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    });
    gsap.from("#about_us", {
      scrollTrigger: "#about",
      opacity: 0,
      x: 100,
      duration: 1.5,
      ease: "power2.out",
    })
    
    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=100%", // Hold this section until animation completes
        scrub: true,
      
      }
    });
     
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
     t1.to("#about_us", {
      y: "10%",
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
    }),

    
    gsap.from("#head", {
      scrollTrigger: "#head",
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
    })
    gsap.from("#content", {
      scrollTrigger: "#content",
      opacity: 0,
      y: 100,
      stagger: 0.2,
      duration: 0.5,
      ease: "power2.out",
    })
  });
  return (
    <section id="about" className="w-full h-full px-5 xl:px-20 py-10 lg:py-20 flex flex-col  items-center justify-center bg-neutral-800 gap-10 overflow-hidden">
      <div className="w-full h-full items-center justify-center flex">
        <div className="flex flex-row items-center justify-center relative">
          <div className="absolute z-1 sm:right-[10%]  2xl:right-0 w-full h-full flex items-center justify-end">
            <h1 id="about_us" className="text-8xl sm:text-9xl lg:text-[250px] xl:text-[300px] font-anaton  text-white text-end text-shadow-lg/30  ">
              ABOUT <br />{" "}
              <span className="text-7xl sm:text-8xl lg:text-[200px] xl:text-[250px]">
                US
              </span>
            </h1>
          </div>
          <div className="w-full h-full sm:relative flex items-center justify-center lg:p-30">
            {" "}
            <Image
              src={"/serve.jpg"}
              alt="about"
              width={2000}
              height={2000}
              priority
              className=" sm:scale-75 lg:scale-100 sm:w-200 rounded-md sm:rounded-2xl shadow-xl/90 "
            />
          </div>
        </div>
      </div>
      <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center gap-10 lg:gap-20">
        <Text
          content_1="At Jode_Restaurant, dining is an experience"
          content_2="We blend culinary artistry and ambiance"
          content_3="Smart technology enhances dining moment"
          content_4="Creating unforgettable memories for our guests."
          header="Jode Restaurant"
        />
        <Text
          content_1="Fresh, handpicked ingredients"
          content_2="Global flavors with a local touch"
          content_3="AI-powered seamless dining experience"
          content_4="Elegant interiors & cozy ambiance"
          header="Our Promise"
        />
      </div>
    </section>
  );
};

export default About;
