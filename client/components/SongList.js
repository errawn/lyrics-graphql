import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import query from '../queries/fetchSongs'

class SongList extends Component {

	onDeleteClick(id) {
		console.log(this.props)
		this.props.mutate({ 
			variables: { id }
		}).then(() => this.props.data.refetch())
	}


	renderSongs() {
		return this.props.data.songs.map(song => {
			return (
				<li key={song.id} className="collection-item">
				<Link to={`/song/${song.id}`}>
					{song.title}
				</Link>
				<i  className="material-icons"
					onClick={() => this.onDeleteClick(song.id)}
				>delete</i>
				</li>
			)
		})
	}


	render() {
		if (this.props.data.loading) { return <div>Loading...</div> }

		return (
			<div>
				<div className="collection">
					<ul>{this.renderSongs()}</ul>
				</div>
				<Link 
					to="/song/new"
					className="btn-floating btn-large red right"
				>New Song</Link>
			</div>
		)
	}
}

const mutation = gql`
	mutation DeleteSong($id: ID) {
		deleteSong(id: $id) {
			id
		}
	}
`

export default graphql(mutation)(
	graphql(query)(SongList)
)