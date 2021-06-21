import { getLocalTemplates } from ".";
import migration20210321 from "./migrations-20210321";
import migration20210621 from "./migrations-20210621";

export const latestVersion = 2;

export function applyTemplateMigrations(template) {
  if (template.version === undefined || template.version === null) {
    template.version = 0;
  }

  // Quick bypass for any template already up-to-date
  if (template.version === latestVersion) {
    return;
  }

  // Upgrade 0 -> 1, update 'face' field for texts and images
  if (template.version === 0) {
    try {
      migration20210321.up(template);
      template.version = 1;
    } catch (error) {
      console.error("Can't migrate a local template to version 1", error);
    }
  }

  // Upgrade 1 -> 2, force colors to #xxxxxx notation
  if (template.version === 1) {
    try {
      migration20210621.up(template);
      template.version = 2;
    } catch (error) {
      console.error("Can't migrate a local template to version 2", error);
    }
  }
}

export function applyMigrations(state) {
  if (state === undefined || state === null) {
    return state;
  }

  const templates = getLocalTemplates(state);
  Object.keys(templates).forEach((key) => {
    applyTemplateMigrations(templates[key]);
  });

  return state;
}
