/**
 * Official League of Legends / OP.GG asset helpers and ranked crests
 */

export const RANK_EMBLEMS: Record<string, string> = {
  IRON: 'https://opgg-static.akamaized.net/images/medals_new/iron.png',
  BRONZE: 'https://opgg-static.akamaized.net/images/medals_new/bronze.png',
  SILVER: 'https://opgg-static.akamaized.net/images/medals_new/silver.png',
  GOLD: 'https://opgg-static.akamaized.net/images/medals_new/gold.png',
  PLATINUM: 'https://opgg-static.akamaized.net/images/medals_new/platinum.png',
  EMERALD: 'https://opgg-static.akamaized.net/images/medals_new/emerald.png',
  DIAMOND: 'https://opgg-static.akamaized.net/images/medals_new/diamond.png',
  MASTER: 'https://opgg-static.akamaized.net/images/medals_new/master.png',
  GRANDMASTER: 'https://opgg-static.akamaized.net/images/medals_new/grandmaster.png',
  CHALLENGER: 'https://opgg-static.akamaized.net/images/medals_new/challenger.png',
};

export function getRankEmblemUrl(tier: string): string {
  const upper = (tier || '').toUpperCase();
  return RANK_EMBLEMS[upper] || RANK_EMBLEMS.EMERALD;
}

export const FALLBACK_CHAMPION_ICON = 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png';
export const FALLBACK_SPELL_ICON = 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png';
export const FALLBACK_ITEM_ICON = 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/1055.png';
