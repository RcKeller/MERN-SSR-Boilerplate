import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Button } from 'react-md'

@connect(
  state => ({ user: state.db.user })
)
class Model extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  }
  static defaultProps = {
    user: {}
  }
  render ({ model } = this.props) {
    return (
      <Button flat secondary iconChildren='input'
        href='/auth/google'
      >
        Log In
      </Button>
    )
  }
}

export default Model
