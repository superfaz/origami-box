export function isConnected(profile) {
  return profile !== undefined
    && (profile.status === 'connected'
      || profile.status === 'initialized');
}
