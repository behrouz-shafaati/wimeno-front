import { useEffect, useState, useRef } from "react";

export function useHeadsObserver() {
  const observer: any = useRef();
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const handleObsever = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-10% 0% -55% 0px",
    });

    const elements = document.querySelectorAll("h3.category-header");
    elements.forEach((elem) => observer.current.observe(elem));
    return () => observer.current?.disconnect();
  }, []);

  return { activeId };
}
