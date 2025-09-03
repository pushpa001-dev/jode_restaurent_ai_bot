"use client";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import Lenis from "lenis";

// 1. Define the context type
type SmoothScrollContextType = Lenis | null;

// 2. Create the context with default value
const SmoothScrollContext = createContext<SmoothScrollContextType>(null);

// 3. Custom hook for using the context
export const useSmoothScroll = () => useContext(SmoothScrollContext);

// 4. Props type for the provider
interface ScrollContextProps {
  children: ReactNode;
}

export default function ScrollContext({ children }: ScrollContextProps) {
  const [lenisRef, setLenis] = useState<Lenis | null>(null);
  const [rafState, setRafState] = useState<number | null>(null);

  useEffect(() => {
    const scroller = new Lenis();
    let rafId: number;

    const raf = (time: number) => {
      scroller.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
    setRafState(rafId);
    setLenis(scroller);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafState!);
      }
      scroller.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
