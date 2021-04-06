import { masuTemplateDefinition } from "../Masu/templateDefinition";
import { baggiTemplateDefinition } from "../Baggi/templateDefinition";

export function useTemplateDefinition(type) {
  switch (type) {
    case "masu":
      return masuTemplateDefinition;

    case "baggi":
      return baggiTemplateDefinition;

    default:
      console.error(`Unmanaged template '${type}'`);
      return null;
  }
}
