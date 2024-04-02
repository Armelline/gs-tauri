(function (getPath) {
  gs.PathResolver.prototype.getPath = function (t) {
    var e = this.prefix + t.replace(/\//, '%2F');
    return (
      this.allowCaching || (e += "?" + Math.random().toString().substring(2)),
      e
    );
    // getPath.apply(this, t) -- If we want to call the original for some reason.
	}
})(gs.PathResolver.prototype.getPath)
