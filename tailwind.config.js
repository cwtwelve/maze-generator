/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		colors: {
			color1: "#000000",
			color2: "#e06711"
		}
	},
	daisyui: {
		themes: ["luxury"]
	},
	plugins: [require("daisyui")]
};
