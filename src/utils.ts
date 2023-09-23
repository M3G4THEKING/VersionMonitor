import locales from './locales.json';
import { DiscordWebhookMessage } from './types';

const AvatarUrl = 'https://w7.pngwing.com/pngs/652/369/png-transparent-pokemon-go-computer-icons-raid-niantic-pokemongo-video-game-boss-pokemon.png';

export const generateEmbed = (oldVersion: string, newVersion: string, message: string) => {
  const isRevert = oldVersion > newVersion;
  const isLatest = oldVersion === newVersion;
  const embed: DiscordWebhookMessage = {
    username: locales.Embed.Author.Username ?? 'Pokemon Go Version Monitor',
    avatar_url: locales.Embed.Author.AvatarUrl ?? AvatarUrl,
    embeds: [{
      title: locales.Embed.Title ?? 'Pokemon Go Version Forced!',
      description: isRevert ? locales.Embed.RevertVersion ?? 'Previous Version Reverted!' : '',
      color: isLatest ? /*GREEN*/ 0x00ff00 : /*RED*/ 0xff0000,
      fields: [{
        name: locales.Embed.PreviousVersion ?? 'Previous',
        value: oldVersion,
        inline: true,
      },{
        name: locales.Embed.LatestVersion ?? 'Latest',
        value: newVersion,
        inline: true,
      }],
      footer: {
        text: isLatest
          ? locales.Embed.Footer.Latest ?? 'LATEST API VERSION'
          : locales.Embed.Footer.NewRelease ?? 'NEW POGO API RELEASED',
      },
    }],
  };
  return embed;
};

export const sendWebhooks = (webhooks: string[], oldVersion: string, newVersion: string, message: string) => {
  if (webhooks.length === 0) {
    return;
  }

  const embed = generateEmbed(oldVersion, newVersion, message);
  for (const url of webhooks) {
    sendRequest(url, embed);
  }
};

export const sendRequest = (url: string, embed: DiscordWebhookMessage) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(embed),
  }).then((response: Response) => {
    //console.log('webhook sent:', response);
  }).catch((err: any) => {
    console.error(err);
    // TODO: Handle rate limit
  }).finally(() => {
    console.log('webhook finished');
  });
};