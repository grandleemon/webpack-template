import "./index.scss";

import { createRoot } from "react-dom/client";

import { App } from "./App";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

// Render your React component instead
const app = createRoot(root);
app.render(<App />);
