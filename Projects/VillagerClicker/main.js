// Elements //
const Heart      = {health1, health2, health3, health4, health5, health6, health7, health8, health9, health10},
      BoardElem  = document.querySelector('.Board'),
      Bossbar    = document.querySelector('#Bossbar'),
      Favicon    = document.querySelector('#favicon'),
      HotbarElem = document.querySelector('#Hotbar'),
      LevelElem  = document.querySelector('.Level'),
      Shops      = document.querySelector('#Shops'),
      Title      = document.querySelector('title'),
      Villager   = document.querySelector('#Villager');

// TODO const Movement = {
//  cosecant   : async ()=>1 / Math.sin(x),
//  cosine     : async ()=>Math.cos(x),
//  cotangent  : async ()=>Math.cos(x) / Math.sin(x),
//  cubic      : async ()=>Math.pow(x, 3),
//  logarithmic: async ()=>Math.log(x),
//  secant     : async ()=>1 / Math.cos(x),
//  sine       : async ()=>Math.sin(x),
//  squared    : async ()=>Math.pow(x, 2),
//  tangent    : async ()=>Math.sin(x) / Math.cos(x)
//};

for (let H = 10; H>=1; H--) {Heart[`health${H}`] = document.querySelector(`#health${H}`);}

// Variables //
let level = 1, x = Villager.x;

let clientWidth = BoardElem.clientWidth, clientHeight = BoardElem.clientHeight;

const GameLevels = [
	{name: 'The Death', health: NaN, size: '0', background: 'Backgrounds/DeathScreen.webp', head: undefined},
	{name: 'The Nitwit', health: 10, phases: 1, size: '300px', background: 'Backgrounds/generic.webp', head: 'Heads/Nitwit.webp'},
	{name: 'The Farmer', health: 20, phases: 2, size: '275px', background: 'Backgrounds/farm.webp', head: 'Heads/Farmer.webp'},
	{name: 'The Mason', health: 30, phases: 2, size: '250px', background: 'Backgrounds/mason.jpg', head: 'Heads/Nitwit.webp'},
	{name: 'The Librarian', health: 40, phases: 3, size: '200px', background: 'Backgrounds/library.webp', head: 'Heads/Librarian.webp'},
	{name: 'The Weaponsmith', health: 50, phases: 3, size: '180px', background: 'Backgrounds/blacksmith.webp', head: 'Heads/Weaponsmith.webp'},
	{name: 'The Cleric', health: 64, phases: 4, size: '150px', background: 'Backgrounds/church.webp', head: 'Heads/Cleric.webp'},
	{name: 'The Wandering Trader', health: 100, phases: 5, size: '100px', background: 'Backgrounds/traderBack.webp', head: 'Heads/trader.webp'},
	{name: 'Main Menu', size: '0', background: 'Backgrounds/MainMenu.webp', head: undefined}
];

let VillagerHealth = GameLevels[level].health / GameLevels[level].phases,
    VillagerHeight = parseInt(GameLevels[level].size.height),
    VillagerWidth  = parseInt(GameLevels[level].size.width),
    Speed_Y        = 30,
    Speed_X        = 30,
    PlayerDamage   = 0,
    Points         = 0,
    Pos_X,
    Pos_Y,
    Interval,
    VillagerSize,
    LastTime;

Title.textContent = `${GameLevels[level].name} - Villager Clicker`;

const Update = Timestamp=>{
	// Update timing for FPS calculations //
	LastTime || (LastTime = Timestamp);
	LevelElem.textContent = `Level ${level} - ${GameLevels[level].name}`;

	if (Points>=VillagerHealth) {
		level++;

		Title.textContent = `${GameLevels[level].name} - Villager Clicker`;
		Favicon.href = GameLevels[level].head;
		Villager.style.backgroundImage = `url(${GameLevels[level].head})`;

		Speed_Y *= 0.75;
		Speed_X *= 0.75;
		Points = 0;
		new Audio('Audio/Villager_Death.mp3').play();
		DrawAll();
	}

	DrawVillager(Timestamp);

	LastTime = Timestamp;
	requestAnimationFrame(Update);
};

window.addEventListener('resize', ()=>DrawAll());

Interval = requestAnimationFrame(Update);

