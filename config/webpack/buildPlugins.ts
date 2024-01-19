import HtmlWebpackPlugin from "html-webpack-plugin";
import { ProgressPlugin, Configuration } from "webpack";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { WebpackConfig } from "./types";

export const buildPlugins = ({ paths, isDev }: WebpackConfig): Configuration["plugins"] => {
	const plugins: Configuration["plugins"] = [
		new HtmlWebpackPlugin({
			template: paths.html,
		}),
	];

	if (isDev) {
		plugins.push(new ProgressPlugin());
		plugins.push(new ReactRefreshWebpackPlugin());
	}

	return plugins;
};