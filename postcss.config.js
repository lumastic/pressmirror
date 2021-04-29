/* eslint-disable global-require */

module.exports = {
  plugins: [
    require("autoprefixer"),
    require("cssnano"),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("postcss-initial")({
      reset: "inherited"
    })
  ]
};
