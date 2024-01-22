import type { Configuration } from "webpack";
import type { WebpackConfig } from "./types";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";
import TerserPlugin from "terser-webpack-plugin";

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
