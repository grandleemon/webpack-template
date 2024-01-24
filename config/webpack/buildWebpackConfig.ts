import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";

import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import type { WebpackConfig } from "./types";

export const buildWebpackConfig = (config: WebpackConfig): Configuration => {
	const { isDev, port, paths } = config;

	return {
		mode: isDev ? "development" : "production",
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: "bundle.[contenthash].js",
			clean: true,
		},
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		devServer: buildDevServer(port),
		plugins: buildPlugins(config),
		module: {
			rules: buildLoaders(config),
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					minify: TerserPlugin.swcMinify,
				}),
			],
		},
	};
};
