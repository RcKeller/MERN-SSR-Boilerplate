import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardTitle, CardText } from 'react-md'

class Loading extends React.Component {
  static propTypes = { title: PropTypes.string }
  static defaultProps = { title: 'this component' }
  state = { error: '', info: '' }
  componentDidCatch (error, info) {
    this.setState({ error, info })
  }
  render (
    { children, title } = this.props,
    { error, info } = this.state
  ) {
    if (error) {
      return (
        <Card className='md-block-centered'>
          <CardTitle
            title={`Loading ${title} has failed`}
            subtitle='Try refreshing the page by pressing F5.'
          />
          <CardText>
            <p>Error Thrown:</p>
            <pre>
              <code>
                {`{ 'ERROR AT ${window && window.location && window.location.href}': ${JSON.stringify(info)} }`}
              </code>
            </pre>
          </CardText>
        </Card>
      )
    }
    return children
  }
}

export default Loading
