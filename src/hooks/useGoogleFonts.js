import { useEffect, useState } from "react";
import env from "../env";

export function useGoogleFonts() {
  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    const apiKey = env.googleApiKey;
    if (!apiKey) {
      console.error("Configuration error - google api key not defined");
      return;
    }

    fetch("https://www.googleapis.com/webfonts/v1/webfonts?key=" + apiKey).then(
      (response) => {
        if (!response.ok) {
          return null;
        } else {
          return response.json().then((json) => {
            setFonts(
              json.items
                .filter((i) => i.variants.includes("regular"))
                .map((i) => i.family)
            );
          });
        }
      }
    );
  }, []);

  return fonts;
}
