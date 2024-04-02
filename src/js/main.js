const { convertFileSrc } = window.__TAURI__.tauri;
const { resolveResource } = window.__TAURI__.path;

(function(global) {
	global.onEngineLoad = function() {
		gse.ready(async function(engine) {
			// Defined in js/delegate.js
			var playerDelegate = gsInitDelegates(engine)
			engine.appendDelegate(playerDelegate);
			window.addEventListener('resize', playerDelegate.onWindowResize, false);

			// viewport-fit = none | center | fill | letterbox | overscan
			engine.setRenderFrame('gse-player');
			engine.setOptions({
				'viewport-reference': 'window',
				'viewport-fit': 'letterbox'
			});
			engine.loadOptionsFromURL();
			
			const resourcePath = (await resolveResource('resources/game/default')).replaceAll('\\', '/');
			const assetUrl = convertFileSrc(resourcePath)
			engine.play(assetUrl);
		});
	};

}(window));

window.addEventListener("DOMContentLoaded", () => {
  window.onEngineLoad()
});
