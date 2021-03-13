import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfile, getTemplates } from "../store";

function toArray(obj) {
  if (obj === undefined || obj === null) {
    return [];
  }

  return Object.keys(obj).reduce((acc, current) => {
    acc.push(obj[current]);
    return acc;
  }, []);
}

export function useTemplates() {
  console.log("useTemplates()");
  const profile = useSelector(getProfile);
  const localTemplates = toArray(useSelector(getTemplates));
  const [remoteTemplates, setRemoteTemplates] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    if (profile.accessToken !== null && profile.userId !== null) {
      console.log("fetch /api/template");
      fetch("/api/template", {
        headers: {
          accesstoken: profile.accessToken,
          userId: profile.userId,
        },
      })
        .then((response) => {
          if (!response.ok) {
            setError(true);
            return [];
          }
          return response.json();
        })
        .then((data) => {
          setRemoteTemplates(data);
          console.log("data", data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [profile.userId, profile.accessToken]);

  const templates = [].concat(localTemplates, remoteTemplates);
  console.log("templates", templates);
  return { templates, localTemplates, remoteTemplates, isLoading, isError };
}
