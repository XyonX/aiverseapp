"use client";
import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  if (typeof window === "undefined") return;

  useEffect(() => {
    //here the query param can be
    //   '(max-width: 768px)'          // Screen width
    // '(orientation: portrait)'      // Device orientation
    // '(prefers-color-scheme: dark)' // Dark mode preference
    // '(min-resolution: 2dppx)'      // Pixel density
    //demo const isMobile = useMediaQuery('(max-width: 768px)')

    // 2. Create media query list
    const mediaQuery = window.matchMedia(query);

    // 3. Update state when query matches
    const handler = () => setMatches(mediaQuery.matches);

    // 4 initial check
    //setMatches(mediaQuery.matches); // true/false
    handler();

    // 5. Add listener for changes
    mediaQuery.addEventListener("change", handler);

    // 6. Cleanup listener
    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]); // Re-run if query changes

  return matches;
};
export default useMediaQuery;
