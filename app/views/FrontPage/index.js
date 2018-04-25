import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import Boundary from '../../components'

@connect(state => ({
  user: state.user,
  db: state.db,
  settings: state.settings
}))
class FrontPage extends React.Component {
  render ({ user, db, settings } = this.props) {
    return (
      <article>
        <Helmet title='Home' />
        <Boundary title='Dashboard'>
          <section>
            <h1>MERN SSR Boilerplate</h1>
            <h6>Developer: Ryan Keller</h6>
            <div>
              <h3>User Data:</h3>
              <code>{JSON.stringify(user)}</code>
            </div>
            <div>
              <h3>Database Client-Side Cache:</h3>
              <code>{JSON.stringify(db)}</code>
            </div>
            <div>
              <h3>Server-Loaded Config:</h3>
              <code>{JSON.stringify(settings)}</code>
            </div>
          </section>
        </Boundary>
      </article>
    )
  }
}

export default FrontPage
