import { makeConfig } from 'cleaner-config'
import { asNumber, asObject, asOptional, asString } from 'cleaners'

const {
  BUCKET = 'theme.edge',
  COUCH_HOSTNAME = '127.0.0.1',
  COUCH_PORT = '8008',
  AWS_ENDPOINT = 'sfo3.digitaloceanspaces.com',
  ACL_SECURITY_LEVEL = 'private'
} = process.env

export const asConfig = asObject({
  bucketDO: asOptional(asString, BUCKET),
  httpHost: asOptional(asString, COUCH_HOSTNAME),
  httpPort: asOptional(asNumber, parseInt(COUCH_PORT)),
  awsEndpoint: asOptional(asString, AWS_ENDPOINT),
  aclSecurity: asOptional(asString, ACL_SECURITY_LEVEL)
})

export const config = makeConfig(asConfig)
