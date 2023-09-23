export const parsePokemonVersion = (body: string) => body.slice(2);

export const parseAppStoreVersion = (body: string) => {
  let versionLine = '';
  const lines = body.split('\n');
  for (const line of lines) {
    if (!line.includes('new__latest__version')) {
      continue;
    }
    versionLine = line.trim().substr(73, 7);
    break;
  }
  return versionLine;
};

export const parsePlayStoreVersion = (body: string) => {
  // TODO: Fix parsing for Google Play Store version
  let versionLine = '';
  const lines = body.split('\n');
  for (const line of lines) {
    if (!line.includes('Current Version')) {
      continue;
    }
    const smallLines = line.split('BgcNfc');
    for (const smallLine of smallLines) {
      if (!smallLine.includes('Current Version')) {
        continue;
      }
      versionLine = smallLine.trim().substring(83, 7);
    }
  }
  return versionLine;
};

export const parseGalaxyStoreVersion = (body: string) => {
  // TODO: Fix parsing for Samsung Galaxy Store version
  let versionLine = '';
  const lines = body.split('\n');
  for (const line of lines) {
    if (!line.includes('>Version')) {
      continue;
    }
    versionLine = line.trim().substring(20, 7);
    break;
  }
  return versionLine;
};