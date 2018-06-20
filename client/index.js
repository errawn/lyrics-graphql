import React from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './components/App'
import SongCreate from './components/SongCreate'
import SongDetail from './components/SongDetail'
import SongList from './components/SongList'

const client = new ApolloClient({
  dataIdFromObject: o => o.id
})

const Root = () => {
  return (
  	<ApolloProvider client={client}>
  		<Router>
  			<Switch>
            <Route path='/song/new' component={SongCreate} />
            <Route path='/song/:id' component={SongDetail} />
            <Route exact path='/' component={SongList} />
  			</Switch>
  		</Router>
  	</ApolloProvider>
  )
}

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
)
