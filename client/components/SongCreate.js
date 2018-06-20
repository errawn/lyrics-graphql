import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import query from '../queries/fetchSongs'

class SongCreate extends Component {
	constructor(props) {
		super(props)

		this.state = { title: '' }
	}

	onSubmit(e) {
		e.preventDefault()

		const { mutate, history } = this.props

		mutate({
			variables: { title: this.state.title },
			refetchQueries: [{ query }]
		}).then(() => history.push('/'))
	}


	render() {
		return (
			<div>
				<Link to="/">Back</Link>
				<h3>New Song</h3>
				<form onSubmit={this.onSubmit.bind(this)}>
					<label>Song Title: </label>
					<input 
						type='text' 
						onChange={e => this.setState({ title: e.target.value })}
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
			title
		}
	}
`

export default graphql(mutation)(SongCreate)