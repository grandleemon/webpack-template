type Mode = "development" | "production";

export interface EnvBuild {
	mode: Mode;
	port: number;
}

interface BuildPaths {
	entry: string;
	output: string;
	html: string;
}

export interface WebpackConfig extends EnvBuild {
	isDev: boolean;
	isProd: boolean;
	paths: BuildPaths;
}

