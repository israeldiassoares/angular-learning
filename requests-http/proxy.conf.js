const PROXY_CONFIG = [{
  context: ['/api'],
  target: 'http://localhost:9000',
  secure: false,
  logLevel: 'debug',
  pathRewrite: {'^/api': ''}
}]

module.exports = PROXY_CONFIG
