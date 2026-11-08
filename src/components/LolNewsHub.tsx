import React, { useState } from 'react';
import { Sparkles, Tag, ShoppingBag, Flame, Clock, Shield, AlertCircle, ArrowUpRight, Check, Trophy } from 'lucide-react';

interface SkinSale {
  id: string;
  champion: string;
  skinName: string;
  splashUrl: string;
  originalRp: number;
  saleRp: number;
  discountPercent: number;
  endsIn: string;
  featured?: boolean;
}

interface MythicShopItem {
  id: string;
  name: string;
  type: 'Prestige Skin' | 'Mythic Skin' | 'Mythic Chroma';
  splashUrl: string;
  mythicEssenceCost: number;
  includesBorder: boolean;
  leavesShopIn: string;
}

interface PatchChange {
  championOrItem: string;
  iconUrl: string;
  type: 'BUFF' | 'NERF' | 'ADJUSTED';
  summary: string;
  details: string[];
}

export const LolNewsHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'patch' | 'sales' | 'mythic' | 'free_champs'>('patch');

  // Patch Notes Data
  const patchChanges: PatchChange[] = [
    {
      championOrItem: 'Vayne',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png',
      type: 'BUFF',
      summary: 'Base attack damage increased, Night Hunter movement speed increased towards low-health targets.',
      details: [
        'Base Attack Damage: 60 → 62',
        'Night Hunter (Passive): Bonus movement speed increased from 30 to 35 (increased to 90 during Final Hour)',
        'Condemn (E): Base knockback damage increased by 10 at all ranks',
      ],
    },
    {
      championOrItem: 'Caitlyn',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Caitlyn.png',
      type: 'NERF',
      summary: 'Headshot early damage toned down to reduce oppressive bot lane priority.',
      details: [
        'Headshot (Passive): Critical strike scaling reduced from 60% to 50% at early levels',
        'Yordle Snap Trap (W): Recharge cooldown increased from 26/22/18/14/10s to 30/25/20/15/10s',
      ],
    },
    {
      championOrItem: "Kai'Sa",
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png',
      type: 'BUFF',
      summary: 'Icathian Rain bonus AD ratio buffed, improving early wave manipulation.',
      details: [
        'Icathian Rain (Q): Bonus AD scaling per missile increased from 50% to 55%',
        'Supercharge (E): Attack speed duration increased by 0.5 seconds post-stealth',
      ],
    },
    {
      championOrItem: 'Blade of the Ruined King',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3153.png',
      type: 'BUFF',
      summary: 'Combine cost reduced and on-hit damage stabilized for on-hit marksmen.',
      details: [
        'Total Gold Cost: 3300g → 3200g',
        'Mist\'s Edge On-Hit Damage: 9% current health damage (ranged) → 10% current health damage',
      ],
    },
    {
      championOrItem: 'Infinity Edge',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3031.png',
      type: 'ADJUSTED',
      summary: 'Recipe adjusted to include Pickaxe instead of two B.F. Swords for smoother purchase curves.',
      details: [
        'Build Path: B.F. Sword + Pickaxe + Cloak of Agility + 625g',
        'Attack Damage: 80 (Unchanged)',
        'Critical Strike Damage: 40% (Unchanged)',
      ],
    },
  ];

  // Skin Sales Data
  const skinSales: SkinSale[] = [
    {
      id: 'vayne_project',
      champion: 'Vayne',
      skinName: 'PROJECT: Vayne',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_11.jpg',
      originalRp: 1820,
      saleRp: 1365,
      discountPercent: 25,
      endsIn: '3 days 14 hours',
      featured: true,
    },
    {
      id: 'kaisa_inkshadow',
      champion: "Kai'Sa",
      skinName: "Inkshadow Kai'Sa",
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_40.jpg',
      originalRp: 1350,
      saleRp: 675,
      discountPercent: 50,
      endsIn: '3 days 14 hours',
    },
    {
      id: 'lucian_high_noon',
      champion: 'Lucian',
      skinName: 'High Noon Lucian',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lucian_9.jpg',
      originalRp: 1820,
      saleRp: 1092,
      discountPercent: 40,
      endsIn: '3 days 14 hours',
    },
    {
      id: 'jinx_star_guardian',
      champion: 'Jinx',
      skinName: 'Star Guardian Jinx',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_4.jpg',
      originalRp: 1820,
      saleRp: 910,
      discountPercent: 50,
      endsIn: '3 days 14 hours',
    },
    {
      id: 'ahri_spirit_blossom',
      champion: 'Ahri',
      skinName: 'Spirit Blossom Ahri',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_27.jpg',
      originalRp: 1820,
      saleRp: 1092,
      discountPercent: 40,
      endsIn: '3 days 14 hours',
    },
  ];

  // Mythic Shop Rotation
  const mythicShopItems: MythicShopItem[] = [
    {
      id: 'prestige_project_vayne',
      name: 'Prestige PROJECT: Vayne',
      type: 'Prestige Skin',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_11.jpg',
      mythicEssenceCost: 200,
      includesBorder: true,
      leavesShopIn: 'Patch 15.3',
    },
    {
      id: 'prestige_kda_kaisa',
      name: "Prestige K/DA Kai'Sa (2022)",
      type: 'Prestige Skin',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kaisa_14.jpg',
      mythicEssenceCost: 200,
      includesBorder: true,
      leavesShopIn: 'Patch 15.3',
    },
    {
      id: 'ashen_knight_pyke',
      name: 'Ashen Knight Pyke',
      type: 'Mythic Skin',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_25.jpg',
      mythicEssenceCost: 125,
      includesBorder: true,
      leavesShopIn: 'Patch 15.4',
    },
    {
      id: 'crystalis_motus_leona',
      name: 'Crystalis Motus Leona',
      type: 'Mythic Skin',
      splashUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Leona_34.jpg',
      mythicEssenceCost: 125,
      includesBorder: true,
      leavesShopIn: 'Patch 15.4',
    },
  ];

  // Free Champion Rotation
  const freeChampions = [
    { name: 'Vayne', role: 'Marksman', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png' },
    { name: 'Caitlyn', role: 'Marksman', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Caitlyn.png' },
    { name: 'Milio', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Milio.png' },
    { name: 'Nautilus', role: 'Tank', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nautilus.png' },
    { name: 'Ahri', role: 'Mage', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png' },
    { name: 'Yasuo', role: 'Fighter', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Yasuo.png' },
    { name: 'Yone', role: 'Assassin', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Yone.png' },
    { name: 'Lee Sin', role: 'Fighter', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/LeeSin.png' },
    { name: 'Aatrox', role: 'Fighter', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Aatrox.png' },
    { name: 'Thresh', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Thresh.png' },
  ];

  return (
    <div className="space-y-6">
      {/* News Top Header with Apple Translucent Frosted Glass */}
      <div className="glass-panel glass-specular rounded-2xl p-5 sm:p-6 border border-white/12 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide">
                League of Legends Hub &amp; Live News
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Current Patch 15.1 notes, weekly skin sales with RP discounts, and the Mythic Essence shop rotation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
              Season 2026 Split 1
            </span>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 pt-4 flex-wrap">
          <button
            onClick={() => setActiveSubTab('patch')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'patch'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Patch 15.1 Notes</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sales')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'sales'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Weekly Skin Sales (-50%)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('mythic')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'mythic'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
            <span>Mythic Shop Rotation</span>
          </button>

          <button
            onClick={() => setActiveSubTab('free_champs')}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeSubTab === 'free_champs'
                ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Free Champion Rotation</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PATCH NOTES */}
      {activeSubTab === 'patch' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Patch 15.1 Balance Updates</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Official Riot Games Data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patchChanges.map((change, idx) => (
              <div
                key={idx}
                className="glass-panel-interactive rounded-2xl p-4 sm:p-5 border border-white/10 bg-slate-950/35"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={change.iconUrl}
                      alt={change.championOrItem}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white">{change.championOrItem}</h4>
                      <span
                        className={`text-[10px] font-mono font-black px-2 py-0.5 rounded border ${
                          change.type === 'BUFF'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : change.type === 'NERF'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}
                      >
                        {change.type}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {change.summary}
                </p>

                <div className="space-y-1.5 bg-black/40 p-3 rounded-xl border border-white/5">
                  {change.details.map((detail, dIdx) => (
                    <div key={dIdx} className="text-[11px] font-mono text-slate-300 flex items-start gap-1.5">
                      <span className="text-rose-400 mt-0.5">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: WEEKLY SKIN SALES */}
      {activeSubTab === 'sales' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <Tag className="w-4 h-4 text-cyan-400" />
              <span>Weekly Skin Discounts (Up to 50% Off)</span>
            </h3>
            <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Rotates in 3 days 14 hours
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skinSales.map((sale) => (
              <div
                key={sale.id}
                className="glass-panel-interactive rounded-2xl overflow-hidden border border-white/10 group flex flex-col justify-between"
              >
                {/* Skin Splash Header */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={sale.splashUrl}
                    alt={sale.skinName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-xl text-xs font-black font-mono bg-rose-500 text-white shadow-lg border border-rose-400/50">
                    -{sale.discountPercent}% OFF
                  </div>

                  {sale.featured && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-amber-500/90 text-black shadow">
                      FEATURED
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-mono text-rose-300 font-semibold">{sale.champion}</div>
                    <div className="text-base font-black text-white tracking-wide truncate">{sale.skinName}</div>
                  </div>
                </div>

                {/* Price and Action Bar */}
                <div className="p-4 bg-slate-950/60 backdrop-blur-md flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 line-through">
                      {sale.originalRp} RP
                    </div>
                    <div className="text-base font-black text-emerald-400 font-mono flex items-center gap-1">
                      <span>{sale.saleRp} RP</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {sale.endsIn} left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MYTHIC SHOP ROTATION */}
      {activeSubTab === 'mythic' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <ShoppingBag className="w-4 h-4 text-purple-400" />
              <span>Mythic Shop Rotation (Mythic Essence ME)</span>
            </h3>
            <span className="text-xs text-purple-300 font-mono">
              Available in Hextech Loot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mythicShopItems.map((item) => (
              <div
                key={item.id}
                className="glass-panel-interactive rounded-2xl overflow-hidden border border-purple-500/30 group bg-slate-950/40"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={item.splashUrl}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl text-xs font-black font-mono bg-purple-600 text-white shadow-lg border border-purple-400/50 flex items-center gap-1.5">
                    <span>{item.mythicEssenceCost} ME</span>
                  </div>

                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-purple-500/30 text-purple-200 border border-purple-400/40">
                    {item.type}
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-lg font-black text-white">{item.name}</div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                      <span>Border + Icon Included</span>
                      <span>•</span>
                      <span className="text-amber-400 font-semibold">Leaves {item.leavesShopIn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FREE CHAMPION ROTATION */}
      {activeSubTab === 'free_champs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Weekly Free Champion Rotation</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Available across all unranked queues
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {freeChampions.map((champ, idx) => (
              <div
                key={idx}
                className="glass-panel-interactive rounded-xl p-3 border border-white/10 flex items-center gap-3 bg-slate-950/30"
              >
                <img
                  src={champ.iconUrl}
                  alt={champ.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-xl object-cover border border-white/20 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{champ.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{champ.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
