import React from 'react'
import Helmet from 'react-helmet'

import Boundary from '../../components'

class NotFound extends React.Component {
  render () {
    return (
      <article>
        <Helmet title='404 - Not Found' />
        <Boundary title='404 Page'>
          <section>
            <p>The requested page does not exist. If you believe this is an error, e-mail the webmaster.</p>
          </section>
        </Boundary>
      </article>
    )
  }
}

export default NotFound
