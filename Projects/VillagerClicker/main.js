// Elements //

const BoardElem  = document.querySelector('.Board'),
      Bossbar    = document.querySelector('#Bossbar'),
      Favicon    = document.querySelector('#favicon'),
      Heart      = {health1, health2, health3, health4, health5, health6, health7, health8, health9, health10},
      HotbarElem = document.querySelector('#Hotbar'),
      LevelElem  = document.querySelector('.Level'),
      Shops      = document.querySelector('#Shops'),
      Title      = document.querySelector('title'),
      Villager   = document.querySelector('#Villager'),
      TitleCard  = document.querySelector('#Title_Card'),
      MainMenu   = document.querySelector('#MainMenu');

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
let level = 9, x = Villager.x;

let clientWidth = BoardElem.clientWidth, clientHeight = BoardElem.clientHeight;

const GameLevels = [
	{name: 'The Death', size: 0, background: 'Backgrounds/Exterior1.png'},
	{name: 'The Nitwit', health: 10, phases: 1, size: '300px', background: 'Backgrounds/Nitwit.png', head: 'Heads/Nitwit.webp'},
	{name: 'The Farmer', health: 20, phases: 2, size: '275px', background: 'Backgrounds/Farm.png', head: 'Heads/Farmer.webp'},
	{name: 'The Mason', health: 30, phases: 2, size: '250px', background: 'Backgrounds/Mason.png', head: 'Heads/Nitwit.webp'},
	{name: 'The Librarian', health: 40, phases: 3, size: '200px', background: 'Backgrounds/Interior1.png', head: 'Heads/Librarian.webp'},
	{name: 'The Weaponsmith', health: 50, phases: 3, size: '180px', background: 'Backgrounds/blacksmith.webp', head: 'Heads/Weaponsmith.webp'},
	{name: 'The Cleric', health: 64, phases: 4, size: '150px', background: 'Backgrounds/Cleric.png', head: 'Heads/Cleric.webp'},
	{name: 'The Wandering Trader', health: 100, phases: 5, size: '100px', background: 'Backgrounds/Trader.png', head: 'Heads/trader.webp'},
	{name: 'You Win', size: 0, background: 'Backgrounds/Win.png'},
	{name: 'Main Menu', size: 0, background: 'Backgrounds/MainMenu.png'}
];

let Interval,
    LastTime,
    PlayerDamage   = 0,
    Points         = 0,
    Pos            = {X: 0, Y: 0},
    Speed_X        = 30,
    Speed_Y        = 30,
    VillagerHealth = GameLevels[level].health / GameLevels[level].phases,
    VillagerHeight = parseFloat(GameLevels[level].size.width * 1.25),
    VillagerWidth  = parseFloat(GameLevels[level].size.width);

Title.textContent = `${GameLevels[level].name} - Villager Clicker`;

const Update = Timestamp=>{
	// Update timing for FPS calculations //
	LastTime || (LastTime = Timestamp);
	Draw_Villager();

	Time_Pos_Calc(Timestamp);
	LastTime = Timestamp;
	requestAnimationFrame(Update);
};

window.addEventListener('resize', ()=>Draw_All(true));

