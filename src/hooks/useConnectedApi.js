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

  function saveTemplate(template) {
    if (headers === null) {
      throw new Error("Not initialized");
    }

    const preparedTemplate = {
      ...template,
      userId: profile.userId,
    };
    delete preparedTemplate.local;

    if (template._id === undefined) {
      // Save a new template
      return fetch(`/api/template`, {
        method: "POST",
        headers,
        body: JSON.stringify(preparedTemplate),
      })
        .then((response) => {
          if (!response.ok) {
            response
              .json()
              .then((json) => console.log("Can't save this template", json));
            throw new Error("Can't save this template");
          } else {
            return response.json();
          }
        })
        .catch((error) => {
          console.log("Can't save this template", error);
          throw new Error("Can't save this template");
        });
    } else {
      // Save an existing template
      return fetch(`/api/template/${template.key}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(preparedTemplate),
      })
        .then((response) => {
          if (!response.ok) {
            return { status: "error", error: "Can't update this template" };
          } else {
            return { status: "ok" };
          }
        })
        .catch((error) => {
          return { status: "error", error: "Can't update this template" };
        });
    }
  }

  return {
    removeTemplate,
    saveTemplate,
  };
}
