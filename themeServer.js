const fs = require('fs')
const os = require('os')
const express = require('express')
const bodyParser = require('body-parser')

const ifaces = os.networkInterfaces()
const PORT = 8090
const THEME_PATH = './src/theme/variables'
const IMAGE_PATH = './src/assets/images'
const INCLUDED_FORMATS = ['.gif', '.png', '.jpeg', '.svg']
const envFile = './env.json'
let address = ''
let envJSON = { THEME_SERVER: {} }

process.env.THEME_PATH = THEME_PATH
process.env.IMAGE_PATH = IMAGE_PATH

try {
  envJSON = JSON.parse(fs.readFileSync(envFile, 'utf8'))
} catch (e) {
  console.log(e)
}

try {
  // Get Local Host Address
  Object.keys(ifaces).forEach(function (ifname) {
    for (const iface of ifaces[ifname]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        address = iface.address
        break
      }
    }
  })

  // Set env.json with correct path
  envJSON.THEME_SERVER = {
    host: `http://${address}`,
    port: `${PORT}`,
    themePath: `${THEME_PATH}`,
    imagePathStart: `${IMAGE_PATH}`,
    includedImageFormats: INCLUDED_FORMATS
  }
  fs.writeFileSync(envFile, JSON.stringify(envJSON, null, 2))
} catch (e) {
  console.log(e)
}

const findImagePaths = (
  startPath,
  includedFormats = ['.gif', '.png', '.jpeg', '.svg'],
  result = {}
) => {
  if (!fs.existsSync(startPath)) return result
  const filesDir = fs.readdirSync(startPath)
  for (const file of filesDir) {
    const filePath = startPath + '/' + file
    if (!file.includes('.')) {
      findImagePaths(filePath, includedFormats, result)
      continue
    }
    const fileExtensionIndex = file.indexOf('.')
    console.log(fileExtensionIndex)
    const fileExtension = file.slice(fileExtensionIndex)
    console.log(fileExtension)
    if (includedFormats.includes(fileExtension)) {
      const fileName = file.slice(0, fileExtensionIndex) + 'Image'
      result[fileName] = filePath
    }
  }
  return result
}

// Run the theme server
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/getThemeNames', function (req, res) {
  const directoryPath = process.env.THEME_PATH
  try {
    const fileNames = fs.readdirSync(directoryPath)
    res.json(fileNames)
  } catch (e) {
    console.log(e)
  }
})

app.get('/getTheme/', function (req, res) {
  const fileName = req.query.theme
  const directoryPath = `${process.env.THEME_PATH}/${fileName}`
  try {
    const theme = fs.readFileSync(directoryPath, 'utf8')
    const parsedTheme = JSON.parse(theme)
    res.json(parsedTheme)
  } catch (e) {
    console.log(e)
  }
})

app.get('/getImagePaths', function (req, res) {
  const imagePathStart = process.env.IMAGE_PATH
  const includedFormats = INCLUDED_FORMATS
  console.log(includedFormats)
  try {
    const imagePaths = findImagePaths(imagePathStart, includedFormats)
    res.json(imagePaths)
  } catch (e) {
    console.log(e)
  }
})

app.listen(PORT)
