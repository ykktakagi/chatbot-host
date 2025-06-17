// next.config.js
const path = require('path')

module.exports = {
  webpack(config, options) {
    config.resolve.alias['@'] = path.resolve(__dirname)
    return config
  },
}
