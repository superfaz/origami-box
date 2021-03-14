import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile } from "../store";

export function useConnectedApi() {
  const profile = useSelector(getProfile);
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    if (profile.accessToken !== null && profile.userId !== null) {
      setHeaders({
        accesstoken: profile.accessToken,
        userid: profile.userId,
      });
    }
  }, [profile.userId, profile.accessToken]);

  function removeTemplate(templateKey) {
    if (headers === null) {
      throw new Error("Not initialized");
    }

    return fetch(`/api/template/${templateKey}`, {
      method: "DELETE",
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          return { status: "error", error: "Can't delete this template" };
        } else {
          return { status: "ok" };
        }
      })
      .catch((error) => {
        return { status: "error", error: "Can't delete this template" };
      });
  }

  return {
    removeTemplate,
  };
}
