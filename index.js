const express = require('express')
const webpack = require('webpack')
const config = require('./config/webpack.dev.js')

var app = express()
var compiler = webpack(config)

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use('*', (req, res) => {
  res.end(`
<!doctype html>
<html>
<head>
  <title>Title</title>
</head>
<body>
  <div id='root'></div>
  <script src='/static/bundle.js'></script>
</body>
</html>
`)
})

app.listen(3000, 'localhost', (err) => {
  if (err) {
    console.log(err)
    return
  }

  console.log('Listening at http://localhost:3000')
})