const PlayerData = {
	Items    : [
		{id: 0, image: 'Items/Empty.webp', name: 'Empty'}, {
			type: 'sword', action: 'attack', tier: {
				wooden   : {name: 'Wooden Sword', damage: 0, aoa: 6, image: 'Items/WoodenSword.png', attackSpeed: 630, aria: {name: 'Wooden Sword', lore: 'woody'}},
				stone    : {name: 'Stone Sword', damage: 1, aoa: 6, image: 'Items/StoneSword.png', attackSpeed: 630, aria: {name: 'Stone Sword', lore: 'stoney'}},
				iron     : {name: 'Iron Sword', damage: 3, aoa: 7, image: 'Items/IronSword.png', attackSpeed: 630, aria: {name: 'Iron Sword', lore: 'irony'}},
				diamond  : {name: 'Diamond Sword', damage: 5, aoa: 7, image: 'Items/DiamondSword.png', attackSpeed: 630, aria: {name: 'Diamond Sword', lore: 'diamondy'}},
				netherite: {name: 'Netherite Sword', damage: 7, aoa: 8, image: 'Items/NetheriteSword.png', attackSpeed: 630, aria: {name: 'Netherite Sword', lore: 'tina'}},
				id       : 1
			}
		}, {
			type: 'axe', action: 'attack', tier: {
				wooden   : {name: 'Wooden Axe', damage: 1, aoa: 0, image: 'Items/WoodenAxe.png', attackSpeed: 1250, aria: {name: 'Wooden Axe', lore: 'woody'}},
				stone    : {name: 'Stone Axe', damage: 3, aoa: 0, image: 'Items/StoneAxe.png', attackSpeed: 1250, aria: {name: 'Stone Axe', lore: 'stoney'}},
				iron     : {name: 'Iron Axe', damage: 4, aoa: 0, image: 'Items/IronAxe.png', attackSpeed: 1110, aria: {name: 'Iron Axe', lore: 'irony'}},
				diamond  : {name: 'Diamond Axe', damage: 7, aoa: 0, image: 'Items/DiamondAxe.png', attackSpeed: 1000, aria: {name: 'Diamond Axe', lore: 'diamondy'}},
				netherite: {name: 'Netherite Axe', damage: 9, aoa: 0, image: 'Items/NetheriteAxe.png', attackSpeed: 1000, aria: {name: 'Netherite Axe', lore: 'tina'}},
				id       : 2
			}
		}, {
			type: 'pickaxe', action: 'attack', tier: {
				wooden   : {name: 'Wooden Pickaxe', damage: 0, aoa: -7, image: 'Items/WoodenPickaxe.png', attackSpeed: 200, aria: {name: 'Wooden Pickaxe', lore: 'woody'}},
				stone    : {name: 'Stone Pickaxe', damage: 1, aoa: -6, image: 'Items/StonePickaxe.png', attackSpeed: 200, aria: {name: 'Stone Pickaxe', lore: 'stoney'}},
				iron     : {name: 'Iron Pickaxe', damage: 2, aoa: -5, image: 'Items/IronPickaxe.png', attackSpeed: 200, aria: {name: 'Iron Pickaxe', lore: 'irony'}},
				diamond  : {name: 'Diamond Pickaxe', damage: 3, aoa: -4, image: 'Items/DiamondPickaxe.png', attackSpeed: 150, aria: {name: 'Diamond Pickaxe', lore: 'diamondy'}},
				netherite: {name: 'Netherite Pickaxe', damage: 5, aoa: -3, image: 'Items/NetheritePickaxe.png', attackSpeed: 100, aria: {name: 'Netherite Pickaxe', lore: 'tina'}},
				id       : 3
			}
		}, {action: null, id: 4, image: 'Items/Totem.png', item: 'Totem', name: 'Totem of Undying', type: 'Totem'}
	], Hotbar: [{item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}, {item: 0}], Shops: {
		cleric        : {
			name   : 'The Cleric', contents: {
				potions        : [
					{name: 'Healing Potion', duration: 'instant', effect: ['Healing'], strength: [1, 2, 3]},
					{name: 'Resistance Potion', duration: 0.25, effect: ['Resistance'], strength: [1]},
					{name: 'Speed Potion', duration: 0.5, effect: ['Speed'], strength: [1, 2, 3]},
					{name: 'Strength Potion', duration: 0.75, effect: ['Strength'], strength: [1, 2]}
				], special_food: [
					{name: 'Enchanted Golden Apple', hunger: 8, confoundingEffect: ['Healing', 'Resistance', 'Vision']},
					{name: 'Golden Apple', hunger: 6, confoundingEffect: ['Resistance']},
					{name: 'Golden Carrot', hunger: 4, confoundingEffect: ['Vision']}
				], tables      : ['EnchantingTable']
			}, icon: 'Shops/Cleric.png'
		}, weaponsmith: {
			name    : 'The Weaponsmith', contents: [
				{
					Axe: {Precision: 1.3, Strength: 1.7, Speed: 0.7}, Pickaxe: {Precision: 3.0, Strength: 2.2, Speed: 0.7}, Sword: {Precision: 0.3, Speed: 1.0, Strength: 0.7}
				}, {SmithingTable: !1}
			], model: 'Shops/cleric.png'
		}, armorer    : {
			name   : 'The Armorer', content: {
				armor: ['Leather', 'Chain', 'Iron', 'Gold', 'Diamond', 'Netherite'], tables: ['SmithingTable', 'Anvil']
			}, icon: 'Shops/armorer.png'
		}, farmer     : {
			name   : 'The Farmer', content: {
				food     : [
					{name: 'Apple', hunger: 2, confoundingEffect: !1},
					{name: 'Baked Potato', hunger: 6, confoundingEffect: !1},
					{name: 'Cake', hunger: 16, confoundingEffect: !1},
					{name: 'Carrot', hunger: 4, confoundingEffect: !1},
					{name: 'Cooked Chicken', hunger: 10, confoundingEffect: !1},
					{name: 'Cooked Steak', hunger: 8, confoundingEffect: !1}
				], tables: ['Smoker', 'Campfire']
			}, icon: 'Shops/farmer.png'
		}, mason      : {
			name   : 'The Mason', content: {
				materials: [
					{Base: 'Brick', Stock: 256, Health: 9}, {Base: 'Stone', Stock: 256, Health: 6}, {Base: 'Wood', Stock: 256, Health: 3}
				], tables: ['stonecutter']
			}, icon: 'Shops/mason.png'
		}, stations   : {
			anvil          : {acquired: !1, damage: 0},
			campfire       : {acquired: !1, fuel: 0},
			enchantingTable: {acquired: !1, lapis: 0, level: 1},
			furnace        : {acquired: !1, fuel: 0, modules: {upgraded: !1, blast: !1, smoke: !1}},
			grindstone     : {acquired: !1, modules: {recycle: !1}},
			smithingTable  : {acquired: !1},
			stonecutter    : {acquired: !1, level: 0}
		}, classist   : {
			playerClass: 'unclassified', // Can be ['? (unknown)','Engineer (Idle)','Bowman (Range)','Mage (Magic)','Brute' (Melee)]
			brute      : !1, engineer: !1, fletcher: !1, illusioner: !1, unset: !1
		}
	}
};

