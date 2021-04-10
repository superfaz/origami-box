import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLocalTemplates } from "../store";
import Error404 from "../Error/Error404";

export function useTemplate() {
  const { templateKey } = useParams();
  const templates = useSelector(getLocalTemplates);
  if (templateKey === undefined || templateKey == null) {
    throw new Error(
      "'useTemplate' should be used inside a route with the 'templateKey' parameter"
    );
  }

  if (templates === undefined || templates === null) {
    throw new Error("Missing templates reducer");
  }

  if (templates[templateKey] === undefined || templates[templateKey] === null) {
    throw new Error404("Can't retrieve a not existing template");
  }

  return {
    template: templates[templateKey],
    data: templates[templateKey].data,
  };
}
