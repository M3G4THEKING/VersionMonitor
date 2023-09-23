import {
  ServiceProviderType,
  VersionChangedCallbackOptions,
  VersionMonitorOptions,
} from './types';

const QueryFailed = 'Version Query Failed';

export class VersionMonitor {
  public provider: ServiceProviderType;
  public url: string;
  public intervalS: number;

  private timer?: NodeJS.Timer;
  private latestVersion: string;
  private previousVersion: string;
  private versionParser: (body: string) => string;
  private versionChangedCallback: (options: VersionChangedCallbackOptions) => void;

  constructor(options: VersionMonitorOptions) {
    this.provider = options.provider;
    this.url = options.url;
    this.intervalS = options.intervalS;

    this.latestVersion = '';
    this.previousVersion = '';
    this.versionParser = options.parser;
    this.versionChangedCallback = options.callback;
  }

  start = (): void => {
    console.log(`Starting version monitor for provider '${this.provider}'...`);
    this.timer = setInterval(this.checkVersions, this.intervalS * 1000);
  }

  stop = (): void => {
    console.log(`Stopping version monitor for provider '${this.provider}'...`);
    clearInterval(this.timer);
  }

  isVersionChanged = (oldVersion: string, newVersion: string): boolean =>
    oldVersion !== newVersion && newVersion !== '' && oldVersion !== '' &&
    newVersion !== QueryFailed && oldVersion !== QueryFailed;

  queryVersion = async (): Promise<string> => {
    const response = await fetch(this.url); //, { headers: { agent: config.proxyHost } });
    if (!response.ok) {
      return QueryFailed;
    }
  
    const body = await response.text();
    if (!body) {
      return `${this.provider} Response Body Empty!`;
    }
  
    if (!this.versionParser) {
      return body;
    }

    const parsed = this.versionParser(body);
    return parsed;
  }

  checkVersions = async (): Promise<void> => {
    this.latestVersion = await this.queryVersion();
    if (!this.previousVersion) {
      this.previousVersion = this.latestVersion;
    }

    if (!this.isVersionChanged(this.previousVersion, this.latestVersion)) {
      return;
    }

    this.versionChangedCallback({
      latestVersion: this.latestVersion,
      previousVersion: this.previousVersion,
      isRevert: this.latestVersion < this.previousVersion,
    });
    this.previousVersion = this.latestVersion;
  }
};