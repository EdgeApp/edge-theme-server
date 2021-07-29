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
  console.log(validConnection)
  return validConnection
}
