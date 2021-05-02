import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.scrollY >= 56 && window.innerWidth < 768) {
      window.scrollTo({ top: 56, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
