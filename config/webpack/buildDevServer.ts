import type { Configuration } from "webpack-dev-server";

import type { WebpackConfig } from "./types";

export const buildDevServer = (port: WebpackConfig["port"]): Configuration => {
	return {
		port,
		open: true,
		hot: true,
		historyApiFallback: true,
	};
};
