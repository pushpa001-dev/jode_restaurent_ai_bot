"use client";
import Link from "next/link";

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { footerLinks } from "./constraints";
import { useSmoothScroll } from "./Scrollcontext";
import { button } from "framer-motion/client";

const icons = {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
};

export default function Footer() {
  const lenis = useSmoothScroll()
  return (
    <footer id="footer" className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Jode_Restaurant
            </h2>
            <p className="mt-2 text-gray-600 text-sm">
              Serving happiness with every bite. Experience flavors that bring
              people together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              {footerLinks.quickLinks.map((link, index) => (
             
                <button key={index} onClick={()=> {
                  const target = document.querySelector(`#${link.path}`) as HTMLElement;
                  if(target && lenis)
                    lenis.scrollTo(target);
                }} className="hover:scale-101 flex flex-col" >
                  {link.name}
                </button>
             
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contact Us
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>Email: {footerLinks.contact.email}</li>
              <li>Phone: {footerLinks.contact.phone}</li>
              <li>Location: {footerLinks.contact.location}</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Follow Us
            </h3>
            <div className="flex items-center space-x-4">
              {footerLinks.socialLinks.map((social, index) => {
                const Icon = icons[social.icon as keyof typeof icons];
                return (
                  <Link
                    key={index}
                    href={social.url}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
                  >
                    <Icon className="text-gray-700" size={18} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Jode_Restaurant. Designed and Developed
          by TPA - Infera
        </div>
        <Link
          href="https://pushpahas-web-works.vercel.app/"
          target="_blank"
          className="text-center w-full flex items-center justify-center py-5 font-sans font-extralight"
        >
          {" "}
          TPA - Infera{" "}
        </Link>
      </div>
    </footer>
  );
}
