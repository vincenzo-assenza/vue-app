import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],

	vite: {
		plugins: [tailwindcss()],
	},

	modules: ["@nuxtjs/i18n", "nuxt-security", "@nuxt/image"],

	i18n: {
		lazy: true,
		locales: ["it", "en", "es"],
		defaultLocale: "en",
		strategy: "prefix",
	},

	compatibilityDate: "2025-03-23",

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
		head: {
			title: "Creativa Shop",
			htmlAttrs: {
				lang: "en",
			},
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},

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