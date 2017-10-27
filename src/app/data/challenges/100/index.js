export default {
  id: 100,
  title: '100 - Neon Light',
  html: require('./100.html'),
  css: require('./100.scss'),
  js: require('!raw-loader!./100.js')
};
