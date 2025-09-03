"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { testimonials } from "./constraints";

gsap.registerPlugin(ScrollTrigger);

interface StarsProps {
  count: number;
}

const Stars: React.FC<StarsProps> = ({ count }) => {
  const star = "⭐";
  return (
    <div className="text-xl">
      <p>{star.repeat(count)}</p>
    </div>
  );
};

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const subHeadingRef = useRef<HTMLParagraphElement | null>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);
  const bgImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Subheading animation
      gsap.from(subHeadingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Testimonials stagger animation
      gsap.fromTo(
        testimonialRefs.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: testimonialRefs.current[0]?.parentElement,
            start: "top 75%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Background parallax effect
      gsap.to(bgImageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-800/90 py-16 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-white"
        >
          Hear From Our Happy Guests
        </h2>
        <p
          ref={subHeadingRef}
          className="text-white mt-3 max-w-2xl mx-auto"
        >
          Delicious flavors, cozy ambience, and unforgettable dining experiences
          — see what our guests say about Jode_Restaurant.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:px-8 lg:px-10 xl:px-20 2xl:px-40 relative z-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            ref={(el) => {
              if (el) testimonialRefs.current[index] = el;
            }}
            className="bg-white shadow-md/50 rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              “{testimonial.feedback}”
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {testimonial.name}
              </h3>
            </div>
            <Stars count={testimonial.rating} />
          </div>
        ))}
      </div>

      {/* Background Image */}
      <div
        ref={bgImageRef}
        className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
      >
        <Image
          src="/bowl.png"
          alt="bowl"
          width={2000}
          height={2000}
          priority
          className="top-0 w-100 sm:w-200 z-[-1] opacity-70"
        />
      </div>
    </section>
  );
}
