import { useState, useRef } from 'react';

export default function useScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollEnd, setScrollEnd] = useState(false);

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

  const slide = (shift: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + shift,
        behavior: 'smooth',
      });
      setScrollX(scrollX + shift);
      checkScrollEnd();
    }
  };

  return { slide, scrollRef, scrollX, scrollEnd };
}
