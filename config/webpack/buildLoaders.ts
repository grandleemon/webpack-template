import MiniCssExtractPlugin from "mini-css-extract-plugin";
import type { ModuleOptions } from "webpack";

import type { WebpackConfig } from "./types";

export const buildLoaders = ({
	isDev,
}: WebpackConfig): ModuleOptions["rules"] => {
	const swcLoader = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: "swc-loader",
				options: {
					jsc: {
						transform: {
							react: {
								runtime: "automatic",
								development: isDev,
								refresh: isDev,
							},
						},
					},
				},
			},
		],
	};

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			"css-loader",
			"sass-loader",
		],
		exclude: /node_modules/,
	};

	return [swcLoader, sassLoader];
};
