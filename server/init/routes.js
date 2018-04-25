import db from '../db'
const { controllers } = db

//  GENERATE ROUTES
export default (app) => {
  console.log('REST: Initializing rest API routes')
  controllers.REST.map(Model => {
    app.use(new Model().API())
  })
  console.log(`REST: API live for all ${Object.keys(controllers.REST).length} compatible models.`)
}
