import About from "@/components/About";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import Offer from "@/components/Offer";
import Testimonals from "@/components/Testimonals";


export default function Home() {
  return (
   <div>
    <Hero />
    <About />
    <Menu />
    <Offer />
    <Testimonals />
   </div>
  )
}