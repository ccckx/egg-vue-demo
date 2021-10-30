const path = require('path')

module.exports = appInfo => {
  const config = exports = {};
  const userConfig = {};

  config.keys = appInfo.name + '_1634972681725_2681';

  config.middleware = [];
  
  config.static = {
    prefix: '/', 
    dir: path.join(appInfo.baseDir, 'app/web'),
    dynamic: true,
    preload: false, 
    maxAge: 0,
    buffer: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
