import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLocalTemplates } from "../store";
import Error404 from "../Error/Error404";
import { useTemplateDefinition } from "./useTemplateDefinition";

export function useTemplate() {
  const { templateKey, block } = useParams();
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

  const template = templates[templateKey];
  const data = template.data;
  const definition = useTemplateDefinition(template.type);

  if (!block) {
    return { template, data, blockData: data.base };
  }

  const blocks = definition.blocks(data);
  if (!blocks.includes(block)) {
    throw new Error404(`Can't update unmanaged block ${block}`);
  }

  return { template, data, blockData: data[block] };
}
