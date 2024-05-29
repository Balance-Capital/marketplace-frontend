import { useState, useRef, useEffect } from 'react';

export default function useScroll({ isWheel }: { isWheel: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [scrollStart, setScrollStart] = useState(false);

  useEffect(() => {
    if (isWheel) {
      window.addEventListener('wheel', onWheel, { passive: false });
    }
    window.addEventListener('scroll', scrollCheck);

    return () => {
      if (isWheel) {
        window.removeEventListener('wheel', onWheel);
      }
      window.removeEventListener('scroll', scrollCheck);
    };
  }, []);

  const checkScrollEnd = () => {
    if (scrollRef.current) {
      if (
        Math.floor(
          scrollRef.current?.scrollWidth - scrollRef.current?.scrollLeft
        ) <= scrollRef.current?.offsetWidth
      ) {
        setScrollEnd(true);
      } else {
        setScrollEnd(false);
      }
    }
  };

  const checkScrollStart = () => {
    if (scrollRef.current) {
      if (
        Math.floor(
          scrollRef.current?.scrollWidth - scrollRef.current?.scrollLeft
        ) >
        scrollRef.current?.offsetWidth * 2
      ) {
        setScrollStart(true);
      } else {
        setScrollStart(false);
      }
    }
  };

  const slide = (shift: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + shift,
        behavior: 'smooth',
      });
      checkScrollStart();
      checkScrollEnd();
    }
  };

  const scrollCheck = () => {
    if (scrollRef.current) {
      checkScrollStart();
      checkScrollEnd();
    }
  };

  const onWheel = (e) => {
    if (e.deltaY === 0) return;
    if (scrollRef.current?.contains(e.target)) {
      e.preventDefault();
      slide(e.deltaY > 0 ? e.deltaY + 400 : e.deltaY - 400);
    }
  };

  return { scrollRef, scrollStart, scrollEnd, slide };
}
