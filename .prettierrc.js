const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
  "trailingComma": "es5",
  "semi": true,
  "singleQuote": true,
  "arrowParens": "always",
  "proseWrap": "always"
};
