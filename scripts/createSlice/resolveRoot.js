const path = require('path');

module.exports = (...segmetns) => path.resolve(__dirname, '..', '..', ...segmetns);
