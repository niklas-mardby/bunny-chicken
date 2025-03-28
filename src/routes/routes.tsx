import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import DesignerPage from "../pages/DesignerPage/DesignerPage";
import SharedView from "../pages/SharedView/SharedView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <DesignerPage />,
			},
			{
				path: "share/:designHash",
				element: <SharedView />,
			},
		],
	},
]);

export default router;
