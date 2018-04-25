import session from 'express-session'
import connectMongo from 'connect-mongo'

import { db } from '../../config/'

const MongoStore = connectMongo(session)
export default () => new MongoStore({ db, autoReconnect: true })