const PlayerData = {
	Items    : [
		{
			id: 0, image: 'Items/Empty.webp', name: 'Empty'
		}, {
			type: 'sword', action: 'attack', tier: {
				diamond     : {
					name: 'Diamond Sword', damage: 5, aoa: 7, image: 'Items/DiamondSword.png', attackSpeed: 630, aria: {name: 'Diamond Sword', lore: 'diamondy'}
				}, id       : 1, iron: {
					name: 'Iron Sword', damage: 3, aoa: 7, image: 'Items/IronSword.png', attackSpeed: 630, aria: {name: 'Iron Sword', lore: 'irony'}
				}, netherite: {
					name: 'Netherite Sword', damage: 7, aoa: 8, image: 'Items/NetheriteSword.png', attackSpeed: 630, aria: {name: 'Netherite Sword', lore: 'tina'}
				}, stone    : {
					name: 'Stone Sword', damage: 1, aoa: 6, image: 'Items/StoneSword.png', attackSpeed: 630, aria: {name: 'Stone Sword', lore: 'stoney'}
				}, wooden   : {
					name: 'Wooden Sword', damage: 0, aoa: 6, image: 'Items/WoodenSword.png', attackSpeed: 630, aria: {name: 'Wooden Sword', lore: 'woody'}
				}
			}
		}, {
			type: 'axe', action: 'attack', tier: {
				wooden      : {
					name: 'Wooden Axe', damage: 1, aoa: 0, image: 'Items/WoodenAxe.png', attackSpeed: 1250, aria: {name: 'Wooden Axe', lore: 'woody'}
				}, stone    : {
					name: 'Stone Axe', damage: 3, aoa: 0, image: 'Items/StoneAxe.png', attackSpeed: 1250, aria: {name: 'Stone Axe', lore: 'stoney'}
				}, iron     : {
					name: 'Iron Axe', damage: 4, aoa: 0, image: 'Items/IronAxe.png', attackSpeed: 1110, aria: {name: 'Iron Axe', lore: 'irony'}
				}, diamond  : {
					name: 'Diamond Axe', damage: 7, aoa: 0, image: 'Items/DiamondAxe.png', attackSpeed: 1000, aria: {name: 'Diamond Axe', lore: 'diamondy'}
				}, netherite: {
					name: 'Netherite Axe', damage: 9, aoa: 0, image: 'Items/NetheriteAxe.png', attackSpeed: 1000, aria: {name: 'Netherite Axe', lore: 'tina'}
				}, id       : 2
			}
		}, {
			type: 'pickaxe', action: 'attack', tier: {
				wooden      : {
					name: 'Wooden Pickaxe', damage: 0, aoa: -7, image: 'Items/WoodenPickaxe.png', attackSpeed: 200, aria: {name: 'Wooden Pickaxe', lore: 'woody'}
				}, stone    : {
					name: 'Stone Pickaxe', damage: 1, aoa: -6, image: 'Items/StonePickaxe.png', attackSpeed: 200, aria: {name: 'Stone Pickaxe', lore: 'stoney'}
				}, iron     : {
					name: 'Iron Pickaxe', damage: 2, aoa: -5, image: 'Items/IronPickaxe.png', attackSpeed: 200, aria: {name: 'Iron Pickaxe', lore: 'irony'}
				}, diamond  : {
					name: 'Diamond Pickaxe', damage: 3, aoa: -4, image: 'Items/DiamondPickaxe.png', attackSpeed: 150, aria: {name: 'Diamond Pickaxe', lore: 'diamondy'}
				}, netherite: {
					name: 'Netherite Pickaxe', damage: 5, aoa: -3, image: 'Items/NetheritePickaxe.png', attackSpeed: 100, aria: {name: 'Netherite Pickaxe', lore: 'tina'}
				}, id       : 3
			}
		}, {action: null, id: 4, image: 'Items/Totem.png', item: 'Totem', name: 'Totem of Undying', type: 'Totem'}
	], Hotbar: [
		{item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}
	], Shops : {
		cleric        : {
			name   : 'The Cleric', contents: {
				potions       : [
					{
						name: 'Healing Potion', duration: 'instant', effect: ['Healing'], strength: [1, 2, 3]
					}, {
						name: 'Speed Potion', duration: 0.5, effect: ['Speed'], strength: [1, 2, 3]
					}, {
						name: 'Strength Potion', duration: 0.75, effect: ['Strength'], strength: [1, 2]
					}, {
						name: 'Resistance Potion', duration: 0.25, effect: ['Resistance'], strength: [1]
					}
				], specialfood: [
					{
						name: 'Golden Carrot', hunger: 4, confoundingEffect: ['Vision']
					}, {
						name: 'Golden Apple', hunger: 6, confoundingEffect: ['Resistance']
					}, {
						name: 'Enchanted Golden Apple', hunger: 8, confoundingEffect: ['Healing', 'Resistance', 'Vision']
					}
				], tables     : ['EnchantingTable']
			}, icon: 'Shops/Cleric.png'
		}, weaponsmith: {
			name    : 'The Weaponsmith', contents: [
				{
					Sword     : {
						Precision: 0.3, Speed: 1.0, Strength: 0.7
					}, Axe    : {
						Precision: 1.3, Strength: 1.7, Speed: 0.7
					}, Pickaxe: {
						Precision: 3.0, Strength: 2.2, Speed: 0.7
					}
				}, {SmithingTable: !1}
			], model: 'Shops/cleric.png'
		}, armorer    : {
			name   : 'The Armorer', content: {
				armor    : [
					'Leather', 'Chain', 'Iron', 'Gold', 'Diamond', 'Netherite'
				], tables: ['SmithingTable', 'Anvil']
			}, icon: 'Shops/armorer.png'
		}, farmer     : {
			name   : 'The Farmer', content: {
				food     : [
					{
						name: 'Cooked Steak', hunger: 8, confoundingEffect: !1
					}, {
						name: 'Baked Potato', hunger: 6, confoundingEffect: !1
					}, {
						name: 'Carrot', hunger: 4, confoundingEffect: !1
					}, {
						name: 'Cooked Chicken', hunger: 10, confoundingEffect: !1
					}, {
						name: 'Apple', hunger: 2, confoundingEffect: !1
					}, {
						name: 'Cake', hunger: 16, confoundingEffect: !1
					}
				], tables: ['Smoker', 'Campfire']
			}, icon: 'Shops/farmer.png'
		}, mason      : {
			name   : 'The Mason', content: {
				materials: [
					{
						Base: 'Wood', Stock: 256, Health: 3
					}, {
						Base: 'Stone', Stock: 256, Health: 6
					}, {
						Base: 'Brick', Stock: 256, Health: 9
					}
				], tables: ['stonecutter']
			}, icon: 'Shops/mason.png'
		}, stations   : {
			enchantingTable: {acquired: !1, lapis: 0, level: 1},
			smithingTable  : {acquired: !1},
			stonecutter    : {acquired: !1, level: 0},
			grindstone     : {acquired: !1, modules: {recycle: !1}},
			anvil          : {acquired: !1, damage: 0},
			campfire       : {acquired: !1, fuel: 0},
			furnace        : {
				acquired: !1, fuel: 0, modules: {
					upgraded: !1, blast: !1, smoke: !1
				}
			}
		}, classist   : {
			playerClass: 'unclassified', // Can be ['? (unknown)','Engineer (Idle)','Bowman (Range)','Mage (Magic)','Brute' (Melee)]
			unset      : !1, engineer: !1, fletcher: !1, illusioner: !1, brute: !1
		}
	}
};

