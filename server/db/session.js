import session from 'express-session'
import connectMongo from 'connect-mongo'

import config from '../../config/'
const { db } = config[process.env.NODE_ENV]

const MongoStore = connectMongo(session)
export default () => new MongoStore({ url: db, autoReconnect: true })