// Draw //
function Draw_All(move) {
	Draw_Background();
	Draw_Villager();

	Draw_Gui(level>0 && level<8);

	if (move) {
		Pos.X = Math.random() * (BoardElem.clientWidth - VillagerWidth);
		Pos.Y = Math.random() * (BoardElem.clientHeight - VillagerHeight);
	}
}

function Draw_Background() {
	BoardElem.style.backgroundSize = '100% 100%';
	BoardElem.style.backgroundImage = `url(${GameLevels[level].background})`;
}

function Draw_Villager() {
	VillagerHealth = GameLevels[level].health / GameLevels[level].phases;

	VillagerWidth = parseInt(GameLevels[level].size), VillagerHeight = VillagerWidth * 1.25;

	Villager.style.backgroundImage = `url(${GameLevels[level].head})`;
	Villager.style.width = VillagerWidth, Villager.style.height = VillagerHeight;
	Villager.style.left = `${Pos.X}px`, Villager.style.top = `${Pos.Y}px`;
}

function Display_Main_Menu() {
	TitleCard.style.display = 'block';
	MainMenu.style.display = 'flex';
	BoardElem.style.backgroundImage = 'url(Backgrounds/MainMenu.png)';
}

function Hide_Main_Menu() {
	TitleCard.style.display = 'none';
	MainMenu.style.display = 'none';
}

function Draw_Gui(show_stats) {
	LevelElem.textContent = `Level ${level} - ${GameLevels[level].name}`;

	if (show_stats) {
		for (let D = 10; D>=1; D--) {
			Heart[`health${D}`].status = 10 - PlayerDamage<D ? (10 - PlayerDamage===D - 0.5 ? 'half' : 'empty') : 'full';
			Heart[`health${D}`].src = 10 - PlayerDamage<D ? (10 - PlayerDamage===D - 0.5 ? 'Stats/HalfHeart.png' : 'Stats/Empty.png') : 'Stats/FullHeart.png';
		}
		Bossbar.value = VillagerHealth - Points;
		Bossbar.max = VillagerHealth;
	} else {
		Bossbar.style.display = 'none';
		HotbarElem.style.display = 'none';
		LevelElem.style.display = 'none';
		document.querySelector('#Shop_Button').style.display = 'none';
		document.querySelector('#Heart_Bar').style.display = 'none';
		level===9 && Display_Main_Menu();
	}
}

