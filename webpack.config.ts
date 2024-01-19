import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

type Mode = "development" | "production";

interface EnvBuild {
	mode: Mode;
}

export default (env: EnvBuild) => {
	const isDev = env.mode === "development";

	const config: webpack.Configuration = {
		mode: isDev ? "development" : "production",
		entry: path.resolve(__dirname, "src", "index.ts"),
		devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "bundle.[contenthash].js",
			clean: true,
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