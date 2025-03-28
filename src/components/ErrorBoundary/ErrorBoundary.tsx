import { Component, ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.scss";

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
	errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError(error: Error): State {
		// Uppdatera state så att nästa rendering visar fallback UI
		return {
			hasError: true,
			error,
			errorInfo: null,
		};
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// Du kan också logga felet till en felrapporteringstjänst
		console.error("ErrorBoundary fångade ett fel:", error, errorInfo);
		this.setState({
			errorInfo,
		});
	}

	handleReset = (): void => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	render(): ReactNode {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Standard fallback UI
			return (
				<div className="error-boundary">
					<div className="error-boundary__content">
						<h2 className="error-boundary__title">Något gick fel</h2>
						<p className="error-boundary__message">
							Det uppstod ett problem när vi försökte visa denna del av
							appen.
						</p>
						{this.state.error && (
							<details className="error-boundary__details">
								<summary>Tekniska detaljer</summary>
								<p className="error-boundary__error-message">
									{this.state.error.toString()}
								</p>
								{this.state.errorInfo && (
									<pre className="error-boundary__stack">
										{this.state.errorInfo.componentStack}
									</pre>
								)}
							</details>
						)}
						<button
							className="error-boundary__button"
							onClick={this.handleReset}
						>
							Försök igen
						</button>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
