import sourcemaps from "rollup-plugin-sourcemaps";
import typescript from "@rollup/plugin-typescript";
import node from "@rollup/plugin-node-resolve";
import scss from "rollup-plugin-scss";
import { terser } from "rollup-plugin-terser";

export default [
	{
		input: './src/main.ts',
		output: {
			sourcemap: true,
			format: "iife",
			file: "./public/dst/main.js"
		},
		plugins: [
			node(),
			typescript(),
			sourcemaps(),
			terser(),
			scss({
				output: "./public/dst/main.css",
				outputStyle: "compressed",
			}),
		]
	}
];