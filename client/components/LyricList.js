import React, { Component } from 'react'
import Spinner from 'react-spinkit'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

class LyricList extends Component {
	constructor(props) {
		super(props)

		this.state = { loading: false, loadingLike: '' }
	}

	onLike(id, likes) {
		this.setState({ loading: true, loadingLike: id })

		this.props.mutate({
			variables: { id },
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id: id,
					__typename: 'LyricType',
					likes: likes + 1
				}
			}
		}).then(() => this.setState({ loading: false, loadingLike: '' }))
	}

	renderLyrics() {
		const { loading, loadingLike } = this.state

		return this.props.lyrics.map(lyric => {
			return (
				<li key={lyric.id} className="collection-item">
					{lyric.content}

					<i style={{'float':'right'}}>{lyric.likes}</i>
					<i className="material-icons" 
					   style={{'float':'right', 'cursor':'pointer'}}
					   onClick={() => this.onLike(lyric.id, lyric.likes)}
					>thumb_up</i>

					
					
				</li>
			)
		})
	}

	render() {
		return (
			<div>
				<ul className="collection">
					{this.renderLyrics()}
				</ul>
			</div>
		)
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID) {
	  likeLyric(id: $id) {
	    id
	    likes
	  }
	}
`;


export default graphql(mutation)(LyricList)

