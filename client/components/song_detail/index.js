import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import LyricCreate from '../lyric_create'

import LyricList from '../lyric_list'
import fetchSong from '../graphql/queries/fetch_song'

class SongDetail extends Component {
  render() {
    const { song } = this.props.data

    if (!song) return <div className="loading">Loading...</div>

    return (
      <div>
        <Link to="/">Song List</Link>

        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={song.id} />
      </div>
    )
  }
}

export default graphql(fetchSong, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id,
      },
    }
  },
})(SongDetail)
