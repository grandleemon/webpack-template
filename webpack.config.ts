import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import type { Configuration } from "webpack-dev-server";

type Mode = "development" | "production";

interface EnvBuild {
	mode: Mode;
	port: number;
}

export default (env: EnvBuild) => {
	const isDev = env.mode === "development";

	const config: webpack.Configuration = {
		mode: isDev ? "development" : "production",
		entry: path.resolve(__dirname, "src", "index.tsx"),
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "bundle.[contenthash].js",
			clean: true,
		},
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		devServer: {
			port: env.port ?? 3000,
			open: true,
			hot: true,
			historyApiFallback: true,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, "public", "index.html"),
			}),
			new webpack.ProgressPlugin(),
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
		},
	};

	return config;
};