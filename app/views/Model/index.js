import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'
import API from '../../services'

import { Card, CardTitle, CardText } from 'react-md'

@compose(
  connect(state => ({ model: state.db.model })),
  connectRequest((props) => API.get('model', { id: props.params.id }))
)
class Model extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }
  static defaultProps = {
    model: {}
  }
  render ({ model } = this.props) {
    return (
      <article>
        <Helmet title={`Model ${model._id || 'Loading...'}`} />
        <Card className='md-block-centered'>
          <CardTitle title={`Room: ${model.name}`} subtitle={`In ${model.name}`} />
          <CardText>
            <pre>
              <code>{JSON.stringify(model)}</code>
            </pre>
          </CardText>
        </Card>
      </article>
    )
  }
}

export default Model
