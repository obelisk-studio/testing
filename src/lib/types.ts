export type Mod = {
	name: string;
	jarName: string;
	version: string;
	loader: string;
	status: 'compatible' | 'conflict' | 'warning';
};