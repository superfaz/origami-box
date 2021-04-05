import { masuTemplateDefinition } from "../Masu/templateDefinition";

export function useTemplateDefinition(type) {
  switch (type) {
    case "masu":
      return masuTemplateDefinition;

    case "baggi":
    default:
      console.error(`Unmanaged template '${type}'`);
      return null;
  }
}
