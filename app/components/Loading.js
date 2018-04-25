import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardTitle, CardText, CircularProgress } from 'react-md'

class Loading extends React.Component {
  static propTypes = {
    // Render goes through a truthiness check
    render: PropTypes.any.isRequired,
    // Component title and loading promp
    title: PropTypes.string,
    tip: PropTypes.string,
    // Alert type (change to error or info to change UI severity)
    type: PropTypes.string,
    // Timeout Interval
    timeout: PropTypes.number
  }
  static defaultProps = {
    render: false,
    tip: 'Loading...',
    title: 'this component',
    type: 'warning',
    timeout: 5000
  }
  state = { error: '', info: '' }
  componentDidMount () {
    setTimeout(this.requestTimedOut, this.props.timeout)
  }
  requestTimedOut = () => {
    const { render } = this.props
    if (!render) {
      // throw new Error('We were unable to find data on the server.')
      this.setState({ error: true, info: 'We were unable to find data on the server.' })
    }
  }
  componentDidCatch (error, info) {
    this.setState({ error, info })
  }
  render (
    { children, render, title, tip, type } = this.props,
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
    } else if (!render) {
      return (
        <CircularProgress />
      )
    }
    return children
  }
}

export default Loading
