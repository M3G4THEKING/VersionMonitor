export enum ServiceProviderType {
  Niantic = 'Niantic',
  Google = 'Google Play Store',
  Apple = 'Apple App Store',
  Samsung = 'Samsung Galaxy Store',
};

export interface VersionMonitorOptions {
  provider: ServiceProviderType;
  url: string;
  intervalS: number;
  parser: (body: string) => string;
  callback: (options: VersionChangedCallbackOptions) => void;
};

export interface VersionChangedCallbackOptions {
  previousVersion: string;
  latestVersion: string;
  isRevert: boolean;
};

export type VersionMonitorConfig = {
  intervalS: number;
  webhooks: string[];
};

// Discord Types
export type DiscordWebhookMessage = {
  content?: string;
  username: string;
  avatar_url?: string;
  embeds?: DiscordEmbedMessage[];
};

export type DiscordEmbedMessage = {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: DiscordEmbedField[];
  footer?: DiscordEmbedFooter;
};

export type DiscordEmbedField = {
  name: string;
  value: string;
  inline?: boolean;
};

export type DiscordEmbedFooter = {
  text?: string;
  icon_url?: string;
};