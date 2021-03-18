import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import createSet from "../createSet";
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

export function useTemplates(limit = null) {
  console.log("useTemplates()");
  const profile = useSelector(getProfile);
  const localTemplates = toArray(useSelector(getTemplates));
  const [remoteTemplates, setRemoteTemplates] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setLoading(true);
    if (profile.status === "not-connected") {
      setLoading(false);
    } else if (profile.status !== "unknown") {
      console.log("fetch /api/template");
      fetch("/api/template?limit=" + limit, {
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
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
        });
    }
  }, [profile.status, profile.userId, profile.accessToken, limit]);

  const templates = createSet((t) => t.key, localTemplates, remoteTemplates)
    .sort((a, b) => b.savedate - a.savedate)
    .filter((v, i) => i < (limit || Number.POSITIVE_INFINITY));

  return { templates, localTemplates, remoteTemplates, isLoading, isError };
}
