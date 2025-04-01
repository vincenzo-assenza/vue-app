import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	modules: ["@nuxtjs/i18n", "nuxt-security", "@nuxt/image"],

	i18n: {
		baseUrl: 'https://localhost:3000',
		locales: [
			{ code: 'en', iso: 'en-US' },
			{ code: 'it', iso: 'it-IT' },
			{ code: 'es', iso: 'es-ES' }
		],
		defaultLocale: "en",
		strategy: "prefix",
	},

	compatibilityDate: "2025-03-23",

	security: {
		headers: {
			contentSecurityPolicy: {
				'img-src': ["'self'", 'data:', 'https://placehold.co'],
			},
		},
	},

	image: {
		staticFilename: 'public/media', // Permetti a NuxtImg di servire immagini da public/
	}
});