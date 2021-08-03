import { makeConfig } from 'cleaner-config'
import { asNumber, asObject, asOptional, asString } from 'cleaners'

const {
  APP_NAME = '',
  VERSION = '',
  BUCKET = '',
  COUCH_HOSTNAME = '127.0.0.1',
  COUCH_PORT = '8008',
  SPACES_KEY = '',
  SPACES_SECRET = '',
  AWS_ENDPOINT = 'sfo3.digitaloceanspaces.com',
  ACL_SECURITY_LEVEL = 'private'
} = process.env

export const asConfig = asObject({
  appName: asOptional(asString, APP_NAME),
  version: asOptional(asString, VERSION),
  bucketDO: asOptional(asString, BUCKET),
  httpHost: asOptional(asString, COUCH_HOSTNAME),
  httpPort: asOptional(asNumber, parseInt(COUCH_PORT)),
  accessKey: asOptional(asString, SPACES_KEY),
  secretKey: asOptional(asString, SPACES_SECRET),
  awsEndpoint: asOptional(asString, AWS_ENDPOINT),
  aclSecurity: asOptional(asString, ACL_SECURITY_LEVEL)
})

export const config = makeConfig(asConfig)