// Functions //

function Villager_Death_Check() {
	level++;

	Favicon.href = GameLevels[level].head;
	Title.textContent = `${GameLevels[level].name} - Villager Clicker`;
	Villager.style.backgroundImage = `url(${GameLevels[level].head})`;

	Points = 0;
	Speed_X *= 0.75;
	Speed_Y *= 0.75;

	new Audio('Audio/Villager_Death.mp3').play();
	Draw_All(true);
}

async function Villager_Hurt() {
	new Audio('Audio/Villager_Hurt.mp3').play();

	Speed_X = -Speed_Y, Speed_Y = -Speed_X;
	Speed_X>0 ? Speed_X += 50 : Speed_X -= 50, Speed_Y>0 ? Speed_Y += 50 : Speed_Y -= 50;

	for (let I = 0; I<=35; I++) {requestAnimationFrame(()=>{if (Math.random()<0.5) Villager.style.rotate = `${I}deg`; else Villager.style.rotate = `-${I}deg`;})}

	Villager.style.filter = `blur(${(Math.PI / Speed_X)}px)`;
	Villager.style.transition = '0.1s ease-out';
	setTimeout(()=>{
		Villager.style.filter = '';
		Villager.style.transition = '';
		for (let I = 35; I>=0; I--) requestAnimationFrame(()=>Villager.style.rotate = `${I}deg`)
	}, 175);
	Points>=VillagerHealth && Villager_Death_Check();
}

async function Player_Attack() {
	Points += 0.5;

	await Villager_Hurt(), Draw_All(true);
}

function Villager_Attack() {
	if (level>0 && level<8) {
		console.log("e");
		return;
	} else new Audio('Audio/Player_Hurt.mp3').play(), PlayerDamage += 0.5, Draw_Gui();

	if (level>0 && level<8 && PlayerDamage>=20) {
		//TODO if (()=>Hotbar.forEach(item=>item.type==='Totem')) {PlayerDamage *= 0.25}
		level = 0;

		HotbarElem.transition = '1s linear';
		HotbarElem.scaleY = 0;
		Draw_All();
		cancelAnimationFrame(Interval);
	}
}

function Hotbar_Click(int_slot) {
	const Slot = int_slot.id.slice(4), Item = PlayerData.Hotbar[Slot];
	Item.type && new Handle_Item(Slot, Item);
}

function Handle_Item(id) {
	let Slot = id.id.split('item')[1].trim();
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

//for (let s = 0; s<Shops.length; s++) Shops.Children[s].innerHTML = PlayerData.Shops[i];

//const AttackData = (aoa, damage, attackSpeed, name, image, aria)=>{let AttackData = {aoa, damage, attackSpeed, name, image, aria}};


function Time_Pos_Calc(timestamp) {
	let Delta = {
		X: Pos.X + Speed_X * ((LastTime - timestamp) / 500), Y: Pos.Y + Speed_Y * ((LastTime - timestamp) / 500)
	};

	Delta.X>=clientWidth - VillagerWidth && (Delta.X = clientWidth - VillagerWidth, Speed_X *= -1);
	Delta.Y>=clientHeight - VillagerHeight && (Delta.Y = clientHeight - VillagerHeight, Speed_Y *= -1);
	Delta.X<0 && (Delta.X = 0, Speed_X = -Speed_X);
	Delta.Y<0 && (Delta.Y = 0, Speed_Y = -Speed_Y);

	Pos.X = Delta.X, Pos.Y = Delta.Y;
}

// Menu Buttons //
function Initiate() {
	Interval = requestAnimationFrame(Update);

	()=>{
		HotbarElem.style.display = 'flex';
		document.querySelector("#Shop_Button").display = 'block';
		document.querySelector("#Heart_Bar").display = 'flex';
	}
}

// Begin //
Display_Main_Menu();


// While //

// cursor state switch
if (CursorState==='Crosshair') {} else {}