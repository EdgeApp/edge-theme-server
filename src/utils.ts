import AWS from 'aws-sdk'

import config from '../config.json'
import { strings } from './client/theme/strings.js'

const cookieParser = document.cookie.split(';').reduce((res, c) => {
  const [key, val] = c.trim().split('=').map(decodeURIComponent)
  const allNumbers = (str: string): boolean => /^\d+$/.test(str)
  try {
    return Object.assign(res, {
      [key]: allNumbers(val) ? val : JSON.parse(val)
    })
  } catch (e) {
    return Object.assign(res, { [key]: val })
  }
}, {})

const accessKey = cookieParser[strings.accessCookie]
const secretKey = cookieParser[strings.secretCookie]

const spacesEndpoint = new AWS.Endpoint(config.awsEndpoint)
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: accessKey,
  secretAccessKey: secretKey
})

export const checkAccessCredentials = async (
  validConnection = { valid: false }
): Promise<{ valid: boolean }> => {
  const params = {
    Bucket: config.bucketDO
  }
  await s3
    .headBucket(params, function (err) {
      if (err != null) {
        validConnection.valid = false
      }
      validConnection.valid = true
    })
    .promise()
  return validConnection
}

export const listThemes = async (keysObject = {}): Promise<{}> => {
  const params = {
    Bucket: config.bucketDO
  }
  const response = await s3.listObjectsV2(params).promise()
  if (response.Contents === undefined) return {}
  response.Contents.forEach(obj => {
    if (obj.Key === undefined) return
    keysObject[`${obj.Key}`] = obj.Key
  })
  return keysObject
}

export const downloadTheme = (file: string): void => {
  const params = {
    Bucket: config.bucketDO,
    Key: file
  }
  s3.getObject(params, function (err: AWS.AWSError | null, data) {
    console.log('Data', data)
    console.log('Data.Body', data.Body)
    if (err != null) console.log(err, err.stack)
    if (data.Body === undefined) throw new Error('Error getting data')
    else {
      const blob = new Blob([data.Body], { type: data.ContentType })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = file
      link.click()
    }
  })
}

export const uploadTheme = (): boolean => {
  const inputPath = document.getElementById('inputFile') as HTMLInputElement
  const inputFiles = inputPath.files
  let status = false
  if (inputFiles?.[0] != null) {
    const inputFile = inputFiles[0]
    const params = {
      Body: inputFile,
      Bucket: `${config.bucketDO}`,
      Key: inputFile.name,
      ACL: config.aclSecurity
    }
    try {
      const request = s3.putObject(params, function (error) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (error) {
          console.log(error)
          return false
        }
        console.log('File uploaded successfully.')
        return true
      })
      if (request.response.error === null) status = true
      else status = false
    } catch (error) {
      console.log(error)
    }
  }
  return status
}
