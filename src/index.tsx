import { createRoot } from "react-dom/client";
import { App } from "./App";

import "./index.scss";

const root = document.getElementById("root");

if (!root) {
	throw new Error("root not found");
}

// Render your React component instead
const app = createRoot(root);
app.render(<App />);