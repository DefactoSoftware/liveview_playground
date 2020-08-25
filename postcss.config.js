const path = require("path");
const md5 = require("md5");
const variables = require("./assets/js/shared-variables");

module.exports = {
  ident: "postcss",
  plugins: {
    "postcss-preset-env": {
      stage: 0
    },
    "postcss-nested": {},
    "postcss-import": {},
    "postcss-mixins": {},
    "postcss-color-function": {},
    "postcss-css-variables": {
      variables: variables.css
    },
    "postcss-custom-media": {
      importFrom: [{ customMedia: variables.media }]
    },
    "postcss-calc": {},
    "postcss-modules": {
      generateScopedName: function(name, filename, css) {
        const relativeFileName = path.relative(process.cwd(), filename);
        const directories = path.dirname(filename).split("/");
        const directory = directories.slice(-1);
        const hash = md5(relativeFileName).substring(0, 5);

        return "_" + directory + "_" + hash + "__" + name;
      }
    },
    "postcss-inline-svg": {},
    "postcss-svgo": {}
  }
};
