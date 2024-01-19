import ReactRefreshTypeScript from "react-refresh-typescript";
import { WebpackConfig } from "./types";
import { ModuleOptions } from "webpack";

export const buildLoaders = ({ isDev }: WebpackConfig): ModuleOptions["rules"] => {
	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{
				loader: "ts-loader",
				options: {
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
					}),
				},
			},
		],
		exclude: /node_modules/,
	};

	const sassLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			"style-loader",
			"css-loader",
			"sass-loader",
		],
		exclude: /node_modules/,
	};

	return [
		tsLoader,
		sassLoader,
	];
};