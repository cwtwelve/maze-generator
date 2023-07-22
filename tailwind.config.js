/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}"
	],
	daisyui: {
		themes: ["dracula"]
	},
	plugins: [require("daisyui")]
};
