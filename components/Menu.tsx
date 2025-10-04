"use client"
import { menu1, menu2 } from './constraints'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect } from 'react'
gsap.registerPlugin(ScrollTrigger);
const Menu = () => {

  useEffect(() => {
    gsap.from("#menu_section", {
      scrollTrigger: "#menu_section",
      opacity: 0,
      duration: 1.5,
      ease: "power2.out",
    })
    gsap.from("#graphics", {
      scrollTrigger: "#graphics",
      opacity: 0,
      stagger: 0.2,
      y: 100,
      duration: 1.5,
      ease: "power2.out",
    })
  })
  return (
    <section id='#menu_section' className=" bg-white w-full text-gray-900 py-16 px-6 md:px-12 lg:px-20 xl:px-40 relative">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* LEFT SIDE: Menu Items */}
      <div>
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-800 mb-8 tracking-wide">
          Our Menu
        </h2>

        {/* Section One */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3 mb-5">
            Chef’s Specials
          </h3>
          <ul className="space-y-5">
            {menu1.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-start text-gray-700"
              >
                <span>
                  <span className="font-semibold text-gray-900">
                    {item.name}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {item.description}
                  </span>
                </span>
                <span className="text-gray-800 font-semibold ml-6">
                  ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section Two */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 border-b border-gray-300 pb-3 mb-5">
            Desserts & Beverages
          </h3>
          <ul className="space-y-5">
            {menu2.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-start text-gray-700"
              >
                <span>
                  <span className="font-semibold text-gray-900">
                    {item.name}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {item.description}
                  </span>
                </span>
                <span className="text-gray-800 font-semibold ml-6">
                  ₹{item.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE: Graphics */}
      <div  className="flex flex-col items-center space-y-10">
        {/* Circle with food image */}
        <div id='graphics' className="w-64 h-64 rounded-full overflow-hidden shadow-2xl/50 border-4 border-neutral-100 ">
          <Image
            src="/biriyani.jpg" // Replace with your image
            alt="Food"
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Highlight Quote */}
        <div id='graphics' className="relative shadow-lg/50  border-2 text-white p-6 rounded-full w-64 h-64 flex items-center justify-center text-center font-semibold text-lg leading-relaxed">
        <Image
        src={"/hero.jpg"}
        alt="Food"
        width={500}
        height={500}
        className="object-cover absolute  rounded-full w-64 h-64 blur-[3px]"
        />
        <p className='z-10'>
          “Traditionally, meals are enjoyed
          with focus on natural taste
          and freshness.”
          </p>
        </div>
      </div>
    </div>
    <div className=' absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center '>
      <h1 className='text-[150px] xl:text-[500px] font-bold text-gray-800/20 font-anaton tracking-wide'>
      JODE
      </h1>
    </div>
  </section>
  )
}

export default Menu