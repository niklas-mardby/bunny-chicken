import EggCanvas from "../../components/EggCanvas/EggCanvas";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import "./DesignerPage.scss";
import TabbedControlPanel from "../../components/TabbedControlPanel/TabbedControlPanel";

const DesignerPage = () => {
	return (
		<div className="designer-page">
			<header className="designer-page__header">
				<h1 className="designer-page__title">Påskäggs-designern</h1>
				<p className="designer-page__subtitle">
					Designa ditt eget påskägg och dela med vänner
				</p>
			</header>

			<div className="designer-page__content">
				<div className="designer-page__canvas-container">
					<ErrorBoundary
						fallback={
							<div className="designer-page__error">
								<h3>Det gick inte att visa påskägget</h3>
								<p>Försök ladda om sidan eller återställ designen.</p>
							</div>
						}
					>
						<EggCanvas />
					</ErrorBoundary>
				</div>

				<div className="designer-page__controls-container">
					<ErrorBoundary
						fallback={
							<div className="designer-page__error">
								<h3>Kontrollpanelen kunde inte laddas</h3>
								<p>Försök ladda om sidan.</p>
							</div>
						}
					>
						<TabbedControlPanel />
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
};

export default DesignerPage;
