/*
ENVIRONMENT CONFIG FOR CLIENT
The client side is walled off from the filesystem,
meaning it cannot parse files with 'config'. As a solution,
this JS file will provide the requisite config data.
This is actually a good thing, thus config can't be hijacked for
API keys and security files.
*/
// NOTE: Destructuring for security purposes
import { env, version, protocol, domain, auth } from '../../config/'
export { env, version, protocol, domain, auth }

export const identityProvider = Object.keys(auth)[0]

export const loginURL = auth && auth[identityProvider]
  ? auth[identityProvider].loginURL
  : '/auth/google'

export const identityType = env === 'production'
  ? 'User ID'
  : 'Mock ID'

export const uri = `${protocol}://${domain}/api/${version}`
