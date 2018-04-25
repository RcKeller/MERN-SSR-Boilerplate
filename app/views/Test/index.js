import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { Card, CardTitle, CardText } from 'react-md'

class Test extends React.Component {
  static propTypes = {
    foo: PropTypes.string
  }
  static defaultProps = {
    foo: 'bar'
  }
  render (
    { foo } = this.props
  ) {
    return (
      <article className='page'>
        <Helmet title='Test Page' />
        <section>
          <Card className='md-block-centered'>
            <CardTitle title='Test Page' subtitle='Debugging Code Splitting' />
            <CardText>
              <pre>
                <code>{JSON.stringify(this.props)}</code>
              </pre>
            </CardText>
          </Card>
        </section>
      </article>
    )
  }
}

export default Test
