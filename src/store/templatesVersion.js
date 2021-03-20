import { getLocalTemplates } from ".";

export const latestVersion = 0;

export function updateTemplateVersion(template) {
  if (template.version === undefined || template.version === null) {
    template.version = 0;
  }

  // Quick bypass for any template already up-to-date
  if (template.version === latestVersion) {
    return;
  }
}

export function updateTemplatesVersion(state) {
  if (state === undefined || state === null) {
    return state;
  }

  const templates = getLocalTemplates(state);

  Object.keys(templates).forEach((key) => {
    updateTemplateVersion(templates[key]);
  });

  return state;
}
