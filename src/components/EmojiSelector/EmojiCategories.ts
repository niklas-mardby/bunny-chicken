// Emoji categories with their emojis
export type EmojiCategory =
	| "easter"
	| "spring"
	| "love"
	| "celebration"
	| "misc";

type EmojiCategoryConfig = {
	id: EmojiCategory;
	label: string;
	emojis: string[];
};

export const EMOJI_CATEGORIES: EmojiCategoryConfig[] = [
	{
		id: "easter",
		label: "Påsk",
		emojis: [
			"🐰",
			"🐇",
			"🥕",
			"🐣",
			"🐥",
			"🐤",
			"🥚",
			"🐔",
			"🐓",
			"🧺",
			"🌿",
			"🐑",
			"🕊️",
			"🔔",
			"🕯️",
		],
	},
	{
		id: "spring",
		label: "Vår",
		emojis: [
			"🌷",
			"🌸",
			"🌼",
			"🌱",
			"🌞",
			"🌈",
			"🦋",
			"🐞",
			"🐝",
			"🌧️",
			"🌻",
			"🌺",
			"🦢",
			"🦆",
			"🍃",
			"🌳",
			"🐸",
			"🐛",
			"🪲",
			"🐱",
		],
	},
	{
		id: "love",
		label: "Kärlek",
		emojis: [
			"❤️",
			"🩷",
			"💜",
			"💚",
			"💛",
			"🧡",
			"💖",
			"💕",
			"💝",

			"🤗",
			"🥰",
			"😘",
			"😍",
			"💓",
			"💌",
			"💗",
			"💘",
			"💞",
			"💑",
			"👩‍❤️‍👩",
			"👩‍❤️‍👨",
			"💋",
			"🏳️‍🌈",
			"🏳️‍⚧️",
		],
	},
	{
		id: "celebration",
		label: "Fira",
		emojis: [
			"🥳",
			"😊",
			"🎉",
			"✨",
			"🎁",
			"🍰",
			"🍾",
			"🥂",
			"🍹",
			"🎀",
			"🎵",
			"🎂",
			"🧁",
			"🙌",
			"👏",
			"🍭",
			"🎈",
			"💐",
			"🕺",
			"💃",
		],
	},
	{
		id: "misc",
		label: "Blandat",
		emojis: ["☕", "🌍", "🦄", "☮️", "👸", "👑", "💎", "🍍", "🧸"],
	},
];
