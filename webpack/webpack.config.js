let config = null;

if (process.env.NODE_ENV === 'development' ) {
  config = require('./webpack.config.dev');
} else {
  config = require('./webpack.config.prod');
}

module.exports = config;
