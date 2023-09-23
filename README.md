![ts](https://badgen.net/badge/Built%20With/TypeScript/blue)
[![GitHub Release](https://img.shields.io/github/release/versx/DiscordGuildStats.svg)](https://github.com/versx/DiscordGuildStats/releases/)
[![GitHub Contributors](https://img.shields.io/github/contributors/versx/DiscordGuildStats.svg)](https://github.com/versx/DiscordGuildStats/graphs/contributors/)
[![Discord](https://img.shields.io/discord/552003258000998401.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://discord.gg/zZ9h9Xa)  

# Pokemon Go Version Monitor

Monitors version releases for Pokemon Go via Niantic's forced versioning of the game. It can also monitor new releases of Pokemon Go via the following app stores:  
- Apple App Store  
- Google Play Store  
- Samsung Galaxy Store  

## Prerequisites
- [Node.js v16 or higher](https://nodejs.org/en/download)  

## Installation  
1. Clone repository: `git clone https://github.com/versx/VersionMonitor`  
1. Install packages: `npm install`  
1. Copy example config: `cp src/config.example.json src/config.json`  
1. Fill out config options.  
1. Build project in root folder: `npm run build`  
1. Run: `npm run start`  

## Updating  
1. Pull latest changes in root folder `git pull`  
1. Build project in root folder: `npm run build`  
1. Run `npm run start`  

## Configuration  
```json
{
  // Time interval in seconds to check for newer version
  "intervalS": 60,
  // Discord channel webhook URLs to receive version message
  "webhooks": []
}
```