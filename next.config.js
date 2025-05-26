// next.config.js
const path = require('path')
const { NextFederationPlugin } = require('@module-federation/nextjs-mf')

module.exports = {
  // すでに書かれている他の設定…  

  webpack(config, options) {
    // @ alias を chatbot-host/src などに向けるなら適宜調整
    config.resolve.alias['@'] = path.resolve(__dirname)

    config.plugins.push(
      new NextFederationPlugin({
        name: 'chatbot',                // ホストアプリの名前
        filename: 'static/chunks/hostEntry.js',
        remotes: {
          makepdf_remort: options.isServer
            ? 'makepdf_remort@https://makepdf-remort.vercel.app/_next/static/ssr/remoteEntry.js'
            : 'makepdf_remort@https://makepdf-remort.vercel.app/_next/static/chunks/remoteEntry.js',
        },
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    )

    return config
  },
}
