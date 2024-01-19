import webpack from "webpack";
import path from "path";
import { buildWebpackConfig } from "./config/webpack/buildWebpackConfig";
import type { EnvBuild } from "./config/webpack/types";

export default (env: EnvBuild) => {
	const isDev = env.mode === "development";
	const isProd = !isDev;

	const config: webpack.Configuration = buildWebpackConfig({
		isDev,
		isProd,
		mode: env.mode ?? "development",
		port: env.port ?? 3000,
		paths: {
			entry: path.resolve(__dirname, "src", "index.tsx"),
			html: path.resolve(__dirname, "public", "index.html"),
			output: path.resolve(__dirname, "build")
		},
	});

	return config;
};