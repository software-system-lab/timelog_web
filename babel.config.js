// babel.config.js
// module.exports = {
//     presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
//   };

module.exports = {
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ],
};