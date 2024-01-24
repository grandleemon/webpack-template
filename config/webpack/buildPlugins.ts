import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration, ProgressPlugin } from "webpack";

import type { WebpackConfig } from "./types";

export const buildPlugins = ({
	paths,
	isDev,
	isProd,
}: WebpackConfig): Configuration["plugins"] => {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
		new ForkTsCheckerWebpackPlugin(),
	];

	if (isDev) {
		plugins.push(new ProgressPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	if (isProd) {
		plugins.push(new MiniCssExtractPlugin());
	}

	return plugins;
};
