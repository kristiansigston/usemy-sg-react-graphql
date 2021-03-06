import React, { Component } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Link, hashHistory } from 'react-router'
import query from '../graphql/queries/fetch_songs'



class SongCreate extends Component {
  constructor(props) {
    super(props)

    this.state = { title: '' }
  }

  onSubmit(event) {
    event.preventDefault()

    this.props
      .mutate({
        variables: {
          title: this.state.title,
        },
        refetchQueries: [{ query }],
      })
      .then(() => {
        hashHistory.push('/')
      })
      .catch((e) => {
        console.log(e)
      })
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>

        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="">Song Title</label>
          <input
            type="text"
            onChange={(e) => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`

export default graphql(mutation)(SongCreate)
