(gs.PathResolver = function (t) {
  return (
    (this.allowCaching = !0),
    (this.prefix = t),
    !1 === /[/]$/.test(this.prefix) && (this.prefix += "%2F"),
    this
  );
}),
  (gs.PathResolver.prototype = {
    getPath: function (t) {
      var sep = encodeURIComponent(window.__TAURI__.path.sep);
      var pprefix = this.prefix.replace("%2F", sep);
      var pp = t.replaceAll(/\/|\\/g, sep);
      var e = pprefix + pp;
      return (
        this.allowCaching || (e += "?" + Math.random().toString().substring(2)),
        e
      );
    },
    getDataPath: function (t) {
      return this.getPath(t + ".json");
    },
    getObjectPath: function () {
      return this.getDataPath("object");
    },
    getAssetsPath: function () {
      return this.getDataPath("assets");
    },
    getScenePathByIndex: function (t) {
      var e = t.toString();
      return this.getScenePathByName(e);
    },
    getScenePathByOffset: function (t) {
      return this.getScenePathByIndex(t + 1);
    },
    getScenePathByName: function (t) {
      return this.getDataPath("scenes/" + t);
    },
    getSceneScreenshotPathByID: function (t) {
      return this.getPath("screenshots/" + t + ".png");
    },
    getImagePath: function (t) {
      return this.getPath("images/" + t);
    },
    getSoundPath: function (t) {
      return this.getPath("sounds/" + t);
    },
    getFontPath: function (t) {
      return this.getPath("fonts/" + t);
    },
    getTablePath: function (t) {
      return this.getDataPath("tables/" + t);
    },
  });
