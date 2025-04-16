import { Outlet } from "react-router-dom";
import "./App.scss";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { EggDesignProvider } from "./context/EggDesignContext";

const App = () => {
	return (
		<div className="app">
			<ErrorBoundary>
				<EggDesignProvider>
					<main className="app__main">
						<Outlet />
					</main>
					<footer className="app__footer">
						<p className="app__footer-text">
							Glad Påsk! 🐣 Designa och dela ditt eget påskägg. ©{" "}
							{new Date().getFullYear()}{" "}
							<a
								href="https://www.linkedin.com/in/mardby/"
								target="_blank"
								rel="noopener"
							>
								Niklas Mårdby
							</a>
						</p>
					</footer>
				</EggDesignProvider>
			</ErrorBoundary>
		</div>
	);
};

export default App;
