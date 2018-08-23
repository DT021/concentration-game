const path = require('path');

module.exports = {
  //debug: true,
  modifyJestConfig: baseConfig => {
    const jestConfig = Object.assign({}, baseConfig);
    jestConfig.setupTestFrameworkScriptFile = path.resolve(__dirname, 'test.config.js');
    return jestConfig
  },
};
