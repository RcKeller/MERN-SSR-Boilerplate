import session from 'express-session'
import connectMongo from 'connect-mongo'

import { db as url } from '../../config/'

const MongoStore = connectMongo(session)
export default () => new MongoStore({ url, autoReconnect: true })
