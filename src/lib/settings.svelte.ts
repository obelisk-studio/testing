// src/lib/settings.svelte.ts
class SettingState {
	isOpen = $state(false);
	activeTheme = $state('dark');

	themes = [
		{
			id: 'dark',
			name: 'Dark',
			bg: '#0b0c16',
			sidebar: '#11131f',
			input: '#0b0c16',
			card: '#1a1d2e',
			border: '#2a3045',
			accent: '#3b82f6',
			text: '#ffffff',
			textSec: '#94a3b8'
		},
		{
			id: 'light',
			name: 'Light',
			bg: '#f3f4f6',
			sidebar: '#ffffff',
			input: '#ffffff',
			card: '#ffffff',
			border: '#e5e7eb',
			accent: '#3b82f6',
			text: '#1f2937',
			textSec: '#6b7280'
		},
		{
			id: 'oled',
			name: 'OLED',
			bg: '#000000',
			sidebar: '#000000',
			input: '#1a1a1a',
			card: '#000000',
			border: '#333333',
			accent: '#3b82f6',
			text: '#ffffff',
			textSec: '#a3a3a3'
		},
		{
			id: 'forest',
			name: 'Forest',
			bg: '#0c0e0d',
			sidebar: '#111614',
			input: '#0c0e0d',
			card: '#18201c',
			border: '#2a3b32',
			accent: '#2ea85c',
			text: '#ffffff',
			textSec: '#9ca3af'
		},
		{
			id: 'forged',
			name: 'Forged',
			bg: '#0f0b0b',
			sidebar: '#171111',
			input: '#0f0b0b',
			card: '#241a1a',
			border: '#3d2626',
			accent: '#dc2626',
			text: '#ffffff',
			textSec: '#a8a29e'
		},
		{
			id: 'community',
			name: 'Community',
			bg: '#232428',
			sidebar: '#1e1f22',
			input: '#111214',
			card: '#2b2d31',
			border: '#111214',
			accent: '#5865F2',
			text: '#dbdee1',
			textSec: '#949ba4'
		},
		{
			id: 'sakura',
			name: 'Sakura',
			bg: '#171416',
			sidebar: '#1f1b1d',
			input: '#121011',
			card: '#262124',
			border: '#3d3035',
			accent: '#f472b6',
			text: '#fff1f2',
			textSec: '#d6b4be'
		},
		{
			id: 'arctic',
			name: 'Arctic',
			bg: '#242933',
			sidebar: '#2e3440',
			input: '#1d2129',
			card: '#3b4252',
			border: '#434c5e',
			accent: '#5E81AC',
			text: '#eceff4',
			textSec: '#d8dee9'
		},
		{
			id: 'system',
			name: 'System',
			bg: '#374151',
			sidebar: '#1f2937',
			input: '#1f2937',
			card: '#374151',
			border: '#4b5563',
			accent: '#9ca3af',
			text: '#ffffff',
			textSec: '#d1d5db'
		}
	];

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}
}

export const Settings = new SettingState();
