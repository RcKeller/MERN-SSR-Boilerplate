/*
MODEL INITIALIZER
Uses require() to pass the imports around as a func.
*/
export function loadModels () {
  require('./config')
  require('./user')
  // Model is a generic scheme as a basic example
  require('./model')
}

/*
RESTful MODELS (and their dummy data generators)
For express-restify-mongoose
*/
import Config, { dummy as dummyConfigs } from './config'
import User, { dummy as dummyUsers } from './user'
import Model, { dummy as dummyModels } from './model'
const dummies = [ dummyConfigs, dummyUsers, dummyModels ]

export { dummies, Config, User, Model }
