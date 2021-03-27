const env = {
  /**
   * The application id to be used to connect to facebook login api.
   * @member {string}
   */
  facebookAppId: process.env.REACT_APP_FACEBOOK_APPID,

  /**
   * The list of optional features to enable.
   * Used to avoid to impact production with on-going development.
   * @member {string[]}
   */
  features: process.env.REACT_APP_FEATURES.split(",").map((x) => x.trim()),

  /**
   * An object describing which feature should have debug enabled.
   * @member {object}
   */
  debug: {
    /**
     * A value indicating whether to push to the console information about the facebook login process
     * @member {boolean}
     */
    facebook: Boolean(process.env.REACT_APP_DEBUG_FACEBOOK),

    /**
     * A value indicating whether to display text box during svg rendering as well as lines during printing
     * @member {boolean}
     */
    svg: Boolean(process.env.REACT_APP_DEBUG_SVG),

    /**
     * A value indicating whether to display a debug step available when editing a template
     * @member {boolean}
     */
    template: Boolean(process.env.REACT_APP_DEBUG_TEMPLATE),
  },
};

export default env;
