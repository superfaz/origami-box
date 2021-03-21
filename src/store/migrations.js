import { getLocalTemplates } from ".";
import migration20210321 from "./migrations-20210321";

export const latestVersion = 1;

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
      console.error("Can't migrate a local template", error);
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
