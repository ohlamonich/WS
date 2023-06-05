//here
import { sveltekit } from '@sveltejs/kit/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { plugin as MdPlugin } from 'vite-plugin-markdown';
import { config as envConfig } from 'dotenv';

envConfig();
const { VITE_APP_TITLE, VITE_DESCRIPTION, VITE_HOST } = process.env;
const iconSize = [72, 96, 128, 144, 152, 192, 256, 384, 512];
const icons = iconSize.map((size) => {
	const iconObj = {
		src: `./icons/icon-${size}x${size}.png`,
		sizes: `${size}x${size}`,
		type: 'image/png'
	};
	if (size === 192) iconObj.purpose = 'maskable';
	if (size === 384) iconObj.purpose = 'any';
	return iconObj;
});

const screenshots = [
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561929-52a32a57-bd2c-473c-b25d-dcd8877ce253.jpg',
		label: 'Section 1',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561938-c8429695-d7fe-4cf2-8391-d3e78daa789c.jpg',
		label: 'Section 2',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561909-2f965a06-6cdb-45a3-92c9-646546d514f8.jpg',
		label: 'Section 3',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561919-b76b11e2-dbda-4534-845e-48714f60fc40.jpg',
		label: 'Section 4',
		type: 'image/jpg'
	}
];

const manifest = {
	orientation: 'landscape',
	name: VITE_APP_TITLE,
	short_name: 'WishSimulator.App',
	theme_color: '#ffffff',
	background_color: '#ffffff',
	display: 'fullscreen',
	scope: '/',
	start_url: '/?pwasc=homescreen',
	categories: ['games', 'utilities'],
	description: VITE_DESCRIPTION,
	dir: 'auto',
	icons,
	screenshots,
	prefer_related_applications: true,
	related_applications: [
		{
			platform: 'webapp',
			url: `${VITE_HOST}/appmanifest.json`
		},
		{
			platform: 'play',
			url: 'https://play.google.com/store/apps/details?id=twa.wishsimulator.app',
			id: 'twa.wishsimulator.app'
		}
	]
};

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		MdPlugin({ mode: 'html' }),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			outDir: '.vercel/output/static',
			filename: 'sw.js',
			registerType: 'prompt',
			manifestFilename: 'appmanifest.json',
			manifest
		})
	],
	build: {
		chunkSizeWarningLimit: 350,
		target: ['es2020']
	}
};

export default config;
