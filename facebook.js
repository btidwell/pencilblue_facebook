module.exports = function FacebookPluginModule(pb) {
  function Facebook(){}

  /**
   * Called when the application is being installed for the first time.
   *
   * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
   * The result should be TRUE on success and FALSE on failure
   */
  Facebook.onInstall = function(cb) {
    pb.log.info("Facebook Plugin Installed");
    cb(null, true);
  };

  /**
   * Called when the application is uninstalling this plugin.  The plugin should
   * make every effort to clean up any plugin-specific DB items or any in function
   * overrides it makes.
   *
   * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
   * The result should be TRUE on success and FALSE on failure
   */
  Facebook.onUninstall = function(cb) {
    pb.log.info("Facebook Job Plugin Uninstalled");
    cb(null, true);
  };

  /**
   * Called when the application is starting up. The function is also called at
   * the end of a successful install. It is guaranteed that all core PB services
   * will be available including access to the core DB.
   *
   * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
   * The result should be TRUE on success and FALSE on failure
   */
  Facebook.onStartup = function(cb) {
    cb(null, true);
  };

  /**
   * Called when the application is gracefully shutting down.  No guarantees are
   * provided for how much time will be provided the plugin to shut down.
   *
   * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
   * The result should be TRUE on success and FALSE on failure
   */
  Facebook.onShutdown = function(cb) {
    cb(null, true);
  };

  return Facebook;
};
