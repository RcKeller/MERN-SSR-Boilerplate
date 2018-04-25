import mongoose from 'mongoose'

import { dummies } from './models'

export default function (config) {
  const { seeds } = config
  const min = Number.isInteger(seeds) ? seeds : 5 // default
  console.log(`SEED: Lorem Ipsum Mode enabled. Seeding up to ${min} documents each...`)
  //  Generate an object containing ObjectIds for dummy objects.
  const ids = {
    user: [],
    building: [],
    room: [],
    reservation: []
  }
  for (let key of Object.keys(ids)) {
    for (let i = 0; i < min; i++) {
      ids[key].push(new mongoose.Types.ObjectId())
    }
  }
  const developer = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Ryan Keller',
    username: 'rykeller',
    email: 'rykeller@uw.edu'
  }
  //  Create dummies for all RESTful models
  dummies.map((model) => model(min, ids, developer))
}
