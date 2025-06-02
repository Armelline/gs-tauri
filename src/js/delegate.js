// Delegate functions are called from the GameSalad Engine during certain lifecycle events.
// There are also functions that allow you to update attribute value.

// To learn more about available delegate and update functions, look here:
// https://help.gamesalad.com/knowledge-base/does-the-html5-engine-have-any-apis-i-can-interact-with/
window.gsInitDelegates = function (engine) {
  var loadingElement = document.getElementById('gse-loading');
  return {
    onLoadingBegin: function() {
      engine.showOverlay();
      loadingElement.style.visibility = 'visible';
    },

    onLoadingEnd: function() {
      loadingElement.style.visibility = 'hidden';
      engine.hideOverlay();
    },

    onWindowResize: function() {
      engine.relayout();
    },
    
	onTweetSheet: async function (message, image) {

            const { invoke } = window.__TAURI__.tauri;

            if (message === "EndGame") {
                 invoke("exit_app");
          }

         if (message === "WindowChange") {

           const { appWindow } = window.__TAURI__.window;

           try {
             const isFullscreen = await appWindow.isFullscreen();
             await appWindow.setFullscreen(!isFullscreen);

             //  Trigger GameSalad relayout manually after fullscreen change
             window.dispatchEvent(new Event("resize"));

           } catch (err) {
             console.error("Error toggling window mode:", err);
           }
         }
       }
  }
}