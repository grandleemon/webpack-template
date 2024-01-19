import React, { useState } from "react";

export const App = () => {
	const [counter, setCounter] = useState(0);
	return (
		<div>
			{counter}
			<button onClick={() => setCounter(prev => prev + 1)}>INC</button>
		</div>
	);
};