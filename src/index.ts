import config from './config.json';
import {
  parsePokemonVersion, parseAppStoreVersion,
  parsePlayStoreVersion, parseGalaxyStoreVersion,
} from './parsers';
import { ServiceProviderType, VersionChangedCallbackOptions } from './types';
import { sendWebhooks } from './utils';
import { VersionMonitor } from './VersionMonitor';

const PokemonGoEndpoint = 'https://pgorelease.nianticlabs.com/plfe/version';
const GalaxyStoreEndpoint = 'https://galaxystore.samsung.com/detail/com.nianticlabs.pokemongo.ares';
const PlayStoreEndpoint = 'https://play.google.com/store/apps/details?id=com.nianticlabs.pokemongo&hl=en_US';
const AppStoreEndpoint = 'https://apps.apple.com/us/app/pokémon-go/id1094591345';

const service = new VersionMonitor({
  provider: ServiceProviderType.Niantic,
  url: PokemonGoEndpoint,
  intervalS: config.intervalS,
  parser: parsePokemonVersion,
  callback: (options: VersionChangedCallbackOptions) => {
    sendWebhooks(config.webhooks, options.previousVersion, options.latestVersion, '');
  },
});
service.start();