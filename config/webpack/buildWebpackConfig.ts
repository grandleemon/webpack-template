import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration, ProgressPlugin } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { WebpackConfig } from "./types";
import { buildDevServer } from "./buildDevServer";
import { buildPlugins } from "./buildPlugins";
import { buildLoaders } from "./buildLoaders";

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
	};
};