// Draw //

function DrawAll() {
	VillagerWidth = parseInt(GameLevels[level].size);
	VillagerHeight = VillagerWidth * 1.25;
	VillagerSize = Math.max(Villager.clientWidth, Villager.clientHeight);

	Pos_Y = Math.random() * (BoardElem.clientHeight - VillagerSize - VillagerHeight);
	Pos_X = Math.random() * (BoardElem.clientWidth - VillagerSize - VillagerWidth);

	Villager.style.width = GameLevels[level].size;
	Villager.style.height = `${VillagerHeight}px`;
	Villager.style.left = `${Pos_X}px`;
	Villager.style.top = `${Pos_Y}px`;
	Villager.style.backgroundImage = `url(${GameLevels[level].head})`;

	DrawBackground();
	DrawBossbar();
	DrawHearts();
}

function DrawHearts() {
	for (let D = 10; D>=1; D--) {
		if (10 - PlayerDamage<D) {
			if (10 - PlayerDamage==D - 0.5) Heart[`health${D}`].status = 'half', Heart[`health${D}`].src = 'Stats/HalfHeart.png';
			if (10 - PlayerDamage<D - 0.5) Heart[`health${D}`].status = 'empty', Heart[`health${D}`].src = 'Stats/Empty.png'
		} else Heart[`health${D}`].status = 'full', Heart[`health${D}`].src = 'Stats/FullHeart.png';
	}
}

