export type Mod = {
	name: string;
	jarName: string;
	version: string;
	loader: string;
	status: 'compatible' | 'conflict' | 'warning';
};

export type AvailableVersion = {
	loader: string;
	version: string;
	jarName: string;
	isCompatible: boolean;
};

export type PageId = 'dashboard' | 'mods' | 'worlds' | 'screenshots';
