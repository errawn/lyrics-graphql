import React, { Component } from 'react'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricCreate extends Component {
	constructor(props) {
		super(props)

		this.state = { content: '', loading: false }
	}

	onSubmit(e) {
		e.preventDefault()

		this.setState({ loading: true })

		this.props.mutate({
			variables: { 
				content: this.state.content,
				songId: this.props.songId
			}
		}).then(() => this.setState({ loading: false, content: '' }))
	}


	render() {
		return (
			<form onSubmit={this.onSubmit.bind(this)}>
				<label>Lyric: </label>
				<input 
					type="text" 
					onChange={(e) => this.setState({ content: e.target.value })}
					value={this.state.content}
				/>
				{ this.state.loading ? 'loading...' : '' }
			</form>
		)
	}
}

const mutation = gql`
	mutation AddLyricToSong($songId: ID, $content: String) {
	  addLyricToSong(songId: $songId, content: $content) {
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