function DrawBossbar() {
	Bossbar.value = GameLevels[level].health - Points;
	Bossbar.max = GameLevels[level].health;
}

function DrawBackground() {
	BoardElem.style.background = `url(${GameLevels[level].background})`;
	BoardElem.style.Backgroundsize = '100% 100%';
}

function DrawVillager(Timestamp) {
	let Delta_X = Pos_X + Speed_X * ((LastTime - Timestamp) / 500), DY = Pos_Y + Speed_Y * ((LastTime - Timestamp) / 500);

	if (DY>=clientHeight - VillagerHeight) DY = clientHeight - VillagerHeight, Speed_Y *= -1;
	if (DY<0) DY = 0, Speed_Y = -Speed_Y;
	if (Delta_X>=clientWidth - VillagerWidth) Delta_X = clientWidth - VillagerWidth, Speed_X *= -1;
	if (Delta_X<0) Delta_X = 0, Speed_X = -Speed_X;

	Pos_X = Delta_X, Pos_Y = DY;

	Villager.style.width = GameLevels[level].size;
	Villager.style.height = `${(parseInt(GameLevels[level].size) * 1.25)}px`;
	Villager.style.left = `${Pos_X}px`;
	Villager.style.top = `${Pos_Y}px`;
}

// Functions //

function PlayerAttack() {
	Points++;

	new Audio('Audio/Villager_Hurt.mp3').play();

	Speed_X = -Speed_Y, Speed_Y = -Speed_X;
	Speed_X>0 ? Speed_X += 50 : Speed_X -= 50, Speed_Y>0 ? Speed_Y += 50 : Speed_Y -= 50;

	for (let i = 0; i<=35; i++) {
		requestAnimationFrame(()=>{
			if (Math.random()<0.5) Villager.style.rotate = `${i}deg`; else Villager.style.rotate = `-${i}deg`;
		})
	}

	Villager.style.filter = `blur(${(Math.PI / Speed_X)}px)`;
	Villager.style.transition = '0.1s ease-out';
	setTimeout(()=>{
		Villager.style.filter = '';
		Villager.style.transition = '';
		for (let i = 35; i>=0; i--) {requestAnimationFrame(()=>Villager.style.rotate = `${i}deg`)}
	}, 175);

	DrawAll();
}

function VillagerAttack() {
	level!==0 && (new Audio('Audio/Player_Hurt.mp3').play(), PlayerDamage += 0.5, DrawHearts());

	if (level!==0 && PlayerDamage>=20) {
		//TODO if (()=>Hotbar.forEach(item=>item.type==='Totem')) {PlayerDamage *= 0.25}
		level = 0;
		//TODO document.querySelector('.Chat').style.display = 'none';
		HotbarElem.transition = '1s linear';
		HotbarElem.scaleY = 0;
		DrawAll();
		cancelAnimationFrame(Interval);
	}
}

function HotbarClick(IntSlot) {
	const Slot = IntSlot.id.slice(4), Item = PlayerData.Hotbar[Slot];
	Item.type && new HandleItem(Slot, Item);
}

function HandleItem(ID) {
	let Slot = ID.id.split('item')[1].trim();
	//TODO let Item = [... (PlayerData.Hotbar)][Slot];

	//TODO switch (Item.type) {
	//	case 'sword':
	//		let {aoa, damage, attackSpeed, name, image, aria} = Item.tier[`${Item.tier}`];
	//		AttackData(aoa, damage, attackSpeed, name, image, aria);
	//	case 'axe':
	//	case 'pickaxe':
	//	case 'potion':
	//	case 'Totem':
	//	default:
	//		console.info(`Case saw ${Item}, ${this}`);
	//		break;
	//}
}

// Start Shops //

for (let s = 0; s<Shops.length; s++) Shops.children[s].innerHTML = PlayerData.Shops[i];

//const AttackData = (aoa, damage, attackSpeed, name, image, aria)=>{let AttackData = {aoa, damage, attackSpeed, name, image, aria}};

// Begin //

DrawAll();
DrawHearts();