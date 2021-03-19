import React, { Component } from 'react'
// import hashHistorry
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { content: '' }
  }

  onSubmit(event) {
    event.preventDefault()
    console.log('this.props', this.props)
    this.props
      .mutate({
        variables: {
          songId: this.props.songId,
          content: this.state.content,
        },
      })
      .then(() => {
        this.setState({ content: '' })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label htmlFor="">Add a lyric</label>
        <input
          onChange={(e) => this.setState({ content: e.target.value })}
          value={this.state.content}
          type="text"
        />
      </form>
    )
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`

export default graphql(mutation)(LyricCreate)
