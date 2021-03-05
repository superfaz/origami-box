export function isConnected(profile) {
  return profile !== undefined
    && profile !== null
    && profile.userId !== undefined
    && profile.accessToken !== undefined;
}

export function isLoaded(profile) {
  return profile !== undefined
    && profile !== null
    && profile.userId !== undefined
    && profile.name !== undefined
    && profile.picture !== undefined;
}
