import { useEffect, useState } from "react";

const useWidowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  const getWindowDimensions = () => ({
    width: window?.innerWidth || 0,
    height: window?.innerHeight || 0,
  });

  useEffect(() => {
    // if (typeof window === "undefined") {
    //   return;
    // }

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
};

export default useWidowDimensions;
