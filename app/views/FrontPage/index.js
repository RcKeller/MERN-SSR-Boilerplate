import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

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
        <h1>MERN SSR Boilerplate</h1>
        <h6>Developer: Ryan Keller</h6>
        <section>
          <h3>User Data:</h3>
          <code>{JSON.stringify(user)}</code>
        </section>
        <section>
          <h3>Database Client-Side Cache:</h3>
          <code>{JSON.stringify(db)}</code>
        </section>
        <section>
          <h3>Server-Loaded Config:</h3>
          <code>{JSON.stringify(settings)}</code>
        </section>
      </article>
    )
  }
}

export default FrontPage
