const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		screens: {
			xs: "370px",
			fullscreen: "1152px",
			...defaultTheme.screens,
		},
	},

	plugins: [require("@tailwindcss/typography"), require("daisyui")],

	daisyui: {
		themes: ["light", "dark"],
	},
};

module.exports = config;
