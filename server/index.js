const express = require('express');
const { json } = require('express')
const expressStaticGzip = require('express-static-gzip')

const app = express();
const path = require('path')
app.use(express.static(`${__dirname}/../build`))
app.use(`/build/client`, expressStaticGzip(`/build/client`, {
  enableBrotli: true,
  customCompressions: [{
    encodingName: 'deflate',
    fileExtension: 'zz'
  }],
  orderPreference: ['br', 'gz']
}));
app.use(json())

const port = 4005
app.listen(port, console.log('The server is running on port', port))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
